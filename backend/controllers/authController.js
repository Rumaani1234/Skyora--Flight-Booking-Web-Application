
const bcrypt = require("bcryptjs");
const User = require("../models/User");

//  Register controller
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

     console.log("🧪 Email from input:", email);
    console.log("🔐 Password from input:", password);


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //  Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    console.log("✅ User registered:", email);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//  Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ Invalid login: user not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //  Compare plain password with hashed one
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Invalid login: wrong password");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("✅ User logged in:", email);
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
