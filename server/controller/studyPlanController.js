const User = require("../model/user"),
  StudyPlan = require("../model/studyPlan");

module.exports = {
  index: (req, res) => {
    res.json({});
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
    console.log("req body", req.body.semesterPlans);
    let studyPlanId = req.params.id;
    StudyPlan.findById(studyPlanId)
      .populate("semesterPlans.semester")
      .then((studyPlan) => {
        studyPlan.semesterPlans = req.body.semesterPlans;
        studyPlan.save((err) => {
          if (err) console.log(err.message);
          else {
            console.log("success updating");
            res.json(studyPlan);
          }
        });
      });
  },
};
