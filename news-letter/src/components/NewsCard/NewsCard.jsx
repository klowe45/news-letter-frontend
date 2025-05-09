import { React, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import "./NewsCard.css";
import { UserArticleContext } from "../../context/UserArticleContext";
import { Link } from "react-router-dom";

function NewsCard({
  article,
  isLoggedIn,
  setActiveModal,
  handleSaveArticle,
  handleDeleteArticle,
}) {
  const location = useLocation();
  const { savedArticles, setSavedArticles } = useContext(UserArticleContext);
  const [isClicked, setIsClicked] = useState(false);

  /*const source =
    location.pathname === "/"
      ? article.source?.name?.toUpperCase().split(".")[0]
      : article.source?.toUpperCase().split(".")[0];

  const date = new Date(
    location.pathname === "/" ? article.publishedAt : article.date
  ).toLocaleString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });*/

  const isSaved = savedArticles?.some((existingArticle) => {
    return existingArticle.link === article.url;
  });

  const handleSaveClick = async () => {
    if (isLoggedIn) {
      isSaved === true ? setIsClicked(false) : setIsClicked(true);
      handleSaveArticle(article);
      console.log("Save Article btn clicked");
      return;
    }
    setActiveModal("signin");
  };

  const handleDeleteClick = () => {
    handleDeleteArticle(article._id);
  };

  return (
    <div className="news__card-container">
      <div className="news__card-img_content">
        {location.pathname === "/saved-news" && (
          <div className="news__card-keyword_img">{article.keyword}</div>
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
            <button
              className="news__card-delete"
              onClick={handleDeleteClick}
            ></button>
          )}
        </div>
        <img
          src={location.pathname === "/" ? article.urlToImage : article.image}
          alt={article.title}
          className="news__card-img"
        />
      </div>
      <div className="news__card-text">
        <Link
          to={article.link}
          target="_blank"
          className="news__card-title_link"
        >
          <h2 className="news__card-title">{article.title}</h2>
        </Link>
        <p className="news__card-description">
          {location.pathname === "/" ? article.description : article.text}
        </p>
      </div>
    </div>
  );
}

export default NewsCard;
/* <p className="news__card-source">{source}</p> put this afternews card descrip
<span className="news__card-date">{date}</span> put this after newscardtext
*/
