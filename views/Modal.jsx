const React = require('react');

function Modal() {
  return (
    <div className="modal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add new card</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <form method="post" action="/cards">
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Title" />
              </div>
              <div className="mb-3">
                <textarea type="text" className="form-control" placeholder="Content" />
              </div>
              <button type="submit" className="btn btn-primary">Add card</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

module.exports = Modal;
