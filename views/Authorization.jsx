/* eslint-disable jsx-a11y/label-has-associated-control */
const React = require('react');
const PropTypes = require('prop-types');

// компоненты
const Layout = require('./Layout');
const Footer = require('./Footer');

function Authorization({ title }) {
  return (
    <Layout title={title}>
      <section className="container text-center flex-grow-1">
        <main className="form-signin">
          <form id="formLogin" method="POST" action="/auth">
            <h1 className="h3 mb-3 fw-normal">Fill in the fields</h1>

            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="loginInputEmail"
                name="email"
                placeholder="name@example.com"
                required
                autoComplete="off"
              />
              <label htmlFor="loginInputEmail">Email address</label>
            </div>

            <div className="form-floating input-group">
              <input
                type="password"
                className="form-control"
                id="loginPassword"
                name="password"
                placeholder="Password"
                minLength="8"
                required
              />
              <label htmlFor="loginPassword">Password</label>
              <span id="wrapIcon" className="input-group-text">
                <i id="iconEye" className="bi bi-eye" />
              </span>
            </div>

            <div id="feedback" className="invalid-feedback" />

            <button type="submit" className="w-100 btn btn-lg btn-success mt-1">Login now</button>
            <a href="/" className="w-100 btn btn-lg btn-outline-secondary mt-1">Back home</a>
            <a href="/auth/forgot">Forgot your password?</a>
          </form>
        </main>

      </section>

      <Footer />
    </Layout>
  );
}

// PropTypes
Authorization.propTypes = {
  title: PropTypes.string.isRequired,
};

module.exports = Authorization;
