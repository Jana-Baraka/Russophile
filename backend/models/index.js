require('dotenv').config();
const { Sequelize } = require('sequelize');
const path = require('path');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
  logging: false
});

const User = require('./User')(sequelize);
const Lesson = require('./Lesson')(sequelize);
const UserProgress = require('./UserProgress')(sequelize);

console.log("User model:", User);
console.log("Lesson model:", Lesson);


sequelize.sync({ alter: true })
  .then(async () => {
    console.log("Database synced");

    
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'adminpass';

    try {
      const adminUser = await User.findOne({ where: { username: adminUsername } });
      if (!adminUser) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await User.create({ username: adminUsername, password: hashedPassword, role: 'Admin' });
        console.log(`Admin user created: username='${adminUsername}', password='${adminPassword}'`);
      } else {
        console.log('Admin user already exists');
      }

      
      const predefinedLessons = [
        { title: 'War and Peace', content: 'A Russian classic by Leo Tolstoy set during the Napoleonic Wars.' },
        { title: 'Crime and Punishment', content: 'A novel by Fyodor Dostoevsky exploring morality and redemption.' },
        { title: 'Master and Margarita', content: 'A philosophical novel by Michail Bulgakov delving into faith and free will.' }
      ];

      for (const lessonData of predefinedLessons) {
        const existingLesson = await Lesson.findOne({ where: { title: lessonData.title } });
        if (!existingLesson) {
          await Lesson.create(lessonData);
          console.log(`Seeded lesson: ${lessonData.title}`);
        }
      }

    } catch (error) {
      console.error("Error seeding admin user or lessons:", error);
    }
  })
  .catch(err => {
    console.error("DB sync error:", err);
  });

module.exports = { sequelize, User, Lesson, UserProgress };
