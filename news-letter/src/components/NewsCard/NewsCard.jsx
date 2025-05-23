import React, { useContext, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./NewsCard.css";
import { UserArticleContext } from "../../context/UserArticleContext";

function NewsCard({
  article,
  isLoggedIn,
  setActiveModal,
  handleSaveArticle,
  handleDeleteArticle,
}) {
  const location = useLocation();
  const { savedArticles } = useContext(UserArticleContext);
  const [isClicked, setIsClicked] = useState(false);

  const title = article.title || article.image || "No Title";
  const description = article.description || article.text || "No Description";
  const image = article.urlToImage || article.image;
  const link = article.url || article.link || "#";
  const source =
    article.source?.name?.toUpperCase().split(".")[0] ||
    article.source?.toUpperCase().split(".")[0] ||
    "Unknown Source";
  const date = new Date(article.publishedAt || article.date).toLocaleString(
    "default",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const isSaved = savedArticles?.some(
    (existingArticle) =>
      existingArticle.url === article.url ||
      existingArticle.link === article.url ||
      existingArticle.url === article.link
  );

  const handleSaveClick = () => {
    if (isLoggedIn) {
      isSaved ? setIsClicked(false) : setIsClicked(true);
      handleSaveArticle(article);
    } else {
      setActiveModal("signin");
    }
  };

  const handleDeleteClick = () => {
    if (!article._id) {
      console.warn("Missing _id! Cannot delete this article.");
      return;
    }
    handleDeleteArticle(article._id);
  };

  return (
    <div className="news__card-container">
      <div className="news__card-img-content">
        {location.pathname === "/saved-news" && article.keyword && (
          <div className="news__card-keyword">
            {article.keyword.charAt(0).toUpperCase() + article.keyword.slice(1)}
          </div>
        )}

        <div className="news__card-btn">
          {location.pathname === "/" && (
            <div className="news__card-save-wrapper">
              <button
                className={`news__card-save ${
                  isSaved ? "news__card-saved news__card_saved-checked" : ""
                }`}
                onClick={handleSaveClick}
              ></button>
              {!isLoggedIn && (
                <div className="news__card-save-signin">
                  Sign in to save articles
                </div>
              )}
            </div>
          )}

          {location.pathname === "/saved-news" && (
            <div className="news__card-delete-wrapper">
              <button
                className="news__card-delete"
                onClick={handleDeleteClick}
              ></button>
              <div className="news__card-delete-confirm">Remove from saved</div>
            </div>
          )}
        </div>

        <img src={image} alt={title} className="news__card-img" />
      </div>

      <div className="news__card-text">
        <span className="news__card-date">{date}</span>
        <Link to={link} target="_blank" className="news__card-title-link">
          <h2 className="news__card-title">{title}</h2>
        </Link>
        <p className="news__card-description">{description}</p>
        <p className="news__card-source">{source}</p>
      </div>
    </div>
  );
}

export default NewsCard;
