const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const placeRoutes = require("./routes/places");
const reviewRoutes = require("./routes/review");
const connectDB = require("./utils/connectDB");
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

connectDB();

const PORT_NO = 4000;

app.use("/auth", authRoutes);

app.use("/places", placeRoutes);

app.use("/review", reviewRoutes);

app.use("/", (req, res) => {
  res.send("All Good!");
});

app.listen(PORT_NO, () => {
  console.log(`App Listening on PORT : ${PORT_NO}`);
});
