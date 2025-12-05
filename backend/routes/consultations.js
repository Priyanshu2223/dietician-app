const express = require('express');
const router = express.Router();
const Consultation = require('../models/Consultation');
const auth = require('../middleware/auth');

// POST /api/consultations/ - create a consultation request (auth required)
router.post('/', auth, async (req, res) => {
  try {
    const { name, email, phone, message, preferredDate } = req.body;
    const c = new Consultation({
      user: req.user.id,
      name, email, phone, message,
      preferredDate: preferredDate ? new Date(preferredDate) : null
    });
    await c.save();
    res.json(c);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET /api/consultations/my - get logged-in user's consultations
router.get('/my', auth, async (req, res) => {
  try {
    const list = await Consultation.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
