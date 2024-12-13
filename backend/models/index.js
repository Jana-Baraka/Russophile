const sequelize = require('../config/db');
const User = require('./user');
const Lesson = require('./Lesson');



sequelize.sync({ alter: true })
  .then(() => console.log("Database synced"))
  .catch(err => console.error("DB sync error:", err));

  const { User } = require('./index'); // Adjust path as needed
  const bcrypt = require('bcrypt');
  
  (async () => {
    const adminUser = await User.findOne({ where: { username: 'admin' } });
    if (!adminUser) {
      const hash = await bcrypt.hash('adminpass', 10);
      await User.create({ username: 'admin', password: hash, role: 'Admin' });
      console.log("Admin user created: username='admin', password='adminpass', role='Admin'");
    }
  })();

module.exports = { sequelize, User, Lesson };
