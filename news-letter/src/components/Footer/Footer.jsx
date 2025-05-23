import React from "react";
import "./Footer.css";
import { useLocation, useNavigate } from "react-router-dom";

function Footer({
  handleGithubClick,
  handleFacebookClick,
  handleTripleTenClick,
}) {
  const navigate = useNavigate();

  const homeClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__info">&copy; 2025 News Letter Site</p>

        <div className="footer__text-content">
          <div className="footer__home-tt">
            <button className="footer__home-btn" onClick={homeClick}>
              Home
            </button>
            <button
              className="footer__school-btn"
              onClick={handleTripleTenClick}
            >
              TripleTen
            </button>
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
      </div>
    </footer>
  );
}

export default Footer;
