const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const strongPassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }


     if (!strongPassword(password)) {
      return res
        .status(400)
        .json({
          message:
            "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashpass,
    });

    await newUser.save();

    res.status(201).json({ message: "User successfully registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credintials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credintials" });
    }

    // 3. Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // expires in 1 hour
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Somehthing went wrong" });
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Current Password does not match" });
    }

    if (!strongPassword(newPassword)) {
      return res
        .status(400)
        .json({
          message:
            "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(newPassword, salt);

    user.password = hashpass;
    await user.save();

    res.status(200).json({ message: "Password change succesfully" });
  } catch (err) {
    console.log("Change password error", err.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const promoteToOrganizer = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("in promote controller");
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.role === "organizer") {
      return res.status(400).json({ message: "You are already a organizer" });
    }

    user.role = "organizer";
    await user.save();

    return res.status(200).json({ message: "You are a Organizer" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginuser,
  changePassword,
  promoteToOrganizer,
};
