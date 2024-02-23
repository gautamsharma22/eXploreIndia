const User = require("../models/user");
const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const newUser = new User({ firstName, lastName, email, password });
  const exsitingUser = await User.findOne({ email });
  if (exsitingUser) {
    return res.status(400).send({
      message: "Email Already Used!",
    });
  }
  try {
    const result = await newUser.save();
    res.send({
      message: "User created!",
    });
  } catch (err) {
    res.status(500).send({
      message: "Error while signing up!",
      error: err,
    });
  }
};

module.exports = register;
