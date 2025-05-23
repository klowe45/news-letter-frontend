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
  deleteArticle,
  saveArticles,
  getUser,
  getUserArticles,
} from "./components/utils/api.js";
import { API_KEY, getNews } from "./components/utils/newsApi.js";
import { getLastWeeksDate, getTodaysDate } from "./components/utils/Dates.js";
import SavedNews from "./components/SavedNews/SavedNews.jsx";
import { UserArticleContext } from "./context/UserArticleContext.js";
import MobileDropDown from "./components/mobileDropDown/mobileDropDown.jsx";

function App() {
  /***************************************************************************
   *                                  Modal                                  *
   **************************************************************************/

  const [activeModal, setActiveModal] = useState("");
  const [isSigninModalOpen, setIsSigninModalOpen] = useState(false);

  const closeModal = () => {
    setActiveModal("");
    setIsSigninModalOpen(false);
  };

  const handleSignupClick = () => {
    setActiveModal("signup");
  };

  const handleSigninClick = () => {
    setActiveModal("signin");
    setIsSigninModalOpen(true);
  };

  const handleSignupSuccessClick = () => {
    setActiveModal("signupSuccess");
  };

  const openSigninModal = () => {
    setIsSigninModalOpen(true);
  };

  const closeSigninModal = () => {
    setIsSigninModalOpen(false);
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
        return auth.signIn(email, password);
      })
      .then((data) => {
        console.log("Sign in success after signup", data);
        setToken(data.token);
        handleTokenCheck(data.token);
        setActiveModal("signupSuccess");
      })
      .catch((err) => {
        console.error("Error handling signup submit", err);
      });
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
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const handleTokenCheck = (token) => {
    auth
      .checkToken(token)
      .then((res) => {
        setCurrentUser(res.data);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Error during token check", err);
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsAuthChecked(true);
      });
  };

  useEffect(() => {
    const token = getToken();
    if (!token || token === "undefined") {
      setIsAuthChecked(true);
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
  const [keywords, setKeywords] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    const storedArticles = localStorage.getItem("savedArticles");
    if (storedArticles) {
      setSavedArticles(JSON.parse(storedArticles));
    }
    const storedKeywords = localStorage.getItem("keywords");
    if (storedKeywords) {
      setKeywords(JSON.parse(storedKeywords));
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return;
    }
    auth.checkToken(token).then((res) => {
      setCurrentUser({
        username: res.data.username,
        _id: res.data._id,
      });
      getUserArticles(token).then((items) => {
        setSavedArticles(items.reverse());
      });
    });
  }, []);

  const handleSearchSubmit = (searchTerm) => {
    if (!searchTerm) {
      setIsGoodNewsData(true);
      return;
    }

    setIsLoading(true);
    setNewsData([]);
    setIsGoodNewsData(false);

    getNews(searchTerm, API_KEY, getLastWeeksDate(), getTodaysDate())
      .then((data) => {
        const articles = data.articles.slice(0, 50);
        setIsGoodNewsData(true);
        setNewsData(data.articles.slice(0, 50));
        setNewsData(articles);
        setIsLoading(false);

        const capitalizedKeyword =
          searchTerm.charAt(0).toUpperCase() +
          searchTerm.slice(1).toLowerCase();

        if (!keywords.includes(capitalizedKeyword)) {
          const updatedKeywords = [...keywords, capitalizedKeyword];
          setKeywords(updatedKeywords);
          localStorage.setItem("keywords", JSON.stringify(updatedKeywords));
        }

        localStorage.setItem("lastKeyword", searchTerm);
        localStorage.setItem("savedArticles", JSON.stringify(articles));
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  const handleSaveArticle = async (article) => {
    try {
      const currentKeyword = localStorage.getItem("lastKeyword") || "";

      const articleWithKeyword = {
        ...article,
        keyword: currentKeyword,
        _id: Date.now().toString(),
      };

      const alreadySaved = savedArticles.some(
        (a) =>
          a.url === articleWithKeyword.url || a.link === articleWithKeyword.url
      );
      if (alreadySaved) return;

      const newSavedArticles = [...savedArticles, articleWithKeyword];

      await saveArticles({
        article: articleWithKeyword,
        savedArticles: newSavedArticles,
      });

      setSavedArticles(newSavedArticles);
      localStorage.setItem("savedArticles", JSON.stringify(newSavedArticles));

      const capitalizedKeyword =
        currentKeyword.charAt(0).toUpperCase() +
        currentKeyword.slice(1).toLowerCase();

      if (capitalizedKeyword && !keywords.includes(capitalizedKeyword)) {
        const updatedKeywords = [...keywords, capitalizedKeyword];
        setKeywords(updatedKeywords);
        localStorage.setItem("keywords", JSON.stringify(updatedKeywords));
      }
    } catch (err) {
      console.error("Error saving article", err);
    }
  };
  /**************************************************************************
   *                             Delete Article                             *
   **************************************************************************/

  const handleDeleteArticle = (id) => {
    if (!id) {
      console.warn("Article missing _id, cannot delete.");
      return;
    }

    deleteArticle(id)
      .then((data) => {
        const deletedArticle = data.data;

        const updatedArticles = savedArticles.filter(
          (article) => article._id !== deletedArticle._id
        );

        setSavedArticles(updatedArticles);
        localStorage.setItem("savedArticles", JSON.stringify(updatedArticles));

        const keywordToCheck =
          deletedArticle.keyword || localStorage.getItem("lastKeyword");

        const keywordStillUsed = updatedArticles.some(
          (article) => article.keyword === keywordToCheck
        );

        if (
          !keywordStillUsed &&
          keywordToCheck &&
          keywords.includes(keywordToCheck)
        ) {
          const updatedKeywords = keywords.filter((k) => k !== keywordToCheck);
          setKeywords(updatedKeywords);
          localStorage.setItem("keywords", JSON.stringify(updatedKeywords));
        }
      })
      .catch((err) => console.error(`Error while deleting article`, err));
  };

  /***************************************************************************
   *                                  Footer                                 *
   **************************************************************************/

  const handleGithubClick = () => {
    try {
      const newWindow = window.open("https://github.com/klowe45", "_blank");
      if (
        !newWindow ||
        newWindow.closed ||
        typeof newWindow.closed === "undefined"
      ) {
        throw new Error("Popup blocked or failed to open");
      }
    } catch (error) {
      console.error("Failed to open GitHub:", error);
      alert("Unable to open GitHub. Please check your browser settings.");
    }
  };

  const handleFacebookClick = () => {
    try {
      const newWindow = window.open("https://www.facebook.com/", "_blank");
      if (
        !newWindow ||
        newWindow.closed ||
        typeof newWindow.closed === "undefined"
      ) {
        throw new Error("Popup blocked or failed to open");
      }
    } catch (error) {
      console.error("Failed to open Facebook:", error);
      alert("Unable to open Facebook. Please check your browser settings.");
    }
  };

  const handleTripleTenClick = () => {
    try {
      const newWindow = window.open("https://tripleten.com/", "_blank");
      if (
        !newWindow ||
        newWindow.closed ||
        typeof newWindow.closed === "undefined"
      ) {
        throw new Error("Popup blocked or failed to open");
      }
    } catch (error) {
      console.error("Failed to open tripleTen:", error);
      alert("Unable to open TripleTen. Please check your browser settings.");
    }
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
                    savedArticles={savedArticles}
                    isSigninModalOpen={isSigninModalOpen}
                    closeModal={closeModal}
                    handleSignupClick={handleSignupClick}
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
                    isAuthChecked={isAuthChecked}
                  >
                    <SavedNews
                      isLoggedIn={isLoggedIn}
                      handleSignOut={handleSignOut}
                      handleDeleteArticle={handleDeleteArticle}
                      handleSaveArticle={handleSaveArticle}
                      savedArticles={savedArticles}
                      keywords={keywords}
                    />
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>

            <Footer
              handleGithubClick={handleGithubClick}
              handleFacebookClick={handleFacebookClick}
              handleTripleTenClick={handleTripleTenClick}
            />
          </div>
          <SignupModal
            closeModal={closeModal}
            activeModal={activeModal}
            handleSignupSubmit={handleSignupSubmit}
            handleSigninClick={handleSigninClick}
            handleSignupSuccessClick={handleSignupSuccessClick}
          />
          <SigninModal
            closeModal={closeModal}
            activeModal={activeModal}
            handleSignupClick={handleSignupClick}
            handleSigninSubmit={handleSigninSubmit}
          />
          <RegistrationSuccessModal
            handleSigninClick={handleSigninClick}
            closeModal={closeModal}
            activeModal={activeModal}
          />
        </UserArticleContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
