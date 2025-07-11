const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { verifyUser } = require('../middleware/authMiddleware');
const { submitUserEvent, getUserEvents } = require('../controllers/userEventController');

/**
 * @swagger
 * tags:
 *   name: User Events
 *   description: User-submitted event endpoints
 */

/**
 * @swagger
 * /user/events:
 *   post:
 *     summary: Submit a new event (pending admin approval)
 *     tags: [User Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - date
 *               - time
 *               - district
 *               - category
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
 *         description: Event submitted for approval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 event:
 *                   $ref: '#/components/schemas/Event'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/events', verifyUser, upload.single('image'), submitUserEvent);

/**
 * @swagger
 * /user/my-events:
 *   get:
 *     summary: Get all events submitted by the authenticated user
 *     tags: [User Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched user's submitted events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 events:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to fetch user events
 */
router.get('/my-events', verifyUser, getUserEvents);

module.exports = router;
