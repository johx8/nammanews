const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');
const { uploadVideo } = require('../middleware/videoUploads'); // ← fix here
const { verifyAdmin } = require('../middleware/authMiddleware');

const {
  createEvent,
  getAdminStats,
  getAllEvents,
  deleteEvents,
  updateEvent,
  getAllUsers,
  deleteUser,
  updateUserRole,
  uploadVideo: handleUploadVideo,
} = require('../controllers/adminController');

const {
  getPendingEvents,
  approveEvent,
  rejectEvent,
} = require('../controllers/adminEventController');

// Event routes
router.post('/events', verifyAdmin, upload.array('images', 2), createEvent);
router.get('/events', getAllEvents);
router.delete('/events/:id', deleteEvents);
router.put('/events/:id', updateEvent);

// Admin stats
router.get('/stats', getAdminStats);

// User management
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/role', updateUserRole);

// Event approval
router.get('/pending-events', verifyAdmin, getPendingEvents);
router.put('/approve-event/:id', verifyAdmin, approveEvent);
router.delete('/reject-event/:id', verifyAdmin, rejectEvent);

// 🔥 Video upload
router.post('/videos', verifyAdmin, uploadVideo.single('video'), handleUploadVideo);
// router.get('/videos', getAllVideos);


module.exports = router;
