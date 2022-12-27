const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const env = require("dotenv").config();
const path = require("path");

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

// --------------------------deployment------------------------------
const _dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(_dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

const PORT = process.env.PORT || 1104;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`
  )
);
