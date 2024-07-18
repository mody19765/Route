const Category = require('../models/category');
const Task = require('../models/task');

exports.createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await Category.create({ name, user: req.user.id });

    res.status(201).json({
      success: true,
      data: category
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      data: category
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      data: category
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
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
