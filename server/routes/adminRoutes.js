const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  createEvent,
  getAdminStats
} = require('../controllers/adminController');

// Routes
router.post('/events', upload.single('image'), createEvent);
router.get('/stats', getAdminStats);

router.get('/events/count', adminController.getEventCount);
router.get('/users/count', adminController.getUserCount);

module.exports = router;
