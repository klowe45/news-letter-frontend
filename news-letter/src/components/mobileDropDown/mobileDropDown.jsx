import "./MobileDropDown.css";
import { useNavigate, useLocation } from "react-router-dom";

function MobileDropDown({ handleSigninFromMenu, isLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const onSavedPage = location.pathname === "/saved-news";

  const handleTogglePage = () => {
    const destination = onSavedPage ? "/" : "/saved-news";
    navigate(destination);
    setTimeout(() => {
      document.querySelector(".mobile__overlay")?.click();
    }, 0);
  };

  return (
    <div className="mobile__drop_down">
      <p className="mobile__drop_down-home">Home</p>

      {!isLoggedIn ? (
        <button
          className="mobile__drop_down-btn"
          onClick={handleSigninFromMenu}
        >
          Sign In
        </button>
      ) : (
        <button className="mobile__drop_down-btn" onClick={handleTogglePage}>
          {onSavedPage ? "Home" : "Saved News"}
        </button>
      )}
    </div>
  );
}

export default MobileDropDown;
