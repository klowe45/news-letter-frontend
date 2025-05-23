import { useLocation } from "react-router-dom";
import "./Navigation.css";
import NavLoggedOut from "../NavLoggedOut/NavLoggedOut";
import NavLoggedIn from "../NavLoggedIn/NavLoggedIn";
import { useState } from "react";
import MobileDropDown from "../mobileDropDown/mobileDropDown";

function Navigation({
  handleSigninClick,
  handleSignOut,
  isLoggedIn,
  isSigninModalOpen,
  handleSignupClick,
}) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mobileMenuClick = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };

  const handleSigninFromMenu = () => {
    setMobileMenuOpen(false);
    handleSigninClick();
  };

  const isSavedNews = location.pathname === "/saved-news";

  return (
    <>
      <div
        className={`header__navi
    ${isSavedNews ? "header__navi-black" : ""}
    ${mobileMenuOpen ? "header__navi--mobile-open" : ""}
  `}
      >
        <p
          className={`header__navi-title ${
            isSavedNews && !mobileMenuOpen ? "header__navi-title_black" : ""
          }`}
        >
          News Explorer
        </p>

        {!isSigninModalOpen && (
          <button
            className={
              mobileMenuOpen
                ? "header__navi-mobile-button_x"
                : isSavedNews
                ? "header__navi-mobile-button-black"
                : "header__navi-mobile-button"
            }
            onClick={mobileMenuClick}
          ></button>
        )}

        {!isLoggedIn ? (
          <NavLoggedOut handleSigninClick={handleSigninClick} />
        ) : (
          <NavLoggedIn
            handleSignOut={handleSignOut}
            mobileMenuOpen={mobileMenuOpen}
          />
        )}
      </div>

      {mobileMenuOpen && (
        <>
          <div className="mobile__overlay" onClick={mobileMenuClick}></div>

          <MobileDropDown
            handleSigninFromMenu={handleSigninFromMenu}
            isLoggedIn={isLoggedIn}
            handleSignOut={handleSignOut}
          />
        </>
      )}
    </>
  );
}

export default Navigation;
