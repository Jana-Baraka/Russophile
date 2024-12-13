const sequelize = require('../config/db');
const User = require('./user');
const Lesson = require('./Lesson');



sequelize.sync({ alter: true })
  .then(() => console.log("Database synced"))
  .catch(err => console.error("DB sync error:", err));

module.exports = { sequelize, User, Lesson };
