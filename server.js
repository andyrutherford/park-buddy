const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const auth = require('./routes/auth-route');

const app = express();

// CORS
app.use(cors());

app.use(express.json());

// HTTP request logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}.`));
