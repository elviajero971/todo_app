// backend/models/TodoList.js
const mongoose = require('mongoose');
const Todo = require('./Todo');

const TodoListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  todos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo'
  }]
});

module.exports = mongoose.model('TodoList', TodoListSchema);
