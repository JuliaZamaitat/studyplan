const Semester = require("../model/semester");

module.exports = {
  index: (req, res) => {
    Semester.find()
      .then((semesters) => {
        res.json(semesters);
      })
      .catch((error) => {
        console.log(`Error fetching student by ID: ${error.message}`);
        return;
      });
  },
};
