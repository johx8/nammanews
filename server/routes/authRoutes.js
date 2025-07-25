const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();


router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.put('/update/:id', authController.updateUser);

module.exports = router;
