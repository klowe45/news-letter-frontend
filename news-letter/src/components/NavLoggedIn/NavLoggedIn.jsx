import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import loggout from "../../assets/loggout.png";

function NavLoggedIn({ handleSignOut }) {
  const { currentUser } = useContext(CurrentUserContext);
  const location = useLocation();

  const onSignoutClick = (e) => {
    e.preventDefault();
    handleSignOut();
  };

  return (
    <ul className="header__navi-list">
      <li className="header__navi-list_items">
        <Link
          to="/"
          className={`header__navi-link ${
            location.pathname === "/" ? "active header__navi-home-link" : ""
          }`}
        >
          Home
        </Link>
      </li>
      <li className="header__navi-list_items">
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
      </li>
      <li className="header__navi-list_items">
        <div className="header__navi-signout">
          <p className="header__navi-name"></p>
          <button
            onClick={onSignoutClick}
            alt="Loggout"
            className="header__navi-loggout-btn"
          >
            {currentUser?.username}
            <img
              className="header__navi-loggout-btn_img"
              src={loggout}
              alt="Log out"
            />
          </button>
        </div>
      </li>
    </ul>
  );
}

export default NavLoggedIn;
