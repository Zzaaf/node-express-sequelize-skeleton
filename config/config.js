const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = require('../app');
const sessionConfig = require('./sessionConfig');
const { cookiesCleaner } = require('../middleware/auth');

// главная конфигурация приложения
const config = (app) => {
  // use
  app.use(helmet());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.static('public'));
  app.use(cookieParser());
  app.use(session(sessionConfig));
  app.use(cookiesCleaner);

  // set
  app.set('view engine', 'hbs');
  app.set('views', 'views');

  // run
  dotenv.config();
};

module.exports = config;
