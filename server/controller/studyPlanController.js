const User = require("../model/user"),
  StudyPlan = require("../model/studyPlan");

module.exports = {
  index: (req, res) => {
    res.json({});
  },
  create: (req, res) => {
    let studyplanParams = {
      program: req.body.program,
    };
    StudyPlan.create(studyplanParams)
      .then((studyPlan) => {
        res.json(studyPlan);
      })
      .catch((error) => {
        console.log(`Error saving studyplan: ${error.message}`);
        return;
      });
  },
  delete: (req, res) => {
    StudyPlan.findByIdAndRemove(req.params.id)
      .then(async () => {
        const user = await User.findOneAndUpdate(
          { studyPlan: req.params.id },
          { studyPlan: undefined },
          { new: true }
        );
        res.send(user);
      })
      .catch((error) => {
        console.log(`Error deleting studentplan by ID: ${error.message}`);
        return;
      });
  },
  show: (req, res) => {
    let userId = req.params.id;
    User.findById(userId)
      .then((user) => {
        StudyPlan.findById(user.studyPlan)
          .populate("semesterPlans.semester")
          .then((studyPlan) => {
            res.json(studyPlan);
          });
      })
      .catch((error) => {
        console.log(`Error fetching studyplan by ID: ${error.message}`);
      });
  },

  update: (req, res) => {
    let studyPlanId = req.params.id;

    StudyPlan.findByIdAndUpdate(
      studyPlanId,
      {
        $set: {
          program: req.body.program,
          semesterPlans: req.body.semesterPlans,
        },
      },
      { new: true }
    )
      .populate("semesterPlans.semester")
      .then((studyPlan, err) => {
        if (err) console.log(err.message);
        else {
          console.log("plan", studyPlan.semesterPlans);
          res.json(studyPlan);
        }
      });
  },
  saveToUser: (req, res) => {
    let userId = req.body.userId;
    let studyPlan = req.body.studyPlan;
    User.findById(userId).then((user) => {
      user.studyPlan = studyPlan;
      user.save((err) => {
        if (err) {
          console.log(err.message);
          return;
        } else {
          console.log("success updating");
          res.json(user);
        }
      });
    });
  },
};
