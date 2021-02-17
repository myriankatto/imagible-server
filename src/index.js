require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

/**
 * Database setup
 */
mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type,Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));

app.use(require('./routes'));

app.listen(process.env.PORT || 3000);
