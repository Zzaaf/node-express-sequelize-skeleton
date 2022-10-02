// использование данных из конфигурации файла .env
require('dotenv').config();

// импорт пакета для работы с почтой
const nodemailer = require('nodemailer');

// конфигурация nodemailer транспортёра почты
const transporter = nodemailer.createTransport(
  {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  },
  {
    from: 'Experss Skeleton App <Experss Skeleton App>',
  },
);

const messageCreator = (to, subject, text) => ({
  to,
  subject,
  text,
});

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Email send: ${info}`);
    }
  });
};

module.exports = { mailer, messageCreator };
