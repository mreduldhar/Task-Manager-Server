const userModel = require("../models/userModel");
const { hashPassword, comparePassword } = require("../helper/auth");
const { createJWT } = require("../helper/jsonWebToken");
const { jwtSecretKey, jwtExpirationTime } = require("../../secrets");

// User Registration
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // validation
    if (!username.trim() || username.length > 12) {
      return res.status(400).json({
        error: username.trim()
          ? "Username length can be maximum 12 characters"
          : "Username is required",
      });
    }
    if (!email.trim()) {
      return res.status(400).json({
        error: "Email is required",
      });
    }
    if (!password.trim() || password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters long",
      });
    }
    // check if email exist or not
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }

    // hash Password
    const hashedPass = await hashPassword(password);

    // register user
    const createdUser = await userModel.create({
      username,
      email,
      password: hashedPass,
    });

    // create jwt
    const token = createJWT({ email: email }, jwtSecretKey, jwtExpirationTime);

    return res.status(201).json({
      status: "Success",
      message: "New user created",
      data: createdUser,
      token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: "Fail",
      message: "Something went wrong",
    });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.json({
        error: "Email is required",
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "Password must be at least 6 characters long",
      });
    }

    // check user exist
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        error: "User not found",
      });
    }

    // compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: "Invalid email or password" });
    }

    // generate jwt
    const token = createJWT({ _id: user._id }, jwtSecretKey, jwtExpirationTime);

    return res.status(200).json({
      status: "Success",
      message: "User login Successfully",
      token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: "Fail",
      message: "Something went wrong",
    });
  }
};

// User Profile Update
exports.profileUpdate = async (req, res) => {
  try {
    const reqBody = req.body;
    const userID = req.headers.id;

    const profile = await userModel.findOneAndUpdate(
      { _id: userID },
      { $set: reqBody },
      { new: true, upsert: false }
    );

    if (!profile) {
      return res.status(404).json({
        status: "Fail",
        message: "User not found",
      });
    }

    return res.status(201).json({
      status: "Success",
      message: "User profile has been updated",
      profile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};
