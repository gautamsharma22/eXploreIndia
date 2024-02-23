const User = require("../models/user");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const login = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({
      message: "User Not found with this Email ",
    });
  }
  const hashedPassword = existingUser.password;

  bcrypt.compare(password, hashedPassword, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Failed Validating Credentials",
        error: err,
      });
    }
    if (result) {
      res.status(200).json({
        userID: existingUser._id,
        message: `Welcome ${existingUser.firstName}`,
      });
    } else {
      return res.status(400).json({
        message: "Invalid Credentials, Try again ",
        error: err,
      });
    }
  });
};

module.exports = login;
