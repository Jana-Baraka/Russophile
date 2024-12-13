const { Lesson } = require('../models');

exports.getLessons = async (req, res) => {
  const lessons = await Lesson.findAll();
  res.json(lessons);
};

exports.getLessonById = async (req, res) => {
  const { id } = req.params;
  const lesson = await Lesson.findByPk(id);
  if (!lesson) return res.status(404).json({message: "Not found"});
  res.json(lesson);
};

exports.createLesson = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({message: "Missing title or content"});
  const lesson = await Lesson.create({ title, content });
  res.status(201).json(lesson);
};

exports.updateLesson = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const lesson = await Lesson.findByPk(id);
  if (!lesson) return res.status(404).json({message: "Not found"});
  if (title) lesson.title = title;
  if (content) lesson.content = content;
  await lesson.save();
  res.json(lesson);
};

exports.deleteLesson = async (req, res) => {
  const { id } = req.params;
  const lesson = await Lesson.findByPk(id);
  if (!lesson) return res.status(404).json({message: "Not found"});
  await lesson.destroy();
  res.json({message: "Deleted"});
};
