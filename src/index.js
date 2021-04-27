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
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://imagible.herokuapp.com/');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
  );

  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));

app.use(require('./routes'));

app.listen(process.env.PORT || 3001);

