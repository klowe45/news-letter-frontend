import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";
import NavLoggedOut from "../NavLoggedOut/NavLoggedOut";
import NavLoggedIn from "../NavLoggedIn/NavLoggedIn";

function Navigation({
  handleSigninClick,
  handleSignOut,
  isLoggedIn,
  currentUser,
}) {
  const location = useLocation();

  return (
    <div className="header__navi">
      <p className="header__navi-title">News Explorer</p>
      {!isLoggedIn ? (
        <NavLoggedOut handleSigninClick={handleSigninClick} />
      ) : (
        <NavLoggedIn handleSignOut={handleSignOut} />
      )}
    </div>
  );
}

export default Navigation;
