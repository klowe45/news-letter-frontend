import React from "react";
import "./Footer.css";

function Footer({ handleGithubClick, handleFacebookClick }) {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__text-content">
          <div className="footer__home-tt">
            <button className="footer__home-btn">Home</button>
            <p className="footer__school">TripleTen</p>
          </div>
        </div>
        <div className="footer__social-buttons">
          <button
            className="footer__github-btn"
            onClick={handleGithubClick}
          ></button>
          <button
            className="footer__linkedin-btn"
            onClick={handleFacebookClick}
          ></button>
        </div>
      </div>
      <p className="footer__info">&copy; 2025 News Letter Site</p>
    </footer>
  );
}

export default Footer;
