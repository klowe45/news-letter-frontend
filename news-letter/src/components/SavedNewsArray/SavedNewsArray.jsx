import "../SavedNewsArray/SavedNewsArray.css";
import { useContext } from "react";
import { UserArticleContext } from "../../context/UserArticleContext";
import NewsCard from "../NewsCard/NewsCard";

function SavedCardsArray({ handleDeleteArticle }) {
  const { userArticles } = useContext(UserArticleContext);

  return (
    <>
      <ul className="saved__cards">
        {userArticles?.map((article) => {
          return (
            <NewsCard
              handleDeleteArticle={handleDeleteArticle}
              article={article}
              key={article.image}
            />
          );
        })}
      </ul>
    </>
  );
}

export default SavedCardsArray;
