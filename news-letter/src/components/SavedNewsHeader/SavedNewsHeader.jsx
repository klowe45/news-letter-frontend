import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import "../../components/SavedNewsHeader/SavedNewsHeader.css";

const SavedNewsHeader = ({
  isLoggedIn,
  SavedArticles,
  handleSignOut,
  currentKeyword,
}) => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <section className="header__saved">
      <p className="header__saved-title">Saved articles</p>
      <p className="header__saved-count">
        {currentUser?.username}, you have {SavedArticles?.length || 0} saved
        articles
      </p>
      <p className="header__saved-keywords">
        By keywords:
        <span className="header__saved-span">
          {" "}
          {currentKeyword[0]}{" "}
          {currentKeyword[1] ? `, ${currentKeyword[1]}` : ""}
          {currentKeyword[2] ? `, and ${currentKeyword.length - 2} other` : ""}
        </span>
      </p>
    </section>
  );
};

export default SavedNewsHeader;
