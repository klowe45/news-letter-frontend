import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "./components/Main/Main.jsx";
import Footer from "./components/Footer/Footer";
import { act, useEffect, useState } from "react";
import SignupModal from "./components/SignupModal/SignupModal";
import SigninModal from "./components/SigninModal/SigninModal";
import RegistrationSuccessModal from "./components/RegistrationSuccessModal/RegistrationSuccessModal";
import * as auth from "./components/utils/auth";
import { CurrentUserContext } from "./context/CurrentUserContext.js";
import { getToken, setToken, removeToken } from "./components/utils/Token.js";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoutes.jsx";
import {
  deleteArticles,
  saveArticles,
  getUser,
  getUserArticles,
} from "./components/utils/api.js";
import { API_KEY, getNews } from "./components/utils/newsApi.js";
import { getLastWeeksDate, getTodaysDate } from "./components/utils/Dates.js";
import SavedNews from "./components/SavedNews/SavedNews.jsx";
import { UserArticleContext } from "./context/UserArticleContext.js";

function App() {
  /***************************************************************************
   *                                  Modal                                  *
   **************************************************************************/

  const [activeModal, setActiveModal] = useState("");

  const closeModal = () => {
    setActiveModal("");
  };

  const handleSignupClick = () => {
    setActiveModal("signup");
  };

  const handleSigninClick = () => {
    setActiveModal("signin");
  };

  const handleSignupSuccessClick = () => {
    setActiveModal("signupSuccess");
  };

  /***************************************************************************
   *                                  USER                                   *
   **************************************************************************/

  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const userContext = {
    currentUser,
    setCurrentUser,
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  /***************************************************************************
   *                                  Signup                                 *
   **************************************************************************/

  const handleSignupSubmit = ({ email, password, username }) => {
    console.log("submit button works", {
      email,
      password,
      username,
    });
    auth
      .signUp(email, password, username)
      .then(() => {
        handleSigninSubmit({ email, password });
        closeModal();
      })
      .catch((err) => console.error("Error handling signup submit", err));
  };

  /***************************************************************************
   *                                  Auth                                   *
   **************************************************************************/

  const [isAuth, setIsAuth] = useState(false);

  /***************************************************************************
   *                                  Signin                                 *
   **************************************************************************/

  const handleSigninSubmit = ({ email, password }) => {
    auth
      .signIn(email, password)
      .then((data) => {
        console.log("Sign in success", data);
        setToken(data.token);
        handleTokenCheck(data.token);
        closeModal();
      })
      .catch((err) => console.error("Error handling signin submit", err));
  };

  /***************************************************************************
   *                                  Sign out                               *
   **************************************************************************/

  const handleSignOut = () => {
    removeToken();
    setIsLoggedIn(false);
    setCurrentUser({
      email: "",
      username: "",
    });

    console.log("logout clicked");
  };

  /**************************************************************************
   *                                  Token                                  *
   **************************************************************************/

  const handleTokenCheck = (token) => {
    auth
      .checkToken(token)
      .then((res) => {
        setCurrentUser(res.data);
        setIsLoggedIn(true);
      })
      .catch((err) => console.error("Error during token check", err));
  };

  useEffect(() => {
    const token = getToken();
    console.log("Token on load:", token);

    if (!token || token === "undefined") {
      setIsAuth(true);
      return;
    }
    handleTokenCheck(token);
  }, []);

  /**************************************************************************
   *                                  Main                                  *
   **************************************************************************/

  const [isLoading, setIsLoading] = useState(false);

  /**************************************************************************
   *                             Search/Article/Save                        *
   **************************************************************************/

  const [isGoodNewsData, setIsGoodNewsData] = useState(false);
  const [userArticles, setUserArticles] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    const storedArticles = localStorage.getItem("savedArticles");
    if (storedArticles) {
      setSavedArticles(JSON.parse(storedArticles));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
  }, [savedArticles]);

  const handleSearchSubmit = () => {
    if (currentKeyword === "") {
      setIsGoodNewsData(true);
      return;
    }
    setIsLoading(true);
    setNewsData([]);
    setIsGoodNewsData(false);

    getNews(currentKeyword, API_KEY, getLastWeeksDate(), getLastWeeksDate())
      .then((data) => {
        console.log(data);
        setIsGoodNewsData(true);
        setNewsData(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSaveArticle = async (article) => {
    try {
      const alreadySaved = savedArticles.some(
        (a) => a.url === article.url || a.link === article.url
      );
      if (alreadySaved) return;

      const newSavedArticles = [...savedArticles, article];
      const savedArticle = await saveArticles({
        article,
        savedArticles: newSavedArticles,
      });

      setSavedArticles(newSavedArticles);
      localStorage.setItem("savedArticles", JSON.stringify(newSavedArticles));
    } catch (err) {
      console.error("Error saving article", err);
    }
  };

  /**************************************************************************
   *                             Delete Article                             *
   **************************************************************************/

  const handleDeleteArticle = (id) => {
    const token = getToken();
    if (!token) return;

    deleteArticles(id, token)
      .then((data) => {
        setUserArticles((prevArticles) =>
          prevArticles.filter((article) => article._id !== data.data._id)
        );
      })
      .catch((err) => console.error(`Error while deleting Article`, err));
    return;
  };

  /***************************************************************************
   *                                  Footer                                 *
   **************************************************************************/

  const handleGithubClick = () => {
    window.open("https://github.com/klowe45");
  };

  const handleLinkedinClick = () => {
    window.open("https://www.linkedin.com/in/kenneth-lowe45");
  };

  /**************************************************************************/

  return (
    <div className="page">
      <CurrentUserContext.Provider value={userContext}>
        <UserArticleContext.Provider
          value={{ savedArticles, setSavedArticles }}
        >
          <div className="page__content">
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    isLoading={isLoading}
                    handleSigninClick={handleSigninClick}
                    isGoodNewsData={isGoodNewsData}
                    handleSignOut={handleSignOut}
                    isLoggedIn={isLoggedIn}
                    handleSaveArticle={handleSaveArticle}
                    handleDeleteArticle={handleDeleteArticle}
                    handleSearchSubmit={handleSearchSubmit}
                    newsData={newsData}
                    setCurrentKeyword={setCurrentKeyword}
                  />
                }
              ></Route>
              <Route
                path="/saved-news"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    handleSignOut={handleSignOut}
                    setActiveModal={setActiveModal}
                  >
                    <SavedNews
                      isLoggedIn={isLoggedIn}
                      handleSignOut={handleSignOut}
                      handleDeleteArticle={handleDeleteArticle}
                      handleSaveArticle={handleSaveArticle}
                      savedArticles={savedArticles}
                      currentKeyword={currentKeyword}
                    />
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>

            <Footer
              handleGithubClick={handleGithubClick}
              handleLinkedinClick={handleLinkedinClick}
            />
          </div>
          <SignupModal
            closeModal={closeModal}
            activeModal={activeModal}
            handleSignupSubmit={handleSignupSubmit}
            handleSigninClick={handleSigninClick}
          />
          <SigninModal
            closeModal={closeModal}
            activeModal={activeModal}
            handleSignupClick={handleSignupClick}
            handleSigninSubmit={handleSigninSubmit}
          />
          <RegistrationSuccessModal
            closeModal={closeModal}
            activeModal={activeModal}
          />
        </UserArticleContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
