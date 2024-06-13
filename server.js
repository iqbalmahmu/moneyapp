const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./routers/userRoute");

const app = express();

app.use(morgan("dev"));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// route handlers

app.use("/api/users", userRouter);

app.get("/", (_req, res) => {
  res.send("Welcome to express server");
});

// listen on port at Port.

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  mongoose
    .connect("mongodb://127.0.0.1:27017/redux")
    .then(() => {
      console.log("Connected to MongoDB successfully");
    })
    .catch((error) => {
      console.log("Failed to connect to MongoDB + error: " + error);
    });
});
