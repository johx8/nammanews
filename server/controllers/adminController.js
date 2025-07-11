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
      imageUrl: req.file ? req.file.path : '',
      approved: true, // Admin-created events are auto-approved
      createdBy: req.user.userId
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

exports.getAllEvents = async (req, res) => {
  try{
    const events = await Event.find().sort({ date: -1 });
    res.status(200).json({ success: true, events });
  }catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch events', error: error.message });
  }
};

exports.deleteEvents = async (req, res) => {
  try{
      await Event.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete event', error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try{
    const { id } = req.params;
    const updatedData = req.body;

    // Optional: handle new image file if uploaded
    if (req.file) {
      updatedData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
  }catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ success: false, message: 'Failed to update event', error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try{
     const users = await User.find().select('-password');
     res.status(200).json(users );
  }catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch users', error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try{
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  }catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Failed to delete user', error: error.message });
  }
};

exports.updateUserRole = async (req, res) => {
 const { role } = req.body;
  const validRoles = ['user', 'admin', 'editor'];

  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User role updated', user: updatedUser });
  } catch (err) {
    console.error('Failed to update role:', err);
    res.status(500).json({ message: 'Failed to update user role' });
  }
};

