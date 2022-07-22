const React = require('react');
const ReactDOMServer = require('react-dom/server');

// Вспомогательная функция для отправки HTML на основе React-компонента
function renderComponent(reactComponent, props = {}, options = { doctype: true }) {
  const reactElement = React.createElement(reactComponent, {
    ...this.app.locals, // передать app.locals
    ...this.locals, // передать res.locals
    ...props, // передать пропсы
  });
  const html = ReactDOMServer.renderToStaticMarkup(reactElement);

  if (options.doctype) {
    this.write('<!DOCTYPE html>');
  }

  this.end(html);
}

function ssr(req, res, next) {
  res.renderComponent = renderComponent;
  next();
}

module.exports = ssr;
