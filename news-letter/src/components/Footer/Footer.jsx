import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__info">&copy; 2025 News Letter Site</p>
        <p className="footer__home-btn">Home</p>
        <p className="footer__school">TripleTen</p>
        <button className="footer__github-btn"></button>
        <button className="footer__linkedin-btn"></button>
      </div>
    </footer>
  );
}

export default Footer;
