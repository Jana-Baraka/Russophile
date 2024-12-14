

const { UserProgress } = require('../models');

exports.startTrack = async (req, res) => {
  const { bookTitle } = req.body;
  const userId = req.user.id; 

  console.log(`startTrack called by User ID: ${userId}, Book Title: ${bookTitle}`);

  try {
    const existing = await UserProgress.findOne({ where: { userId, bookTitle } });
    if (existing) {
      console.log(`Track already started for User ID: ${userId}, Book Title: ${bookTitle}`);
      return res.status(400).json({ message: "Track already started" });
    }

    await UserProgress.create({ userId, bookTitle });
    console.log(`Book track started for User ID: ${userId}, Book Title: ${bookTitle}`);
    res.status(201).json({ message: "Book track started" });
  } catch (error) {
    console.error("startTrack error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateProgress = async (req, res) => {
  const { bookTitle, completedLessonType, answers } = req.body;
  const userId = req.user.id;

  console.log(`updateProgress called by User ID: ${userId}, Book Title: ${bookTitle}, Lesson Type: ${completedLessonType}`);

 
  try {
    const progress = await UserProgress.findOne({ where: { userId, bookTitle } });
    if (!progress) {
      return res.status(400).json({ message: "Track not started" });
    }

 
    progress.lessonsCompleted += 1;
    if (progress.lessonsCompleted >= 4) {
      progress.isBookFinished = true;
    }

    await progress.save();
    console.log(`Progress updated for User ID: ${userId}, Book Title: ${bookTitle}`);
    res.json({ message: "Progress updated successfully" });
  } catch (error) {
    console.error("updateProgress error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteTrack = async (req, res) => {
  const { bookTitle } = req.body;
  const userId = req.user.id;

  console.log(`deleteTrack called by User ID: ${userId}, Book Title: ${bookTitle}`);

  try {
    const progress = await UserProgress.findOne({ where: { userId, bookTitle } });
    if (!progress) {
      return res.status(400).json({ message: "Track not found" });
    }

    await progress.destroy();
    console.log(`Track deleted for User ID: ${userId}, Book Title: ${bookTitle}`);
    res.json({ message: "Track deleted successfully" });
  } catch (error) {
    console.error("deleteTrack error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProgress = async (req, res) => {
  const userId = req.user.id;

  console.log(`getProgress called by User ID: ${userId}`);

  try {
    const tracks = await UserProgress.findAll({ where: { userId } });
    res.json(tracks);
  } catch (error) {
    console.error("getProgress error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
