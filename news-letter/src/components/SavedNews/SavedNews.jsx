import "../SavedNews/SavedNews.css";
import Navigation from "../Navigation/Navigation";
import SavedCardsArray from "../SavedNewsArray/SavedNewsArray";

function SavedNews({ isLoggedIn, handleSignOut, handleDeleteArticle }) {
  return (
    <div className="saved__news">
      <Navigation isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />
      <SavedCardsArray handleDeleteArticle={handleDeleteArticle} />
    </div>
  );
}

export default SavedNews;
