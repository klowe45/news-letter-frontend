import { useLocation } from "react-router-dom";
import "./Navigation.css";
import NavLoggedOut from "../NavLoggedOut/NavLoggedOut";
import NavLoggedIn from "../NavLoggedIn/NavLoggedIn";

function Navigation({ handleSigninClick, handleSignOut, isLoggedIn }) {
  const location = useLocation();
  const onSavedPageLocation = location.pathname === "/saved-news";

  return (
    <div
      className={`header__navi ${
        onSavedPageLocation ? "header__navi-black" : ""
      }`}
    >
      <p
        className={`header__navi-title ${
          onSavedPageLocation ? "header__navi-title_black" : ""
        }`}
      >
        News Explorer
      </p>
      {!isLoggedIn ? (
        <NavLoggedOut handleSigninClick={handleSigninClick} />
      ) : (
        <NavLoggedIn handleSignOut={handleSignOut} />
      )}
    </div>
  );
}

export default Navigation;
