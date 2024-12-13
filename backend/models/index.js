const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
  logging: false
});


const User = require('./User');
const Lesson = require('./Lesson');




sequelize.sync({ alter: true })
  .then(async () => {
    console.log("Database synced");

    
    const adminUsername = 'admin';
    const adminPassword = 'adminpass';
    const bcrypt = require('bcrypt');

    const adminUser = await User.findOne({ where: { username: adminUsername } });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await User.create({ username: adminUsername, password: hashedPassword, role: 'Admin' });
      console.log(`Admin user created: username='${adminUsername}', password='${adminPassword}'`);
    } else {
      console.log('Admin user already exists');
    }
  })
  .catch(err => console.error("DB sync error:", err));

module.exports = { sequelize, User, Lesson };
