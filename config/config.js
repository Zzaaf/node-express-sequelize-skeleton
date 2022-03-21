const express = require('express');
const cors = require('cors');
const hbs = require('hbs');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const sessionConfig = require('./sessionConfig');
const { cookiesCleaner, resLocals } = require('../middleware/auth');

// главная конфигурация приложения
const config = (app) => {
  // использование middleware
  app.use(helmet());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.static('public'));
  app.use(cookieParser());
  app.use(session(sessionConfig));
  app.use(cookiesCleaner);
  app.use(resLocals);

  // установка Express настроек
  app.set('view engine', 'hbs');
  app.set('views', 'views');

  // регистрация "помощников" для HBS
  hbs.registerHelper('currentYear', () => `© Elbrus Bootcamp ${new Date().getFullYear()}`);

  // регистрация подшаблонов
  hbs.registerPartials(path.join(process.env.PWD, 'views', 'partials'));
};

module.exports = config;
