import "./Main.css";
import Header from "../Header/header.jsx";
import About from "../About/About.jsx";
import NewsCardList from "../../components/NewsCardList/NewsCardList.jsx";

function Main({
  isLoading,
  isLoggedIn,
  handleSignOut,
  setActiveModal,
  isGoodNewsData,
  handleSearchSubmit,
  handleSigninClick,
  handleSaveArcticle,
  handleDeleteArticle,
  newsData,
  setCurrentKeyword,
}) {
  return (
    <>
      <Header
        handleSignOut={handleSignOut}
        isLoggedIn={isLoggedIn}
        handleSearchSubmit={handleSearchSubmit}
        handleSigninClick={handleSigninClick}
        setCurrentKeyword={setCurrentKeyword}
      />
      <main className="main">
        <NewsCardList
          isGoodNewsData={isGoodNewsData}
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          handleSaveArcticle={handleSaveArcticle}
          handleDeleteArticle={handleDeleteArticle}
          setActiveModal={setActiveModal}
          newsData={newsData}
        />
        <About />
      </main>
    </>
  );
}

export default Main;
