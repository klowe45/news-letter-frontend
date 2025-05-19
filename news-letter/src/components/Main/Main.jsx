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
  handleSaveArticle,
  handleDeleteArticle,
  newsData,
  setCurrentKeyword,
  savedArticles,
  isSigninModalOpen,
  handleSignupClick,
}) {
  return (
    <>
      <Header
        handleSignOut={handleSignOut}
        isLoggedIn={isLoggedIn}
        handleSearchSubmit={handleSearchSubmit}
        handleSigninClick={handleSigninClick}
        setCurrentKeyword={setCurrentKeyword}
        isSigninModalOpen={isSigninModalOpen}
        handleSignupClick={handleSignupClick}
      />
      <main className="main">
        <NewsCardList
          isGoodNewsData={isGoodNewsData}
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          handleSaveArticle={handleSaveArticle}
          handleDeleteArticle={handleDeleteArticle}
          setActiveModal={setActiveModal}
          newsData={newsData}
          savedArticles={savedArticles}
        />
        <About />
      </main>
    </>
  );
}

export default Main;
