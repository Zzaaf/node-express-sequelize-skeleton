// использование данных из конфигурации файла .env
require('dotenv').config();

// пакет паспорт который работает со стратегиями аутентификации
const passport = require('passport');

// стратегия аутентификации через Google OAuth 2.0
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// применение стратегии
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_AUTH_REDIRECT_CALLBACK_URI,
}));
