import { Link, useLocation } from "react-router-dom";

function NavLoggedOut({ handleSigninClick }) {
  const location = useLocation();

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
        <button
          type="button"
          className="header__navi-signin-btn"
          onClick={handleSigninClick}
        >
          Sign in
        </button>
      </li>
    </ul>
  );
}

export default NavLoggedOut;
