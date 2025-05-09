import "./SavedNews.css";
import Navigation from "../Navigation/Navigation";
import SavedCardsArray from "../SavedNewsArray/SavedNewsArray";

function SavedNews({
  isLoggedIn,
  handleSignOut,
  handleDeleteArticle,
  handleSaveArticle,
}) {
  return (
    <main className="saved__news">
      <Navigation isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />
      <SavedCardsArray
        handleDeleteArticle={handleDeleteArticle}
        handleSaveArticle={handleSaveArticle}
      />
    </main>
  );
}

export default SavedNews;
