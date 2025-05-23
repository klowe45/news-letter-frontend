import "../SavedNewsArray/SavedNewsArray.css";
import { useContext } from "react";
import { UserArticleContext } from "../../context/UserArticleContext";
import NewsCard from "../NewsCard/NewsCard";

function SavedCardsArray({ handleDeleteArticle, handleSaveArticle }) {
  const { savedArticles } = useContext(UserArticleContext);

  return (
    <div className="saved__news-container">
      <ul className="saved__news-list">
        {savedArticles?.map((article) => {
          return (
            <NewsCard
              handleDeleteArticle={handleDeleteArticle}
              article={article}
              key={article._id || article.url} // Use a unique key for each article
              handleSaveArticle={handleSaveArticle}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default SavedCardsArray;
