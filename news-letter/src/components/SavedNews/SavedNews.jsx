import "./SavedNews.css";
import Navigation from "../Navigation/Navigation";
import SavedCardsArray from "../SavedNewsArray/SavedNewsArray";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";

function SavedNews({
  isLoggedIn,
  handleSignOut,
  handleDeleteArticle,
  handleSaveArticle,
  currentKeyword,
}) {
  return (
    <main className="saved__news">
      <Navigation isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />
      <SavedNewsHeader
        isLoggedIn={isLoggedIn}
        currentKeyword={currentKeyword}
      />
      <SavedCardsArray
        handleDeleteArticle={handleDeleteArticle}
        handleSaveArticle={handleSaveArticle}
      />
    </main>
  );
}

export default SavedNews;
