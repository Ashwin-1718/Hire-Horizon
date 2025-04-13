const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

async function hashAdminPassword() {
  try {
    const admin = await User.findOne({ email: 'admin@example.com' });
    if (!admin) {
      console.log('Admin user not found');
      return;
    }

    // Hash the password and update it
    const hashedPassword = await bcrypt.hash('Admin2812', 10);
    admin.password = hashedPassword;
    await admin.save();

    console.log('✅ Admin password hashed and updated');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    mongoose.connection.close();
  }
}

hashAdminPassword();
