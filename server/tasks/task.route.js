const express = require("express");
const taskController = require("./task.controller");

const TaskRouter = express.Router();

// Route for creating a task
TaskRouter.post("/createTask", taskController.CreateTask);

// Route for getting all tasks
TaskRouter.get("/getAllTasks", taskController.GetAllTasks);

// Route for getting a task by ID
TaskRouter.get("/getTask/:id", taskController.GetTaskById);

// Route for updating a task by ID
TaskRouter.put("/updateTask/:id", taskController.UpdateTask);

// Route for deleting a task by ID
TaskRouter.delete("/deleteTask/:id", taskController.DeleteTask);

module.exports = TaskRouter;
