/* eslint-disable jsx-a11y/label-has-associated-control */
const React = require('react');
const PropTypes = require('prop-types');

// компоненты
const Layout = require('./Layout');
const Footer = require('./Footer');

function Registration({ title }) {
  return (
    <Layout title={title}>
      <section className="container text-center">
        <main className="form-signin">
          <form id="formRegistration" method="POST" action="/registration">
            <h1 className="h3 mb-3 fw-normal">Fill in the fields</h1>

            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="regInputName"
                name="username"
                placeholder="name@example.com"
                required
                autoComplete="off"
              />
              <label htmlFor="regInputName">Your name</label>
            </div>

            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="regInputEmail"
                name="email"
                placeholder="name@example.com"
                required
                autoComplete="off"
              />
              <label htmlFor="regInputEmail">Email address</label>
            </div>

            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="regPassword"
                name="password"
                placeholder="Password"
                minLength="8"
                required
              />
              <label htmlFor="regPassword">Password</label>
            </div>

            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="regConfirmPassword"
                placeholder="Confirm Password"
                minLength="8"
                required
              />
              <label htmlFor="regConfirmPassword">Confirm Password</label>
            </div>

            <div id="feedback" className="invalid-feedback" />

            <button type="button" className="w-100 btn btn-lg btn-success mt-1">Register now</button>
            <a href="/" className="w-100 btn btn-lg btn-outline-secondary mt-1">Back home</a>

          </form>

        </main>

        <Footer />
      </section>
    </Layout>
  );
}

// PropTypes
Registration.propTypes = {
  title: PropTypes.string.isRequired,
};

module.exports = Registration;
