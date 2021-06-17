const User = require("../model/user");
const mongoose = require("mongoose");

const users = [
  new User({
    name: "test",
    email: "test@mail.de",
  }),
];

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
users.map(async (p, index) => {
  // eslint-disable-next-line no-unused-vars
  await p.save((err, result) => {
    if (index === users.length - 1) {
      console.log("DONE!");
      mongoose.disconnect();
    }
  });
});
