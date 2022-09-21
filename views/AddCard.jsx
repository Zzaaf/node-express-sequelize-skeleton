const React = require('react');

function AddCard(props) {
  return (
    <div
      className="m-4"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        fontSize: '4rem',
      }}
    >

      <i className="bi bi-plus-square-dotted" />

    </div>
  );
}

module.exports = AddCard;
