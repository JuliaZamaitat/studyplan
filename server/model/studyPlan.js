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
          },
          currentSemesterCount: {
            type: Number,
          },
          plannedCourses: [
            {
              code: String,
              name: String,
              ects: Number,
              booked: Boolean,
              bookedThrough: [String],
              passed: Boolean,
              passedThrough: [String],
            },
          ],
        },
      ],
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model("StudyPlan", studyPlanSchema);
