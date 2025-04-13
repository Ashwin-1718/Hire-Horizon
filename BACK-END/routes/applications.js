const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Application = require('../models/Application');

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Apply for a job
router.post('/', auth, async (req, res) => {
  const { jobId, jobTitle, company } = req.body;
  try {
    const application = new Application({
      userId: req.user.userId,
      jobId,
      jobTitle,
      company,
    });
    await application.save();
    res.json({ message: 'Application submitted successfully', application });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's applications
router.get('/', auth, async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.userId });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;