const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const auth = require('../middleware/auth');

// POST /api/goals - create goal
router.post('/', auth, async (req, res) => {
  try {
    const { title, targetDate } = req.body;
    const g = new Goal({
      user: req.user.id,
      title,
      targetDate: targetDate ? new Date(targetDate) : null
    });
    await g.save();
    res.json(g);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET /api/goals/my
router.get('/my', auth, async (req, res) => {
  try {
    const list = await Goal.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// PUT /api/goals/:id/toggle
router.put('/:id/toggle', auth, async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ msg: 'Goal not found' });
    if (goal.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
    goal.completed = !goal.completed;
    await goal.save();
    res.json(goal);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// DELETE /api/goals/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ msg: 'Goal not found' });
    if (goal.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
    await goal.remove();
    res.json({ msg: 'Goal removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
