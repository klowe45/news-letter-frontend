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

  // Normalize article data
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
    (existingArticle) => existingArticle.link === article.url
  );

  const handleSaveClick = () => {
    if (isLoggedIn) {
      isSaved ? setIsClicked(false) : setIsClicked(true);
      handleSaveArticle(article);
      return;
    }
    setActiveModal("signin");
  };

  const handleDeleteClick = () => {
    handleDeleteArticle(article._id);
  };

  return (
    <div className="news__card-container">
      <div className="news__card-img_content" style={{ position: "relative" }}>
        {isLoggedIn &&
          location.pathname === "/saved-news" &&
          article.keyword && (
            <div className="news__card-keyword">{article.keyword}</div>
          )}

        <div className="news__card-btn">
          {!isLoggedIn && location.pathname === "/" && (
            <div className="news__card-signin">Sign in to save articles</div>
          )}

          {location.pathname === "/" && (
            <button
              className={
                isSaved
                  ? "news__card_save-active news__card_saved"
                  : "news__card_save"
              }
              onClick={handleSaveClick}
            ></button>
          )}

          {location.pathname === "/saved-news" && (
            <div className="news__card-delete-wrapper">
              <button
                className="news__card-delete"
                onClick={handleDeleteClick}
              ></button>
              <div className="news__card-delete_confirm">Remove from saved</div>
            </div>
          )}
        </div>

        <img src={image} alt={title} className="news__card-img" />
      </div>

      <div className="news__card-text">
        <span className="news__card-date">{date}</span>
        <Link to={link} target="_blank" className="news__card-title_link">
          <h2 className="news__card-title">{title}</h2>
        </Link>
        <p className="news__card-description">{description}</p>
        <p className="news__card-source">{source}</p>
      </div>
    </div>
  );
}

export default NewsCard;
/* <p className="news__card-source">{source}</p> put this afternews card descrip
<span className="news__card-date">{date}</span> put this after newscardtext
*/
