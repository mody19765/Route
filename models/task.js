const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String
  },
  listItems: [
    {
      body: String
    }
  ],
  type: {
    type: String,
    enum: ['Text', 'List'],
    required: true
  },
  shared: {
    type: Boolean,
    default: false
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Task', TaskSchema);
