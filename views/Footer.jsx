const React = require('react');

function Footer() {
  return (
    <footer id="footer" className="pt-3 m-4 text-center">
      {`© Elbrus Bootcamp ${new Date().getFullYear()}`}
    </footer>
  );
}

module.exports = Footer;
