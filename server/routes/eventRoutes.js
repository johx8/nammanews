const express = require('express');
const router = express.Router();
const Event = require('../models/eventModel');

router.get('/date/:date', async (req, res) => {
  try {
    const inputDate = new Date(req.params.date);

// Create start and end of day in **IST**
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





    // const selectedDate = new Date(req.params.date);
    // const nextDay = new Date(selectedDate);
    // nextDay.setDate(selectedDate.getDate() + 1);
// 
    // const events = await Event.find({
    //   date: {
        // $gte: selectedDate,
        // $lt: nextDay
    //   }
    // });

    res.status(200).json({ events });
  } catch (err) {
    console.error('Error fetching events by date:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;