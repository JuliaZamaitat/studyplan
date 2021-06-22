const mongoose = require("mongoose"),
  { Schema } = mongoose,
  studyPlanSchema = new Schema(
    {
      program: {
        code: String,
        name: String,
        version: String,
      },
      semesterPlans: [
        {
          semester: {
            //maybe change later two its own schema
            type: String,
            required: true,
          },
          currentSemesterCount: {
            type: Number,
            required: true,
          },
          plannedCourses: [{ code: String, name: String }],
        },
      ],
      courses: [
        {
          course: [String],
          booked: Boolean,
          passed: Boolean,
          //belongsTo: String   für Kurs-Verknüpfung?
        },
      ],
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model("StudyPlan", studyPlanSchema);
