const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User"); // Ensure the path is correct

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

const resetAdminPassword = async () => {
  try {
    const newPassword = "Admin2812"; // Set your new password here
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password

    const result = await User.findOneAndUpdate(
      { email: "admin@example.com" },  // Find the admin user by email
      { $set: { password: hashedPassword } }, // Update the password
      { new: true } // Return the updated document
    );

    if (result) {
      console.log("✅ Admin password reset successfully!");
    } else {
      console.log("❌ Admin user not found!");
    }

    mongoose.connection.close(); // Close connection after update
  } catch (error) {
    console.error("❌ Error resetting password:", error);
  }
};

resetAdminPassword();
