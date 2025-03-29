import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h3 className="header__title">NewsExplorer</h3>
      <p className="header__home">Home</p>
      <button className="header__signin-btn">Sign In</button>
    </header>
  );
}

export default Header;
