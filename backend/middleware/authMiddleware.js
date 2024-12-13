// backend/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Middleware to Authenticate User
exports.authenticate = async (req, res, next) => {
  const token = req.cookies.token; 
  if (!token) {
    console.log("No token found, unauthorized");
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(`Token decoded: UserID=${decoded.userId}, Role=${decoded.role}`);

    const user = await User.findByPk(decoded.userId);
    if (!user) {
      console.log("User not found, unauthorized");
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Attach user details to request object
    req.user = {
      id: user.id,
      username: user.username,
      role: user.role
    };

    console.log(`Authenticated user: ${user.username}, Role: ${user.role}`);

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(403).json({ message: "Forbidden" });
  }
};

// Middleware to Authorize Admins
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    console.log("User is admin, authorized");
    return next();
  }
  console.log("User is not admin, forbidden");
  return res.status(403).json({ message: "Forbidden: Admins only" });
};
