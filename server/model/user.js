const mongoose = require("mongoose"),
  { Schema } = mongoose,
  userSchema = new Schema(
    {
      username: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      matriculationNumber: {
        type: String,
        lowercase: true,
        unique: true,
      },
      startOfStudy: {
        type: Schema.Types.ObjectId,
        ref: "Semester",
      },
      studyPlan: { type: Schema.Types.ObjectId, ref: "StudyPlan" },

      accessToken: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model("User", userSchema);
