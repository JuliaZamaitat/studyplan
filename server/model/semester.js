const mongoose = require("mongoose"),
  { Schema } = mongoose,
  semesterSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
  });

module.exports = mongoose.model("Semester", semesterSchema);
