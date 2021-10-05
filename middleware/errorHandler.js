// промежуточная функция обработки ошибки и вывода её в ответе
const errorHandler = (err, req, res, next) => res.status(500).json({ error: err.message });

module.exports = errorHandler;
