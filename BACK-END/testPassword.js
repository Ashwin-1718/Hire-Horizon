const bcrypt = require('bcryptjs');

const storedPasswordHash = "$2b$10$kyonkag4/lmFbA9Q0xIHX.IoPa1PgiWsJpFArwpvzd6SBNEpeVqSK"; // Your stored password
const inputPassword = "Admin2812"; // The password you are testing

bcrypt.compare(inputPassword, storedPasswordHash, (err, isMatch) => {
  if (err) {
    console.log("❌ Error comparing passwords:", err);
  } else if (isMatch) {
    console.log("✅ Password matches!");
  } else {
    console.log("❌ Password does NOT match!");
  }
});
