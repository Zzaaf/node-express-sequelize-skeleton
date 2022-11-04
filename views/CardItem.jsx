/* eslint-disable react/prop-types */
const React = require('react');

function CardItem({ card }) {
  return (
    <div id={`card-${card.id}`} className="card m-4" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">{card.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{ }</h6>
        <p className="card-text">{card.content}</p>
        <button type="button" data-id={card.id} className="btn btn-primary">Edit card</button>
        <button type="button" data-id={card.id} className="btn btn-danger m-1">Delete card</button>
      </div>
    </div>
  );
}

module.exports = CardItem;
