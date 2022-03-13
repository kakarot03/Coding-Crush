const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const env = require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(1104, () => {
  console.log("Server started on 1104");
});
