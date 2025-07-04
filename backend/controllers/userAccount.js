const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.createAccount = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName)
      return res
        .status(400)
        .json({ success: false, msg: "Full Name is required" });
    if (!email)
      return res.status(400).json({ success: false, msg: "Email is required" });
    if (!password)
      return res
        .status(400)
        .json({ success: false, msg: "Password is required" });

    const isUser = await User.findOne({ email: email });
    if (isUser) return res.json({ success: false, msg: "User already exist" });

    const user = await User.create({ fullName, email, password });

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "60m",
    });
    res.status(200).json({
      success: true,
      user,
      accessToken,
      msg: "Registration successful",
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.loginAccount = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email)
      return res.status(400).json({ success: false, msg: "Email is required" });
    if (!password)
      return res
        .status(400)
        .json({ success: false, msg: "Password is required" });

    const userInfo = await User.findOne({ email: email });
    if (!userInfo)
      return res.status(400).json({ success: false, msg: "User not found" });

    if (userInfo.email == email && userInfo.password == password) {
      const user = { user: userInfo };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "60m",
      });
      res.status(200).json({
        success: true,
        email,
        accessToken,
        msg: "Login successful",
      });
    } else {
      res.status(400).json({
        success: false,
        error: true,
        msg: "Invalid Credentials",
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.userProfile = async (req, res) => {
  try {
    const { user } = req.user;

    const isUser = await User.findOne({ _id: user._id });
    if (!isUser)
      return res.status(401);

    res.status(200).json({
      success: true,
      user: {
        fullName: isUser.fullName,
        email: isUser.email,
        _id: isUser._id,
        createdOn: isUser.createdOn,
      },
      msg: "Profile fetched successful",
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
