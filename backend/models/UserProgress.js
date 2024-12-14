const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

module.exports = (sequelize) => {
  const UserProgress = sequelize.define('UserProgress', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bookTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lessonsCompleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isBookFinished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return UserProgress;
};
