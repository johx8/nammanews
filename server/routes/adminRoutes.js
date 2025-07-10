const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  createEvent,
  getAdminStats,
  getAllEvents,
  deleteEvents,
  updateEvent,
  getAllUsers,
  deleteUser,
  updateUserRole
} = require('../controllers/adminController');

const { verifyAdmin } = require('../middleware/authMiddleware');
const { getPendingEvents, approveEvent, rejectEvent } = require('../controllers/adminEventController');

// Routes
router.post('/events', upload.single('image'), createEvent);
router.get('/stats', getAdminStats);

router.get('/events', getAllEvents);
router.delete('/events/:id', deleteEvents);
router.put('/events/:id', updateEvent);

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/role', updateUserRole);

// Get all unapproved events
router.get('/pending-events', verifyAdmin, getPendingEvents);

// Approve an event
router.put('/approve-event/:id', verifyAdmin, approveEvent);

// Reject/delete an event
router.delete('/reject-event/:id', verifyAdmin, rejectEvent);

module.exports = router;
