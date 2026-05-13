 const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  fullName: String,
  dob: String,
  aadharNo: {
    type: String,
    required: true,
    
  },
});

module.exports = mongoose.model("Booking", bookingSchema);










