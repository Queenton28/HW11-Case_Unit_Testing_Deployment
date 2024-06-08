const express = require('express');
const router = express.Router();
const { Todo } = require('./models');

// List All Todo
router.get('/todos', async (req, res) => {
  const todos = await Todo.findAll();
  res.json(todos);
});

// Detail Todo
router.get('/todos/:id', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// Create Todo
router.post('/todos', async (req, res) => {
  const { title } = req.body;
  const newTodo = await Todo.create({ title });
  res.status(201).json(newTodo);
});

// Delete Todo (Soft Delete)
router.delete('/todos/:id', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (todo) {
    await todo.destroy();
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

module.exports = router;
