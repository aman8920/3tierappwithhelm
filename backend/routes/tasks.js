const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/', async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

router.post('/', async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log request
    const task = await Task.create({ title: req.body.title });
    console.log("Task created:", task.toJSON()); // Log created task
    res.json(task);
  } catch (err) {
    console.error("Error in POST /api/tasks:", err);
    res.status(500).json({ error: "Failed to create task" });
  }
});

router.delete('/:id', async (req, res) => {
  await Task.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

module.exports = router;
