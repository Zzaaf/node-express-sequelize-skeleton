const React = require('react');
const PropTypes = require('prop-types');

// компоненты
const Layout = require('./Layout');
const Header = require('./Header');
const Footer = require('./Footer');

function Home({ title }) {
  return (
    <Layout title={title}>
      <div className="container py-4">

        <Header />

        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Custom Express Skeleton</h1>
            <p className="col-md-8 fs-4">An example of a skeleton with basic registration and authorization using sessions</p>
            <a
              href="https://github.com/Zzaaf/node-express-sequelize-skeleton"
              target="_blank"
              className="btn btn-success btn-lg"
              type="button"
              rel="noreferrer"
            >
              Visit
              GitHub

            </a>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2>Authorization in the app</h2>
              <p>Log in if you have already used this application and have an account</p>
              <a href="/login" className="btn btn-outline-light">Login</a>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5 bg-light border rounded-3">
              <h2>Registration in the app</h2>
              <p>Or create a new account by filling in the fields name, email and password</p>
              <a href="/registration" className="btn btn-outline-secondary">Registration</a>
            </div>
          </div>
        </div>

        <Footer />

      </div>
    </Layout>
  );
}

// PropTypes
Home.propTypes = {
  title: PropTypes.string.isRequired,
};

module.exports = Home;
