//code partially taken from https://bezkoder.com/node-js-mongodb-auth-jwt/

const User = require("../model/user"),
  Token = require("../model/token"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcryptjs"),
  nodemailer = require("nodemailer");

const secret = "some-secret";

module.exports = {
  checkDuplicateUsernameOrEmail: (req, res, next) => {
    const id = req.body._id || req.body.id;
    // Username
    User.findOne({
      username: req.body.username,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user && user._id != id) {
        res.status(400).send({ message: "Benutzername bereits vergeben!" });
        return;
      }
      // Email
      User.findOne({
        email: req.body.email,
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (user && user._id != id) {
          res.status(400).send({ message: "Email bereits vergeben!" });
          return;
        }
        next();
      });
    });
  },

  verifyToken: (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  },
  register: (req, res) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    // eslint-disable-next-line no-unused-vars
    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err.message });
        return;
      } else {
        var token = new Token({
          _userId: user._id,
          token: jwt.sign({ id: user.id }, secret, {
            expiresIn: 86400, // 24 hours
          }),
        });

        token.save(function (err) {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }

          // Send the email
          if (process.env.PRODUCTION) {
            //configure account for production
          } else {
            const transporter = nodemailer.createTransport({
              host: "smtp.ethereal.email",
              port: 587,
              auth: {
                user: "arielle.mayer39@ethereal.email",
                pass: "KkrfJrfSEvv86Q8N9s",
              },
            });
            var mailOptions = {
              from: "no-reply@yourwebapplication.com",
              to: user.email,
              subject: "Account Verification Token",
              text:
                "Hello,\n\n" +
                "Please verify your account by clicking the link: \nhttp://" +
                req.headers.host +
                "/users/confirmation/" +
                token.token,
            };
            transporter.sendMail(mailOptions, function (err) {
              if (err) {
                return res.status(500).send({ msg: err.message });
              }
              res
                .status(200)
                .send(
                  "A verification email has been sent to " + user.email + "."
                );
            });
          }
        });

        // res.send({ message: "Nuter erfolgreich registriert!" });
      }
    });
  },

  confirmation: (req, res) => {
    console.log("hier");
    console.log("url", req.params.token);
    Token.findOne({ token: req.params.token }, function (err, token) {
      console.log(err, token);
      if (!token)
        return res.status(400).send({
          type: "not-verified",
          msg: "We were unable to find a valid token. Your token may have expired.",
        });

      // If we found a token, find a matching user
      User.findOne({ _id: token._userId }, function (err, user) {
        if (!user)
          return res
            .status(400)
            .send({ msg: "We were unable to find a user for this token." });
        if (user.isVerified)
          return res.status(400).send("Der Nutzer wurde bereits bestätigt.");

        // Verify and save the user
        user.isVerified = true;
        user.save(function (err) {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }
          res
            .status(200)
            .send(
              "The account has been verified. Please log in. localhost:8080/login"
            );
        });
      });
    });
  },

  login: (req, res) => {
    User.findOne({
      username: req.body.username,
    })
      .populate("studyPlan")
      .populate("startOfStudy")
      .then((user, err) => {
        console.log(err);
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (!user) {
          return res.status(404).send({ message: "Nutzer nicht gefunden!" });
        }
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }
        if (!user.isVerified) {
          return res.status(401).send({
            type: "not-verified",
            message:
              "Dein Account wurde noch nicht bestätigt. Checke deine Mails",
          });
        }
        var token = jwt.sign({ id: user.id }, secret, {
          expiresIn: 86400, // 24 hours
        });
        user.accessToken = token;
        user.save();
        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          startOfStudy: user.startOfStudy,
          studyPlan: user.studyPlan,
          accessToken: user.accessToken,
        });
      });
    // });
  },
  update: async (req, res) => {
    console.log(req.body);
    let userParams = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      startOfStudy: req.body.startOfStudy,
      studyPlan: req.body.studyPlan,
      accessToken: req.body.accessToken,
    };
    User.findByIdAndUpdate(req.params.id, { $set: userParams }, { new: true })
      .populate("studyPlan")
      .populate("startOfStudy")
      .then((user, err) => {
        if (err) console.log(err.message);
        else {
          return res.json(user);
        }
      });
  },
  updatePassword: async (req, res) => {
    console.log(req.body);
    const oldPassword = req.body.oldPassword;

    const newPassword = bcrypt.hashSync(req.body.newPassword, 8);

    //find user and compare old password that is stored to this oldPassword

    const user = await User.findById(req.params.id);

    var passwordIsValid = bcrypt.compareSync(oldPassword, user.password);
    if (passwordIsValid) {
      User.findByIdAndUpdate(
        req.params.id,
        { $set: { password: newPassword } },
        { new: true }
      )
        .populate("studyPlan")
        .populate("startOfStudy")
        .then((user, err) => {
          if (err) console.log(err.message);
          else {
            res.send({ message: "Passwort wurde erfolgreich aktualisiert!" });
          }
        });
    } else {
      return res
        .status(500)
        .send({ message: "Altes Passwort ist nicht korrekt!" });
    }
  },
};
