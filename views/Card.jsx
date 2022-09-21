const React = require('react');

function Card(props) {
  return (
    <div className="card m-4" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="/" className="card-link">Edit card</a>
        <a href="/" className="card-link">Delete card</a>
      </div>
    </div>
  );
}

module.exports = Card;
