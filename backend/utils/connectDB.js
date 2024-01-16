const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config();
function connectDB() {
  const connectionURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.s1a1yrw.mongodb.net/${process.env.DB_NAME}`;
  mongoose
    .connect(connectionURI)
    .then(() => {
      console.log("Database Connected!");
    })
    .catch((err) => console.error("Error in DB Connection!", err));
}

module.exports = connectDB;
