const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

router.post("/verify-aadhar", async (req, res) => {
  const { aadharNo } = req.body;

  try {
    const match = await Booking.findOne({ aadharNo });

    if (match) {
      return res.status(200).json({
        verified: true
      });
    } else {
      return res.status(200).json({
        verified: false
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});

module.exports = router;