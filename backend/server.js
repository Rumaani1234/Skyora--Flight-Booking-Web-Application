require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// const flightRoutes = require("./routes/flightRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const aadharRoutes = require("./routes/aadharRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/api", flightRoutes);
app.use("/api", bookingRoutes);
app.use("/api", aadharRoutes);
app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_CONN)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });