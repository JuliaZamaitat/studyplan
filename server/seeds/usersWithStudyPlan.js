const User = require("../model/user");
const StudyPlan = require("../model/studyPlan");
const mongoose = require("mongoose");

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

//save your data. this is an async operation
//after you make sure you seeded all the products, disconnect automatically
// users.map(async (p, index) => {
//   // eslint-disable-next-line no-unused-vars
//   await p.save((err, result) => {
//     if (index === users.length - 1) {
//       console.log("DONE!");
//       mongoose.disconnect();
//     }
//   });
// });

async function loadUsersAndStudyPlans() {
  const userData = [
    new User({
      name: "test",
      email: "test@mail.de",
      matriculationNumber: "123456",
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
      courses: [
        {
          course: "B1",
          booked: false,
          passed: false,
        },
      ],
    }),
  ];
  await StudyPlan.deleteMany({});
  await User.deleteMany({});
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

loadUsersAndStudyPlans().then(() => {
  mongoose.disconnect();
  console.log("database connection closed after seeding.");
});
