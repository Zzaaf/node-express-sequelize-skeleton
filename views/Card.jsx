/* eslint-disable react/prop-types */
const React = require('react');

function Card({ card }) {
  return (
    <div className="card m-4" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">{card.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{ }</h6>
        <p className="card-text">{card.content}</p>
        <a href="/" className="card-link">Edit card</a>
        <a href="/" className="card-link">Delete card</a>
      </div>
    </div>
  );
}

module.exports = Card;
