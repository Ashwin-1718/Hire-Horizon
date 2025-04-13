const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Include Admin Routes
app.use('/api/auth', require('./routes/auth').router);
app.use('/api/applications', require('./routes/applications'));
app.use('/api/admin', require('./routes/admin'));  // 👈 ADD THIS

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
