const User = require('../models/User');

const adminMiddleware = async (req, res, next) => {
  try {
    const userId = req.user.userId; // ✅ Access userId from req.user

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Access denied. Admin privileges required.' 
      });
    }

    req.admin = user; // Optional: attach admin user to req
    next();
  } catch (err) {
    console.error('Admin middleware error:', err);
    res.status(500).json({ message: 'Server error during authorization' });
  }
};

module.exports = adminMiddleware;
