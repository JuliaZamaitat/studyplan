const User = require("../model/user");

module.exports = {
  index: (req, res) => {
    User.find({})
      .then((users) => {
        res.send({
          users: users,
        });
      })
      .catch((error) => {
        console.log(`Error fetching users: ${error.message}`);
        res.send({
          error,
        });
      });
  },
};
