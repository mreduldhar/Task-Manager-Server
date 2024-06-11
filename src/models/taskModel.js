const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum:['new', 'pending', 'in-progress', 'completed', 'canceled'],
      default: "new"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
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

const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;
