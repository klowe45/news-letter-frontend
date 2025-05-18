import "./SavedNews.css";
import Navigation from "../Navigation/Navigation";
import SavedCardsArray from "../SavedNewsArray/SavedNewsArray";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import { useEffect, useContext, useState } from "react";
import { getUserArticles } from "../utils/api";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function SavedNews({
  isLoggedIn,
  handleSignOut,
  handleDeleteArticle,
  handleSaveArticle,
  savedArticles,
  keywords,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [userArticles, setUserArticles] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function fetchArticles() {
      try {
        const articles = await getUserArticles();
        if (isMounted && currentUser?._id) {
          const filteredArticles = articles.filter(
            (article) => article.owner === currentUser._id
          );
          setUserArticles(filteredArticles);
        }
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    }

    if (currentUser?._id) {
      fetchArticles();
    }

    return () => {
      isMounted = false;
    };
  }, [currentUser?._id]);

  return (
    <main className="saved__news">
      <Navigation isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />
      <SavedNewsHeader
        isLoggedIn={isLoggedIn}
        savedArticles={savedArticles}
        keywords={keywords}
      />
      <SavedCardsArray
        articles={userArticles}
        handleDeleteArticle={handleDeleteArticle}
        handleSaveArticle={handleSaveArticle}
      />
    </main>
  );
}

export default SavedNews;
