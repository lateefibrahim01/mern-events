const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const { initialize } = require('./sockets/socketHandler');
const config = require('./config/config');

require('dotenv').config();

const app = express();
const server = require('http').createServer(app);
const io = initialize(server);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/auth', authRoutes);
app.use('/api', eventRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
