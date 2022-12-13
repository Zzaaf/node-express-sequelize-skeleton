// пакет для автоматической компиляции файлов (JSX > HTML)
require('@babel/register');

// использование данных из конфигурации файла .env
require('dotenv').config();

const express = require('express');
const serverConfig = require('./config/serverConfig');

// роутеры
const apiRouter = require('./routes/api/api.main');
const mainRouter = require('./routes/render/main.routes');
const authRouter = require('./routes/render/auth.routes');
const regRouter = require('./routes/render/reg.routes');
const usersRouter = require('./routes/render/users.routes');
const cardsRouter = require('./routes/render/cards.routes');

const errorHandler = require('./middleware/errorHandler');
const { sequelize } = require('./db/models');

// инициализация приложения 'app'
const app = express();

// условное формирование порта
const port = process.env.PORT ?? 3000;

// конфигурация приложения
serverConfig(app);

// маршрутизация приложения
app.use('/', mainRouter);
app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/registration', regRouter);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// обработка ошибок из next(error)
app.use(errorHandler);

// проверка работы ДБ
sequelize.authenticate();

// прослушивание порта приложения
app.listen(port, () => {
  console.log(`*** Server started at ${port} port ***`);
});
