

const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware'); 
const { startTrack, updateProgress, deleteTrack, getProgress } = require('../controllers/progressController');

console.log("Progress routes loaded");


router.post('/start', authenticate, startTrack);
router.post('/update', authenticate, updateProgress);
router.post('/delete', authenticate, deleteTrack);
router.get('/', authenticate, getProgress);

module.exports = router;
