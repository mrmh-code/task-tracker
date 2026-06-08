const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// GET /api/tasks?search=&status=
router.get('/', auth, async (req, res) => {
  try {
    const { search, status } = req.query;
    const filter = { createdBy: req.user._id };

    if (status && status !== 'All') filter.status = status;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/tasks
router.post(
  '/',
  auth,
  [body('title').trim().notEmpty().withMessage('Title is required')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const task = await Task.create({
        title: req.body.title,
        description: req.body.description || '',
        status: req.body.status || 'Pending',
        createdBy: req.user._id,
      });
      res.status(201).json(task);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// PUT /api/tasks/:id
router.put(
  '/:id',
  auth,
  [body('title').trim().notEmpty().withMessage('Title is required')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const task = await Task.findOne({ _id: req.params.id, createdBy: req.user._id });
      if (!task) return res.status(404).json({ message: 'Task not found' });

      task.title = req.body.title;
      task.description = req.body.description ?? task.description;
      task.status = req.body.status ?? task.status;
      await task.save();

      res.json(task);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// DELETE /api/tasks/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
