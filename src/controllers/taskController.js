const taskModel = require("../models/taskModel");
const mongoose = require("mongoose");

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const userId = req.params.id;

    const newTask = await taskModel.create({
      title,
      description,
      status,
      user: userId,
    });

    return res.status(201).json({
      status: "success",
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const deletedTask = await taskModel.findOneAndDelete({
      _id: taskId,
    });

    if (!deletedTask) {
      return res.status(404).json({
        status: "Fail",
        message: "Task not found",
      });
    }
    return res.status(200).json({
      status: "Success",
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

// Update Task
exports.updateTaskStatus = async (req, res) => {
  try {
    const taskId = req.params.id;
    const status = req.params.status;

    const updatedTask = await taskModel.updateOne({
      _id: taskId,
      status: status,
    });

    if (!updatedTask) {
      return res.status(404).json({
        status: "Fail",
        message: "Task not found",
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Task updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

// List task by status
exports.listTaskByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const userId = req.user._id;

    // console.log("UserId:", userId);
    // console.log("Status:", status);

    const data = await taskModel.aggregate([
      { $match: { status: status, user: userId } },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          status: 1,
          createdDate: {
            $dateToString: {
              date: "$createdDate",
              format: "%d-%m-%Y",
            },
          },
        },
      },
    ]);
    console.log("data:", data);

    if (data.length === 0) {
      return res.status(404).json({
        error: "Tasks not found",
      });
    }

    return res.status(200).json({
      status: "Success",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

// Task Count by Status
exports.taskStatusCount = async (req, res) => {
  try {
    const userId = req.user._id;

    const data = await taskModel.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$status", sum: { $count: {} } } },
    ]);

    if (data.length === 0) {
      return res.status(404).json({ error: "No tasks found for the user" });
    }
    return res.status(200).json({
      status: "Success",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};
