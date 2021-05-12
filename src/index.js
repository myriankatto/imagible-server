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
mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log(err));

// Add headers
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://www.imagible.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Origin',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
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
