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
        console.log(studyPlan);
        res.json(studyPlan);
      })
      .catch((error) => {
        console.log(`Error saving studyplan: ${error.message}`);
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
        console.log(`Error fetching student by ID: ${error.message}`);
      });
  },

  update: (req, res) => {
    let studyplanParams = {
      program: req.body.program,
      semesterPlans: req.body.semesterPlans,
    };
    let studyPlanId = req.params.id;
    StudyPlan.findByIdAndUpdate(
      studyPlanId,
      { $set: studyplanParams },
      { new: true }
    )
      .populate("semesterPlans.semester")
      .then((studyPlan, err) => {
        if (err) console.log(err.message);
        else {
          console.log("success updating");
          res.json(studyPlan);
        }
      });
  },
  saveToUser: (req, res) => {
    let userId = req.body.userId;
    console.log("saveToUser", userId);
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
