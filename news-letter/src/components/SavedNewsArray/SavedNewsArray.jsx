import "../SavedNewsArray/SavedNewsArray.css";
import { useContext } from "react";
import { UserArticleContext } from "../../context/UserArticleContext";
import NewsCard from "../NewsCard/NewsCard";

function SavedCardsArray({ handleDeleteArticle, handleSaveArticle }) {
  const { savedArticles, setSavedArticles } = useContext(UserArticleContext);

  return (
    <>
      <ul className="saved__cards">
        {savedArticles?.map((article) => {
          return (
            <NewsCard
              handleDeleteArticle={handleDeleteArticle}
              article={article}
              key={article.image}
              handleSaveArticle={handleSaveArticle}
            />
          );
        })}
      </ul>
    </>
  );
}

export default SavedCardsArray;
