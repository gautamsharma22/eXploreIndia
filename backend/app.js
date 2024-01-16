const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const connectDB = require("./utils/connectDB");
const app = express();
app.use(express.json());
dotenv.config();

connectDB();

const PORT_NO = 4000;

app.use("/auth", authRoutes);

app.use("/", (req, res) => {
  res.send("All Good!");
});

app.listen(PORT_NO, () => {
  console.log(`App Listening on PORT : ${PORT_NO}`);
});
