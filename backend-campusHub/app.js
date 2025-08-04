const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();


// Import routes
const userRoutes = require('./routes/userRoutes');
const clubRoutes = require('./routes/clubRoutes');
const eventRoutes = require('./routes/eventRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const bookingEventRoutes = require('./routes/bookingEventRoutes');

const app = express();

app.use(cors());
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/clubs', clubRoutes);  
app.use('/api/events', eventRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/bookingEvents', bookingEventRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Campus Hub API');
});

module.exports = app;