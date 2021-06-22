const mongoose = require("mongoose"),
  { Schema } = mongoose,
  userSchema = new Schema(
    {
      name: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
      },
      matriculationNumber: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
      },
      startOfStudy: {
        type: String,
      },
      studyPlan: { type: Schema.Types.ObjectId, ref: "StudyPlan" },
    },
    {
      timestamps: true,
    }
  );
// sodass man mit user.fullName den vollen Namen ausgedruckt bekommt
/* userSchema.virtual("fullName")
    //can't use an arrow function for mongoose methods like get()
    .get(function(){
        return `${this.name.first} ${this.name.last}`;
    });*/

module.exports = mongoose.model("User", userSchema);
