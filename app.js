const express = require('express');
const config = require('./config/config');
const mainRouter = require('./routes/mainRouter');
const usersRouter = require('./routes/usersRouter');

// инициализация приложения 'app'
const app = express();

// условное формирование порта
const port = process.env.PORT ?? 3000;

// конфигурация приложения
config(app);

// маршрутизация приложения
app.use('/', mainRouter);
app.use('/users', usersRouter);

// прослушивание порта приложения
app.listen(port, () => console.log(`***Server started at http://localhost:${port} port: OK`));

module.exports = app;
