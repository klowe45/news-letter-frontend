import "./App.css";
import Header from "./components/Header/header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

function App() {
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
    <div className="page__content">
      <Header />
      <Main />
      <Footer
        handleGithubClick={handleGithubClick}
        handleLinkedinClick={handleLinkedinClick}
      />
    </div>
  );
}

export default App;
