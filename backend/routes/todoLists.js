// backend/routes/todoLists.js
const express = require('express');
const router = express.Router();
const TodoList = require('../models/TodoList');

// Get all todo lists
router.get('/', async (req, res) => {
  try {
    const todoLists = await TodoList.find().populate('todos');
    res.json(todoLists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single todo list
router.get('/:id', async (req, res) => {
  try {
    const todoList = await TodoList.findById(req.params.id).populate('todos');
    res.json(todoList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new todo list
router.post('/', async (req, res) => {
  const todoList = new TodoList({
    name: req.body.name,
    created_at: Date.now(),
  });

  try {
    const savedTodoList = await todoList.save();
    res.status(201).json(savedTodoList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a todo list name
router.patch('/:id', async (req, res) => {
  try {
    const updatedList = await TodoList.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a todo list
router.delete('/:id', async (req, res) => {
  try {
    await TodoList.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo list deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
