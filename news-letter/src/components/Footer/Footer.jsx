import React from "react";
import "./Footer.css";

function Footer({ handleGithubClick, handleLinkedinClick }) {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__info">&copy; 2025 News Letter Site</p>
        <button className="footer__home-btn">Home</button>
        <p className="footer__school">TripleTen</p>
        <button
          className="footer__github-btn"
          onClick={handleGithubClick}
        ></button>
        <button
          className="footer__linkedin-btn"
          onClick={handleLinkedinClick}
        ></button>
      </div>
    </footer>
  );
}

export default Footer;
