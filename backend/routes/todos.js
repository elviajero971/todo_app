// backend/routes/todos.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const TodoList = require('../models/TodoList');

// Add a new todo to a list
router.post('/:listId/todos', async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      created_at: Date.now(),
    });

    const savedTodo = await todo.save();
    const todoList = await TodoList.findById(req.params.listId);
    todoList.todos.push(savedTodo);
    await todoList.save();

    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a todo
router.patch('/:listId/todos/:todoId', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.todoId, req.body, { new: true });
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a todo from a list
router.delete('/:listId/todos/:todoId', async (req, res) => {
  try {
    const todoList = await TodoList.findById(req.params.listId);
    todoList.todos.pull(req.params.todoId);
    await todoList.save();
    await Todo.findByIdAndDelete(req.params.todoId);

    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
