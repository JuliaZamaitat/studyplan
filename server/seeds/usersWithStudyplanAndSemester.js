const User = require("../model/user"),
  StudyPlan = require("../model/studyPlan"),
  Semester = require("../model/semester"),
  mongoose = require("mongoose");

//connect mongoose
const mongo = process.env.MONGODB_URI || "mongodb://localhost:27017/studyplan";
mongoose
  .connect(mongo, { useNewUrlParser: true })
  .catch((err) => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(() => {
    console.log("connected to db in development environment");
  });

async function loadUsersAndStudyPlansWithSemester() {
  await Semester.deleteMany({});
  await StudyPlan.deleteMany({});
  await User.deleteMany({});

  let semesterData = [];
  let i = 10;
  for (i; i < 70; i++) {
    semesterData.push({ name: `SoSe${i}` });
    semesterData.push({ name: `WiSe${i}/${i + 1}` });
  }
  for (let semester in semesterData) {
    await Semester.create(semesterData[semester]);
  }

  const sose18 = await Semester.findOne({ name: "SoSe18" });
  console.log(sose18);

  const userData = [
    new User({
      username: "test",
      email: "test@mail.de",
      //password
      matriculationNumber: "123456",
      startOfStudy: sose18._id,
    }),
  ];

  const studyPlanData = [
    new StudyPlan({
      program: {
        code: "imi-b",
        name: "Internationaler Studiengang Medieninformatik",
        version: "1",
      },
      semesterPlans: [],
    }),
  ];

  const studyPlans = await StudyPlan.create(studyPlanData);
  const users = await User.create(userData);
  for (let user in users) {
    users[user].studyPlan = studyPlans[0];
    await users[user].save();
  }

  console.log("----");
  console.log("database seeded with:");
  console.log("----");
  console.log("users: " + JSON.stringify(users));
  console.log("----");
  console.log("studyPlans: " + JSON.stringify(studyPlans));
  console.log("----");
  return ".";
}

loadUsersAndStudyPlansWithSemester().then(() => {
  mongoose.disconnect();
  console.log("database connection closed after seeding.");
});
