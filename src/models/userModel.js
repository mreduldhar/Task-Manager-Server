const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      maxLength: [12, "Username length can be maximum 12 characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: function (value) {
          const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          return emailRegex.test(value);
        },
      },
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password length should be at least 6 characters"],
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
