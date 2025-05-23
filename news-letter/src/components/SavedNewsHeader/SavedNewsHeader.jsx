import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import "../../components/SavedNewsHeader/SavedNewsHeader.css";

const SavedNewsHeader = ({ savedArticles, keywords }) => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <section className="header__saved">
      <h1 className="header__saved-title">Saved articles</h1>
      <p className="header__saved-count">
        {currentUser?.username}, you have {savedArticles?.length || 0} saved
        articles
      </p>
      <p className="header__saved-keywords">
        By keywords:
        <span className="header__saved-span">
          {" "}
          {keywords[0]}
          {keywords[1] ? `, ${keywords[1]}` : ""}
          {keywords[2] ? `, and ${keywords.length - 2} other` : ""}
        </span>
      </p>
    </section>
  );
};

export default SavedNewsHeader;
