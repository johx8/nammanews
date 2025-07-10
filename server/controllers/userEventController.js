const Event = require('../models/eventModel');
const mongoose = require('mongoose');

exports.submitUserEvent = async (req, res) => {
  try {
    //  console.log('➡️ req.user:', req.user);
    const { title, description, date, time, district, category } = req.body;

    const event = new Event({
      title,
      description,
      date,
      time,
      district,
      category,
      image: req.file ? req.file.path : null,
      approved: false,
      createdBy: req.user.userId
    });

    await event.save();

    res.status(201).json({ success: true, message: 'Event submitted for approval', event });
  } catch (err) {
    console.error('Error submitting user event:', err);
    res.status(500).json({ success: false, message: 'Failed to submit event' });
  }
};

exports.getUserEvents = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.userId);

    const events = await Event.find({ createdBy: userId });

    res.status(200).json({ success: true, events });
  } catch (err) {
    console.error('Error fetching user events:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch user events' });
  }
};
