/* eslint-disable react/prop-types */
const React = require('react');
const PropTypes = require('prop-types');

// компоненты
const Header = require('./Header');
const Footer = require('./Footer');
const Layout = require('./Layout');
const CardItem = require('./CardItem');
const AddCard = require('./AddCard');
const Modal = require('./Modal');

function CardsList({ user, title, cards }) {
  return (
    <Layout title={title}>
      <Header user={user} />

      <main className="flex-shrink-0">
        <div className="container">
          <section>

            <div className="row">
              <div className="d-flex justify-content-md-center">
                <AddCard />
              </div>
            </div>

            <div className="card-list" id="cardList">
              {cards.length > 0 && cards.map((card) => <CardItem key={card.id} card={card} />)}
            </div>

            <Modal />

          </section>

        </div>
      </main>
      <Footer />
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
