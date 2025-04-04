import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header/header";
import Main from "./components/About/About";
import Footer from "./components/Footer/Footer";
import { act, useState } from "react";
import SignupModal from "./components/SignupModal/SignupModal";
import SigninModal from "./components/SigninModal/SigninModal";
import RegistrationSuccessModal from "./components/RegistrationSuccessModal/RegistrationSuccessModal";
import * as auth from "./components/utils/auth";
import UserContext from "../src/components/context/usercontext";
import About from "./components/About/About";

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

  const handleRegistrationSuccessClick = () => {
    setActiveModal("regSuccess");
  };

  /***************************************************************************
   *                                  USER                                   *
   **************************************************************************/

  const [user, setUser] = useState({});
  const [currentUser, setCurrentUser] = useState({
    username: "Kenneth",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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
   *                                  Signin                                 *
   **************************************************************************/

  const handleSigninSubmit = ({ email, password }) => {
    auth
      .signIn(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        handleCheckToken(data.token);
        closeModal();
      })
      .catch((err) => console.error("Error handling signin submit", err));
  };

  const handleTokenCheck = (token) => {
    auth
      .checkForToken(token)
      .then((data) => {
        setUser(data);
        setIsLoggedIn(true);
      })
      .catch((err) => console.error("Error during token check", err));
  };

  /***************************************************************************
   *                                  Sign out                               *
   **************************************************************************/

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  /**************************************************************************
   *                                  Token                                  *
   **************************************************************************/

  const handleCheckToken = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await auth.checkToken(token);
      if (response.data) {
        setIsLoggedIn(true);
        const { name, email, _id } = response.data;
        setCurrentUser({ name, email, _id });
      }
    } catch (err) {
      console.error("Error with token", err);
    }
  };

  /**************************************************************************
   *                                  Main                                  *
   **************************************************************************/

  const [isLoading, setIsLoading] = useState(false);

  /***************************************************************************
   *                                  Footer                                 *
   **************************************************************************/

  /**************************************************************************/

  const handleGithubClick = () => {
    window.open("https://github.com/klowe45");
  };

  const handleLinkedinClick = () => {
    window.open("https://www.linkedin.com/in/kenneth-lowe45");
  };

  return (
    <div className="page">
      <UserContext.Provider value={{ currentUser, isLoggedIn }}>
        <div className="page__content">
          <Header
            handleSignupClick={handleSignupClick}
            handleSigninClick={handleSigninClick}
            handleSignOut={handleSignOut}
          />
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
          <About />
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
        />
        <RegistrationSuccessModal
          closeModal={closeModal}
          activeModal={activeModal}
        />
      </UserContext.Provider>
    </div>
  );
}

export default App;
