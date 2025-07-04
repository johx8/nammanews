require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
connectDB();
app.use('/api/auth', require('./routes/authRoutes'));
// Set up the server to listen on a specified port

app.use('/api/admin', require('./routes/adminRoutes'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/events', require('./routes/eventRoutes'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
