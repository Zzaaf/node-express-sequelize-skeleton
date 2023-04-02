const React = require('react');
const PropTypes = require('prop-types');

// компоненты
const Layout = require('./Layout');
const Header = require('./Header');
const Footer = require('./Footer');

function Unsubscribe({ title }) {
  return (
    <Layout title={title}>
      <div className="container py-4">

        <Header />

        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">{title}</h1>
            <p className="col-md-8 fs-4">The email is currently on the mailing list</p>
            <a href="/dashboard" target="_blank" className="btn btn-success btn-lg m-1" type="button" rel="noreferrer">To Dashboard</a>
            <button type="button" className="btn btn-danger btn-lg m-1">Unsubscribe</button>
          </div>
        </div>

        <Footer />

      </div>
    </Layout>
  );
}

// PropTypes
Unsubscribe.propTypes = {
  title: PropTypes.string.isRequired,
};

module.exports = Unsubscribe;
