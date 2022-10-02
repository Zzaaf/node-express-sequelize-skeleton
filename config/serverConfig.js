const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const sessionConfig = require('./sessionConfig');
const { cookiesCleaner, resLocals, getUser } = require('../middleware/auth');
const ssr = require('../middleware/ssr');

// главная конфигурация приложения
const serverConfig = (app) => {
  // использование middleware
  app.use(helmet.hidePoweredBy());
  app.use(helmet.xssFilter());
  app.use(helmet.referrerPolicy());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.static('public'));
  app.use(cookieParser());
  app.use(session(sessionConfig));
  app.use(cookiesCleaner);
  app.use(resLocals);
  app.use(getUser);
  app.use(ssr);
};

module.exports = serverConfig;
