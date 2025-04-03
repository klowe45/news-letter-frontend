import "./App.css";
import Header from "./components/Header/header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import { act, useState } from "react";
import SignupModal from "./components/SignupModal/SignupModal";
import SigninModal from "./components/SigninModal/SigninModal";
import RegistrationSuccessModal from "./components/RegistrationSuccessModal/RegistrationSuccessModal";
import * as auth from "./components/utils/auth";

function App() {
  /***************************************************************************
   *                                  Modal                                  *
   **************************************************************************/

  const [activeModal, setActiveModal] = useState("signup");

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

  const [isLiggedIn, setIsLoggedIn] = useState(false);

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
   *                                  Footer                                 *
   **************************************************************************/

  const handleGithubClick = () => {
    window.open("https://github.com/klowe45");
  };

  const handleLinkedinClick = () => {
    window.open("https://www.linkedin.com/in/kenneth-lowe45");
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main />
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
    </div>
  );
}

export default App;
