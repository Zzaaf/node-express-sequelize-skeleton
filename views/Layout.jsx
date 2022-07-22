const React = require('react');
const PropTypes = require('prop-types');

function Layout({ children, title }) {
  return (
    <html lang="en">

      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/img/icon-48x48.png" />
        <link rel="apple-touch-icon" sizes="48x48" href="/img/icon-48x48.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/img/icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="96x96" href="/img/icon-96x96.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/img/icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/img/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="256x256" href="/img/icon-256x256.png" />

        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css" />
        <link href="/css/style.css" rel="stylesheet" />

        <script defer src="/js/bootstrap.bundle.min.js" />
        <script defer src="/js/application.js" />
        <title>{title}</title>
      </head>

      <body>
        {children}
      </body>

    </html>
  );
}

// PropTypes
Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

module.exports = Layout;
