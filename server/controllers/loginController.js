const User = require("../models/loginModel");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isValid = await user.isValidPassword(req.body.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // sign a JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
