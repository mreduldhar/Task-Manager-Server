const jwt = require("jsonwebtoken");
const {jwtSecretKey} = require("../../secrets");
const mongoose = require('mongoose');

exports.requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        error: "No token provided.",
      });
    }
    jwt.verify(token, jwtSecretKey, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ error: "Token expired" });
        } else {
          return res
            .status(401)
            .json({ error: "Failed to authenticate token" });
        }
      }
      req.user = decoded;
      req.user._id = new mongoose.Types.ObjectId(decoded._id); 
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};
