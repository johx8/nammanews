require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
require('dotenv').config();
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());
connectDB();
app.use('/api/auth', require('./routes/authRoutes'));
// Set up the server to listen on a specified port

app.use('/api/admin', require('./routes/adminRoutes'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/events', require('./routes/eventRoutes'));

app.use('/api', eventRoutes);

app.use('/api/user', userRoutes);

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
