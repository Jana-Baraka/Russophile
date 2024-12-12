const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET || 'secret';

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) return res.status(400).json({message: "Username and password required"});

  const existing = await User.findOne({ where: { username } });
  if (existing) return res.status(400).json({message: "User exists"});

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hash, role: role || 'Learner' });
  res.json({message: "Registered successfully", user: {username: user.username, role: user.role}});
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(400).json({message: "Invalid credentials"});

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({message: "Invalid credentials"});

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

  res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict' });
  res.json({message: "Logged in", role: user.role});
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({message: "Logged out"});
};
