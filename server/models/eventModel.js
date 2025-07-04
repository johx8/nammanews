const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    // enum: ['education', 'food', 'business', 'dance', 'arts', 'workshop', 'health', 'finance', 'advertisements'],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: '',
  },
  youtubeLink: {
    type: String,
    default: '',
  },
  isAdvertisement: {
    type: Boolean,
    default: false,
  },
  redirectUrl: {
    type: String,
    default: '',
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
