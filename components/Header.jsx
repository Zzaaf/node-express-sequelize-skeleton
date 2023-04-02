/* eslint-disable react/jsx-no-useless-fragment */
const React = require('react');
const PropTypes = require('prop-types');

function Header({ user }) {
  return (
    <>
      {user ? (
        <header className="p-3 bg-dark text-white mb-5">
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                  <use xlinkHref="#bootstrap" />
                </svg>
              </a>

              <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li><a href="/profile" className="nav-link px-2 text-white">Profile</a></li>
                <li><a href="/dashboard" className="nav-link px-2 text-white">Dashboard</a></li>
                <li><a href="/cards" className="nav-link px-2 text-white">Cards</a></li>
              </ul>

              <div className="text-end">
                <a href="/logout" className="btn btn-warning">Logout</a>
              </div>
            </div>
          </div>
        </header>
      ) : (
        <header className="pb-3 mb-4 border-bottom">
          <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
            <span className="fs-4">Simple Auth System</span>
          </a>
        </header>
      )}
    </>
  );
}

// PropTypes
Header.propTypes = {
  user: PropTypes.shape({ username: PropTypes.string || undefined }),
};

Header.defaultProps = {
  user: undefined,
};

module.exports = Header;
