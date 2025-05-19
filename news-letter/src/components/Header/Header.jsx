import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";

function Header({
  handleSigninClick,
  handleSignOut,
  isLoggedIn,
  handleSearchSubmit,
  setCurrentKeyword,
  uponSearch,
  isSigninModalOpen,
  handleSignupClick,
}) {
  return (
    <header className="header">
      <div className="header__navi-container">
        <Navigation
          handleSigninClick={handleSigninClick}
          handleSignOut={handleSignOut}
          isLoggedIn={isLoggedIn}
          isSigninModalOpen={isSigninModalOpen}
          handleSignupClick={handleSignupClick}
        />
      </div>
      <div className="header__content">
        <h1 className="header__content-title">What's going on in the World?</h1>
        <p className="header__content-description">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
      </div>

      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        setCurrentKeyword={setCurrentKeyword}
        uponSearch={uponSearch}
      />
    </header>
  );
}

export default Header;
