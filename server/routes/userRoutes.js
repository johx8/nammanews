const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { verifyUser } = require('../middleware/authMiddleware');
const { submitUserEvent, getUserEvents } = require('../controllers/userEventController');

// User submits a new event (pending approval)
router.post('/events', verifyUser, upload.single('image'), submitUserEvent);

// Get all events submitted by the logged-in user
router.get('/my-events', verifyUser, getUserEvents);

module.exports = router;
