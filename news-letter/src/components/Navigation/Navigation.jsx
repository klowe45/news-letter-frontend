import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";
import { useContext } from "react";
import UserContext from "../context/usercontext";
import logout from "../../assets/logout.png";

function Navigation({ handleSigninClick, handleSignupClick, handleSignOut }) {
  const { currentUser, isLoggedIn } = useContext(UserContext);
  const location = useLocation();

  return (
    <div className="header__navi">
      <h3 className="header__navi-title">NewsExplorer</h3>
      <div className="header__navi-links">
        <Link
          to="/"
          className={`header__navi-link ${
            location.pathname === "/" ? "active header__navi-home-link" : ""
          }`}
        >
          Home
        </Link>
        {isLoggedIn && (
          <Link
            to="/saved-news"
            className={`header__navi-link ${
              location.pathname === "/saved-news"
                ? "active header__navi-saved-news"
                : ""
            }`}
          >
            Saved articles
          </Link>
        )}
      </div>
      {isLoggedIn ? (
        <button
          type="button"
          className="header__navi-logout-btn"
          onClick={handleSignOut}
        >
          {currentUser.username}
          <img className="header__navi-loggout" src={logout} />
        </button>
      ) : (
        <button
          type="button"
          className="header__navi-signin-btn"
          onClick={handleSigninClick}
        >
          Sign in
        </button>
      )}
    </div>
  );
}

export default Navigation;
