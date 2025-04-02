import "./App.css";
import Header from "./components/Header/header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import { act, useState } from "react";
import SignupModal from "./components/SignupModal/SignupModal";
import SigninModal from "./components/SigninModal/SigninModal";
import RegistrationSuccessModal from "./components/RegistrationSuccessModal";

function App() {
  /***************************************************************************
   *                                  Modal                                  *
   **************************************************************************/

  const [activeModal, setActiveModal] = useState("regSuccess");

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
      <RegistrationSuccessModal
        closeModal={closeModal}
        activeModal={activeModal}
      />
    </div>
  );
}

export default App;
