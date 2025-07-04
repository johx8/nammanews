const Event = require('../models/eventModel');

exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      district,
      category,
      date,
      time,
      youtubeLink,
      isAdvertisement,
      redirectUrl,
    } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const istDate = new Date(date);
    istDate.setHours(0, 0, 0, 0); 

    const newEvent = new Event({
      title,
      description,
      district,
      category,
      date: istDate,
      time,
      youtubeLink,
      isAdvertisement,
      redirectUrl,
      imageUrl,
    });

    await newEvent.save();

    res.status(201).json({ success: true, message: 'Event created successfully', event: newEvent });
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ success: false, message: 'Failed to create event', error: err.message });
  }
};

const User = require('../models/user');
exports.getAdminStats = async (req, res) => {
  try{
    const userCount = await User.countDocuments();
    const eventCount = await Event.countDocuments();
    const currentDate = new Date();

    res.status(200).json({
      success: true,
      userCount,
      eventCount,
      currentDate: currentDate.toISOString('en-IN', { timeZone: 'Asia/Kolkata' }),
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch admin stats', error: error.message });
  }
};

exports.getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Failed to count users' });
  }
};

exports.getEventCount = async (req, res) => {
  try {
    const count = await Event.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Failed to count events' });
  }
};
