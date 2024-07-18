const Task = require('../models/task');
const Category = require('../models/category');

exports.createTask = async (req, res) => {
  const { title, body, listItems, type, shared, category } = req.body;

  try {
    const task = await Task.create({
      title,
      body,
      listItems,
      type,
      shared,
      category,
      user: req.user.id
    });

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

exports.getTasks = async (req, res) => {
  const { page = 1, limit = 10, category, shared } = req.query;
  const query = { user: req.user.id };

  if (category) query.category = category;
  if (shared !== undefined) query.shared = shared;

  try {
    const tasks = await Task.find(query)
      .populate('category')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Task.countDocuments(query);

    res.status(200).json({
      success: true,
      data: tasks,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('category');

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('category');

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
