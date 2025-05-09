import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import "../../components/SavedNewsHeader/SavedNewsHeader.css";

const SavedNewsHeader = ({ isLoggedIn, SavedArticles, handleSignOut }) => {
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
        <span className="header__saved-span"> Keyword goes here</span>
      </p>
    </section>
  );
};

export default SavedNewsHeader;
