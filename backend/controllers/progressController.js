const { UserProgress } = require('../models');


exports.startTrack = async (req, res) => {
  const { bookTitle } = req.body;
  const userId = req.user.id;
  
  try {
   
    const existing = await UserProgress.findOne({ where: { userId, bookTitle } });
    if (existing) return res.status(400).json({ message: "Track already started" });

    await UserProgress.create({ userId, bookTitle });
    res.json({ message: "Book track started" });
  } catch (error) {
    console.error("startTrack error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.updateProgress = async (req, res) => {
  const { bookTitle, completedLessonType, answers } = req.body;
  const userId = req.user.id;

 
  const correctAnswers = {
    
    "Grammar": ["A","C","B","D"],
    "Vocab": ["B","B","A","C"],
    "General": ["C","D","A","A"],
    "Final": ["A","A","B","D"]
  };

  try {
    const progress = await UserProgress.findOne({ where: { userId, bookTitle } });
    if (!progress) return res.status(400).json({ message: "No track started for this book" });

    
    const userAnswers = answers; 
    const correct = correctAnswers[completedLessonType];
    if (!correct) return res.status(400).json({ message: "Invalid lesson type" });

    let score = 0;
    for (let i=0; i<4; i++){
      if (userAnswers[i] === correct[i]) score++;
    }

    if (score >= 3) {
      
      let newCount = progress.lessonsCompleted;
     
      const lessonOrder = { "Grammar":1, "Vocab":2, "General":3, "Final":4 };
      const lessonNum = lessonOrder[completedLessonType];
      if (lessonNum === progress.lessonsCompleted + 1) {
        newCount = lessonNum;
        progress.lessonsCompleted = newCount;
        if (lessonNum === 4) progress.isBookFinished = true;
        await progress.save();
      }

      return res.json({ message: `Completed ${completedLessonType} lesson. Score: ${score}/4`});
    } else {
      return res.status(400).json({ message: `You scored ${score}/4. Need at least 3 to pass.` });
    }

  } catch (error) {
    console.error("updateProgress error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.deleteTrack = async (req, res) => {
  const { bookTitle } = req.body;
  const userId = req.user.id;
  
  try {
    const progress = await UserProgress.findOne({ where: { userId, bookTitle } });
    if (!progress) return res.status(400).json({ message: "Track not found" });

    await progress.destroy();
    res.json({ message: "Book track deleted" });
  } catch (error) {
    console.error("deleteTrack error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getProgress = async (req, res) => {
  const userId = req.user.id;
  try {
    const tracks = await UserProgress.findAll({ where: { userId } });
    res.json(tracks);
  } catch (error) {
    console.error("getProgress error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
