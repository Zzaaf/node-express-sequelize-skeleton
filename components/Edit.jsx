const React = require('react');
const PropTypes = require('prop-types');

// компоненты
const Header = require('./Header');
const Footer = require('./Footer');
const Layout = require('./Layout');

function Edit({ user, id, title }) {
  return (
    <Layout title={title}>
      <Header user={user} />

      <main className="flex-shrink-0">
        <div className="container">
          <div className="row justify-content-center">
            <form id="formEdit" className="col-6 mt-5" action={`/users/${id}`}>
              <div className="mb-3">
                <input type="text" name="username" className="form-control" placeholder="User name" value={user.username} />
              </div>
              <div className="mb-3">
                <input type="email" name="email" className="form-control" placeholder="Email" value={user.email} />
              </div>
              <div className="card-body d-flex justify-content-end">
                <a href="/profile" className="btn btn-primary">Back to profile</a>
                <button type="submit" className="btn btn-success ms-1">Save</button>
              </div>

            </form>
          </div>

        </div>
      </main>
      <Footer />
    </Layout>
  );
}

// PropTypes
Edit.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({ username: PropTypes.string, email: PropTypes.string }).isRequired,
  id: PropTypes.number.isRequired,
};

module.exports = Edit;
