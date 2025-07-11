const express = require('express');
const router = express.Router();
const Event = require('../models/eventModel');
const User = require('../models/user');

router.get('events/youtube', async (req, res) => {
  try {
    const events = await Event.find({
      youtubeLink: { $ne: '' }, // Not empty
      approved: true
    });

    res.status(200).json({ success: true, events });
  } catch (err) {
    console.error('Error fetching YouTube events:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('events/ads', async (req, res) => {
  try {
    const events = await Event.find({
      isAdvertisement: true,
      approved: true
    });

    res.status(200).json({ success: true, events });
  } catch (err) {
    console.error('Error fetching advertisement events:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Public event retrieval endpoints
 */

/**
 * @swagger
 * /date/{date}:
 *   get:
 *     summary: Get events scheduled on a specific date (IST)
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Date in YYYY-MM-DD format
 *     responses:
 *       200:
 *         description: Events found on the specified date
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 events:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *       500:
 *         description: Server error
 */
router.get('/date/:date', async (req, res) => {
  try {
    const inputDate = new Date(req.params.date);
    const startIST = new Date(inputDate);
    startIST.setHours(0, 0, 0, 0);
    const endIST = new Date(inputDate);
    endIST.setHours(23, 59, 59, 999);

    const events = await Event.find({
      date: {
        $gte: startIST,
        $lte: endIST
      }
    });

    res.status(200).json({ events });
  } catch (err) {
    console.error('Error fetching events by date:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get details of a specific event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event's MongoDB ID
 *     responses:
 *       200:
 *         description: Event details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { district, category } = req.query;

    // Step 1: Build base filter
    const filter = {approved: true }; // Only fetch approved events

    if (district) filter.district = new RegExp(`^${district}$`, 'i');
    if (category) filter.category = new RegExp(`^${category}$`, 'i');

    // Step 2: Get all admin user IDs
    const admins = await User.find({ role: 'admin' }, '_id');
    const adminIds = admins.map(admin => admin._id);

    // Step 3: Fetch events that are either:
    // - approved: true
    // - or created by admin
    filter.$or = [
      { approved: true },
      { createdBy: { $in: adminIds } }
    ];

    // Step 4: Query
    const events = await Event.find(filter);
    res.status(200).json({ success: true, events });
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});







module.exports = router;
