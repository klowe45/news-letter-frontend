import React from "react";
import "./Header.css";
import { useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({ handleSigninClick, handleSignupClick, handleSignOut }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <header className={"header"}>
      <Navigation
        handleSigninClick={handleSigninClick}
        handleSignupClick={handleSignupClick}
        handleSignOut={handleSignOut}
      />
      <div className="header__content">
        <h1 className="header__content-title">What's going on in the World?</h1>
        <p className="header__content-description">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <div className="header__search">
          <input className="header__input" placeholder="Enter topic"></input>
        </div>
        <button className="header__input-btn">Search</button>
      </div>
    </header>
  );
}

export default Header;

//<img className="header__img" src={headerBackImg} alt="background image" />
