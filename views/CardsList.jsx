const React = require('react');
const PropTypes = require('prop-types');

// компоненты
const Header = require('./Header');
const Footer = require('./Footer');
const Layout = require('./Layout');
const Card = require('./Card');
const AddCard = require('./AddCard');

function CardsList({ user, title }) {
  return (
    <Layout title={title}>
      <Header user={user} />

      <main className="flex-shrink-0">
        <div className="container">
          <section style={{
            display: 'flex',

          }}
          >
            <Card />

            <AddCard />
          </section>

          <Footer />
        </div>
      </main>
    </Layout>
  );
}

// PropTypes
CardsList.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    id: PropTypes.number,
    email: PropTypes.string,
  }).isRequired,
};

module.exports = CardsList;
