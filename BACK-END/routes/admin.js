const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Application = require('../models/Application'); 
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

// Admin Dashboard Statistics
router.get('/dashboard', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const stats = {
      totalUsers: await User.countDocuments(),
      activeUsers: await User.countDocuments({ status: 'active' }),
      newUsers: await User.countDocuments({ 
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } 
      }),
      admins: await User.countDocuments({ role: 'admin' })
    };

    res.json({ success: true, stats });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch dashboard stats',
      error: err.message 
    });
  }
});

// User Management Endpoints
router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status, role } = req.query;
    
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (status) query.status = status;
    if (role) query.role = role;

    const users = await User.find(query)
      .select('-password -__v')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await User.countDocuments(query);

    res.json({
      success: true,
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch users',
      error: err.message 
    });
  }
});

// Get All Applications
router.get('/applications', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const applications = await Application.find()
      .populate('userId', 'name email')
      .sort({ appliedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Application.countDocuments();

    res.json({
      success: true,
      applications,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch applications',
      error: err.message 
    });
  }
});

// Delete Application
router.delete('/applications/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: 'Application not found' 
      });
    }
    await application.deleteOne();
    res.json({ 
      success: true, 
      message: 'Application deleted successfully' 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete application',
      error: err.message 
    });
  }
});

// User Detail Endpoint
router.get('/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -__v');
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch user',
      error: err.message 
    });
  }
});

// Update User Endpoint
router.put('/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { role, status, ...updateData } = req.body;
    
    const restrictedUpdates = ['password', 'email', 'createdAt'];
    restrictedUpdates.forEach(field => delete updateData[field]);

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData, ...(role && { role }), ...(status && { status }) },
      { new: true, runValidators: true }
    ).select('-password -__v');

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update user',
      error: err.message 
    });
  }
});

// HARD Delete User (Completely remove from DB)
router.delete('/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User deleted from database',
      user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
      error: err.message
    });
  }
});


module.exports = router;