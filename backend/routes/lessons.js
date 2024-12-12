const express = require('express');
const router = express.Router();
const { getLessons, getLessonById, createLesson, updateLesson, deleteLesson } = require('../controllers/lessonController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');


router.get('/', getLessons);
router.get('/:id', getLessonById);


router.post('/', authenticate, isAdmin, createLesson);
router.put('/:id', authenticate, isAdmin, updateLesson);
router.delete('/:id', authenticate, isAdmin, deleteLesson);

module.exports = router;
