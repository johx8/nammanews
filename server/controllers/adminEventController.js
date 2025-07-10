const Event = require('../models/eventModel');

// Fetch all unapproved events
exports.getPendingEvents = async (req, res) => {
  try {
    const events = await Event.find({ approved: false });
    res.status(200).json({ success: true, events });
  } catch (err) {
    console.error('Error fetching pending events:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch pending events' });
  }
};

// Approve event
exports.approveEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedEvent = await Event.findByIdAndUpdate(eventId, { approved: true }, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.status(200).json({ success: true, message: 'Event approved successfully', event: updatedEvent });
  } catch (err) {
    console.error('Error approving event:', err);
    res.status(500).json({ success: false, message: 'Failed to approve event' });
  }
};

// Optionally reject (delete) event
exports.rejectEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    await Event.findByIdAndDelete(eventId);
    res.status(200).json({ success: true, message: 'Event rejected and deleted' });
  } catch (err) {
    console.error('Error rejecting event:', err);
    res.status(500).json({ success: false, message: 'Failed to reject event' });
  }
};
