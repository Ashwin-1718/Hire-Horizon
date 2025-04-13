const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  console.log("📡 Incoming Auth Request...");
  
  const token = req.header("x-auth-token");

  if (!token) {
    console.log("❌ No token provided");
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    console.log("🔍 Verifying token...");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token verified! User ID:", decoded.userId);

    req.user = decoded; // ✅ Attach entire decoded token payload
    next();
  } catch (err) {
    console.log("❌ Invalid Token:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};
