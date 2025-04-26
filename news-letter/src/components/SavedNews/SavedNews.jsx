import "../SavedNews/SavedNews.css";
import Navigation from "../Navigation/Navigation";

function SavedNews({ isLoggedIn, handleSignOut, handleDeleteArticle }) {
  return (
    <div className="saved__news">
      <Navigation isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />
    </div>
  );
}

export default SavedNews;
