const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

router.post("/save-booking", async (req, res) => {
  const { fullName, aadharNo } = req.body;

  try {
    const existingBooking = await Booking.findOne({ aadharNo });

    if (existingBooking && existingBooking.fullName !== fullName) {
      return res.status(400).json({
        message: `This Aadhar number is already assigned to ${existingBooking.fullName}`
      });
    }

    const newBooking = new Booking(req.body);
    await newBooking.save();

    res.json({
      message: "Booking saved successfully"
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "This Aadhar number is already registered"
      });
    }

    console.log(error);
    res.status(500).json({
      message: "Booking failed"
    });
  }
});

module.exports = router;

