import React from "react";
import "./Header.css";
//import headerBackImg from "../../assets/headerBackImg.jpeg";

function Header() {
  return (
    <header className="header">
      <div className="header__navi">
        <h3 className="header__title">NewsExplorer</h3>
        <button className="header__home-btn">Home</button>
        <button className="header__signin-btn">Sign In</button>
      </div>
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
