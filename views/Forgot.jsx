/* eslint-disable jsx-a11y/label-has-associated-control */
const React = require('react');
const PropTypes = require('prop-types');

// компоненты
const Layout = require('./Layout');
const Footer = require('./Footer');

function Forgot({ title }) {
  return (
    <Layout title={title}>
      <section className="container text-center flex-grow-1">
        <main className="form-forgot">
          <form id="formForgot" method="POST" action="/auth/forgot">
            <h1 className="h3 mb-3 fw-normal">Fill in the fields to reset your password</h1>

            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="loginInputEmail"
                name="email"
                placeholder="Your email in system"
                required
                autoComplete="off"
              />
              <label htmlFor="loginInputEmail">Your email in system</label>
            </div>

            <div id="feedback" className="invalid-feedback" />

            <button type="submit" className="w-100 btn btn-lg btn-success mt-1">Reset password</button>
            <a href="/" className="w-100 btn btn-lg btn-outline-secondary mt-1">Back home</a>

          </form>
        </main>

      </section>
      <Footer />
    </Layout>
  );
}

// PropTypes
Forgot.propTypes = {
  title: PropTypes.string.isRequired,
};

module.exports = Forgot;
