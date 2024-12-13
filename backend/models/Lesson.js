

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Lesson = sequelize.define('Lesson', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'Lessons', 
    timestamps: true 
  });

  return Lesson;
};
