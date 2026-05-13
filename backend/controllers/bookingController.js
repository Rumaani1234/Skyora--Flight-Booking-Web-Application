const Booking = require("../models/Booking");

const saveBooking = async (req, res) => {
  const { fullName, aadharNo, dob } = req.body;

  try {
    // 1️⃣ Check if Aadhar already exists
    const existingUser = await Booking.findOne({ aadharNo });

    // 2️⃣ If exists but name different → Block
    if (existingUser && existingUser.fullName !== fullName) {
      return res.status(400).json({
        message:
          "❌ This Aadhar number is already assigned to another person.",
      });
    }

    // 3️⃣ If exists and same name → Do NOT create again
    if (existingUser && existingUser.fullName === fullName) {
      return res.status(200).json({
        message: "✅ Booking already exists for this user.",
      });
    }

    // 4️⃣ If new Aadhar → Create booking
    const newBooking = await Booking.create({
      fullName,
      aadharNo,
      dob,
    });

    return res.status(201).json({
      message: "✅ Booking saved successfully!",
      data: newBooking,
    });
  } catch (error) {
    console.error("Save Booking Error:", error);

    return res.status(500).json({
      message: "❌ Server error. Please try again.",
    });
  }
};

module.exports = { saveBooking };

