

const { User } = require('../models'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret'; 

exports.register = async (req, res) => {
  const { username, password } = req.body;
  

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  try {
 
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: "Registered successfully", user: { username: newUser.username, role: newUser.role } });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
   
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    
    res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict' }); // Set 'secure: true' in production

    res.json({ message: "Logged in successfully", role: user.role });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: "Logged out successfully" });
};


exports.getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    
    const decoded = jwt.verify(token, JWT_SECRET);

    
    const user = await User.findByPk(decoded.userId, { attributes: ['username', 'role'] });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Get Current User error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
