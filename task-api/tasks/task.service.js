const Task = require("./task.model");

const save = async (task, session) => {
  return await task.save({ session });
};

const findAll = async (queryObj = {}) => {
  return await Task.find(queryObj)
    .populate("user", "username name")       // populate assigned user
    .populate("createdBy", "username name")  // populate creator
    .sort({ createdAt: -1 });
};

const findById = async (id) => {
  return await Task.findById(id).populate("user", "username name");
};

const findByIdAndUpdate = async (id, update, session) => {
  if (session) {
    return await Task.findByIdAndUpdate(id, update, { new: true })
      .session(session)
      .populate("user", "username name");
  } else {
    return await Task.findByIdAndUpdate(id, update, { new: true }).populate(
      "user",
      "username name"
    );
  }
};

const findByIdAndDelete = async (id, session) => {
  if (session) {
    return await Task.findByIdAndDelete(id).session(session);
  } else {
    return await Task.findByIdAndDelete(id);
  }
};

const findTaskByDueDate = async (dueDate) => {
  return await Task.find({ dueDate: dueDate })
    .populate("user", "username name")
    .select("-password");
};

module.exports = {
  save,
  findAll,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  findTaskByDueDate,
};
