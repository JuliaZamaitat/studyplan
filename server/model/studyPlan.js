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
            type: Schema.Types.ObjectId,
            ref: "Semester",
            required: true,
          },
          currentSemesterCount: {
            type: Number,
            required: true,
          },
          plannedCourses: [{ code: String, name: String, ects: Number }],
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
