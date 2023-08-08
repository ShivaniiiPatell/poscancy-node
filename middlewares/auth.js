// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const authentication = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, "musecret", async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    console.log("hii", decodedToken);
    try {
      const user = await User.find({ email: decodedToken.email });

      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized: User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });
};

const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Forbidden: Only admins can access this route" });
  }

  next();
};

module.exports = { authentication, requireAdmin };
