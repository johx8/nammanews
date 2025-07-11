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

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-related APIs
 */

/**
 * @swagger
 * /admin/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *               district:
 *                 type: string
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Invalid request
 */
router.post('/events', verifyAdmin, upload.single('image'), createEvent);

/**
 * @swagger
 * /admin/stats:
 *   get:
 *     summary: Get admin dashboard statistics
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 */
router.get('/stats', getAdminStats);

/**
 * @swagger
 * /admin/events:
 *   get:
 *     summary: Get all events
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of all events
 */
router.get('/events', getAllEvents);

/**
 * @swagger
 * /admin/events/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Admin]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted successfully
 */
router.delete('/events/:id', deleteEvents);

/**
 * @swagger
 * /admin/events/{id}:
 *   put:
 *     summary: Update an event
 *     tags: [Admin]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *               time:
 *                 type: string
 *               district:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Event updated successfully
 */
router.put('/events/:id', updateEvent);

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of all users
 */
router.get('/users', getAllUsers);

/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Admin]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete('/users/:id', deleteUser);

/**
 * @swagger
 * /admin/users/{id}/role:
 *   put:
 *     summary: Update a user's role
 *     tags: [Admin]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       200:
 *         description: User role updated successfully
 */
router.put('/users/:id/role', updateUserRole);

/**
 * @swagger
 * /admin/pending-events:
 *   get:
 *     summary: Get all unapproved events
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pending events
 */
router.get('/pending-events', verifyAdmin, getPendingEvents);

/**
 * @swagger
 * /admin/approve-event/{id}:
 *   put:
 *     summary: Approve a submitted event
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event approved successfully
 */
router.put('/approve-event/:id', verifyAdmin, approveEvent);

/**
 * @swagger
 * /admin/reject-event/{id}:
 *   delete:
 *     summary: Reject (delete) a submitted event
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event rejected and deleted
 */
router.delete('/reject-event/:id', verifyAdmin, rejectEvent);

module.exports = router;
