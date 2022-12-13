const React = require('react');
const PropTypes = require('prop-types');

// компоненты
const Header = require('./Header');
const Footer = require('./Footer');
const Layout = require('./Layout');

function Dashboard({ title, user }) {
  return (
    <Layout title={title}>
      <Header user={user} />

      <main className="flex-shrink-0">
        <div className="container">
          <h1 className="mt-5">
            Hello,
            {' '}
            {user.username}
            !
          </h1>
          <p className="lead">Welcome to your Dashboard</p>

        </div>
      </main>

      <Footer />
    </Layout>
  );
}

// PropTypes
Dashboard.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({ username: PropTypes.string }).isRequired,
};

module.exports = Dashboard;
