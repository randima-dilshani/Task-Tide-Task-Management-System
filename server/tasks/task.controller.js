const { StatusCodes } = require("http-status-codes");
const { startSession } = require("mongoose");
const Task = require("./task.model");
const TaskService = require("./task.service");
const User = require("../user/user.model");

// Create a new task
const CreateTask = async (req, res) => {
  const session = await startSession();
  try {
    //start transaction
    session.startTransaction();
    // Extract data from the request body
    const { title, description, status, dueDate, user } = req.body;

    // Construct task data object
    const taskData = {
      title: title,
      description: description,
      status: status,
      dueDate: dueDate,
      user: user,
    };

    // Create a new task instance with the constructed task data
    const task = new Task(taskData);

    // Save the task to the database
    const createdTask = await TaskService.save(task, session); // Add await here

    // Commit the transaction
    await session.commitTransaction();

    // Send response
    res.status(StatusCodes.CREATED).json({
      message: "Task created successfully",
      task: createdTask,
    });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    //end session
    session.endSession();
  }
};

// Get all tasks
const GetAllTasks = async (req, res) => {
  try {
    const tasks = await TaskService.findAll();
    res.status(StatusCodes.OK).json(tasks);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// Get only logged-in user's tasks
const GetMyTasks = async (req, res) => {
  try {
    const userId = req.auth.id;
    const tasks = await TaskService.findAll({ user: userId }); // filter by user id
    res.status(StatusCodes.OK).json(tasks);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

// Get a task by ID
const GetTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await TaskService.findById(taskId);
    if (!task) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Task not found" });
    }
    res.status(StatusCodes.OK).json(task);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

//Update a Task by ID
const UpdateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = await TaskService.findByIdAndUpdate(taskId, req.body);
    if (!updatedTask) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Task not found" });
    }
    res
      .status(StatusCodes.OK)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// Delete a task by ID
const DeleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await TaskService.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Task not found" });
    }
    res
      .status(StatusCodes.OK)
      .json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// Function to get all user usernames
const getAllUsernames = async (req, res) => {
  try {
    const users = await User.find({}, { username: 1 }); // Fetch only the username field
    const usernames = users.map((user) => user.username); // Extract usernames
    res.status(StatusCodes.OK).json(usernames);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  CreateTask,
  GetAllTasks,
  GetTaskById,
  UpdateTask,
  DeleteTask,
  getAllUsernames,
  GetMyTasks,
};
