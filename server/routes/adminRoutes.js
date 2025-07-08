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

// Routes
router.post('/events', upload.single('image'), createEvent);
router.get('/stats', getAdminStats);

router.get('/events', getAllEvents);
router.delete('/events/:id', deleteEvents);
router.put('/events/:id', updateEvent);

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/role', updateUserRole);
// router.get('/events/count', adminController.getEventCount);
// router.get('/users/count', adminController.getUserCount);

module.exports = router;
