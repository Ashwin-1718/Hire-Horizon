const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust if needed
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

async function testAdminLogin() {
  try {
    const user = await User.findOne({ email: 'admin@example.com' });
    if (!user) {
      console.log('Admin not found');
      return;
    }

    const isMatch = await bcrypt.compare('Admin2812', user.password);
    if (isMatch) {
      console.log('✅ Login successful for admin:', user.name);
    } else {
      console.log('❌ Incorrect password');
    }
  } catch (err) {
    console.error('Error during test:', err);
  } finally {
    mongoose.connection.close(); // Close DB connection after test
  }
}

testAdminLogin();
