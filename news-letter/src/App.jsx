import "./App.css";
import Header from "./components/Header/header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import SignupModal from "./components/SignupModal/SignupModal";
import SigninModal from "./components/SigninModal/SigninModal";

function App() {
  /***************************************************************************
   *                                  Modal                                  *
   **************************************************************************/

  const [activeModal, SetActiveModal] = useState("signup");

  const closeModal = () => {
    SetActiveModal("");
  };

  const handleSignupClick = () => {
    SetActiveModal("signup");
  };

  const handleSigninClick = () => {
    SetActiveModal("signin");
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
      <SignupModal closeModal={closeModal} activeModal={activeModal} />
      <SigninModal closeModal={closeModal} activeModal={activeModal} />
    </div>
  );
}

export default App;
