import { newsApiBaseUrl } from "./newsApi";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error ${res.status}`);
  }
}

function getUserArticles() {
  return new Promise((resolve) =>
    resolve([
      {
        _id: "89eb9aa4101108a7960bf765",
        title:
          "Amazon Prime Video Has a New NASA Live Channel for Streaming Rocket Launches",

        url: "https://www.cnet.com/science/space/amazons-prime-video-has-a-new-nasa-live-channel-for-streaming-rocket-launches/",
        publishedAt: "2025-03-30T17:07:21.6872791Z",
        description:
          "Can't get enough of those rocket launches and glimpses of the cosmos? Well, if you have Amazon Prime Video loaded up on any of your devices, you can now get a whole lot more of that goodness on the n… [+1791 chars]",
        urlToImage:
          "https://www.cnet.com/a/img/resize/1ba9176aa11ea4f00874814721069e8adabddb77/hub/2024/11/26/9755a2ec-cec4-4496-89c5-336e4106b8a8/nasa-logo-gettyimages-1928404312.jpg?auto=webp&fit=crop&height=675&width=1200",
        source: "CNET",
        keyword: "Space",
      },
      {
        _id: "89eb9aa4101108a7960bf766",
        title:
          "Amazon Prime Video Has a New NASA Live Channel for Streaming Rocket Launches",
        url: "https://www.cnet.com/science/space/amazons-prime-video-has-a-new-nasa-live-channel-for-streaming-rocket-launches/",
        publishedAt: "2025-03-30T00:25:44Z",
        description:
          "The spacecraft was meant to go to Venus but has been stuck in orbit for more than 50 years.",
        urlToImage:
          "https://ichef.bbci.co.uk/news/1024/branded_news/b9dc/live/9c2f4230-0c82-11f0-b6c2-a58dae0af4a0.jpg",
        source: "BBC News",
        keyword: "Space",
      },
      {
        _id: "89eb9aa4101108a7960bf767",
        title:
          "I visited a Rivian and Tesla showroom in NYC. Their vibes couldn't be more different.",
        url: "https://www.businessinsider.com/tesla-rivian-showroom-stores-test-drive-nyc-compared-2025-5",
        publishedAt: "2025-03-30T17:07:21.6872791Z",
        description:
          "While Rivian's Brooklyn showroom offered an educational and relaxing experience, Tesla's showroom in Manhattan felt more like a sci-fi museum.",
        urlToImage:
          "https://i.insider.com/6818ed01a466d2b74ab508a5?width=1200&format=jpeg",
        source: "BBC News",
        keyword: "Space",
      },
    ])
  );
}

const deleteArticle = async (id) => {
  const saved = JSON.parse(localStorage.getItem("savedArticles")) || [];
  const articleToDelete = saved.find((article) => article._id === id);

  if (!articleToDelete) {
    throw new Error("Article not found for deletion");
  }

  const updated = saved.filter((article) => article._id !== id);
  localStorage.setItem("savedArticles", JSON.stringify(updated));

  return { data: articleToDelete };
};

function saveArticles({ article }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let savedArticlesList =
        JSON.parse(localStorage.getItem("savedArticles")) || [];

      if (article.isSaved) {
        const articleWithId = { ...article, _id: crypto.randomUUID() };
        savedArticlesList = [...savedArticlesList, articleWithId];
      } else {
        savedArticlesList = savedArticlesList.filter(
          (item) => item?._id !== article._id
        );
      }
      localStorage.setItem("savedArticles", JSON.stringify(savedArticlesList));
      resolve(savedArticlesList);
    }, 500);
  });
}

function getUser(token) {
  return fetch(`${newsApiBaseUrl}/users/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}
export { getUserArticles, deleteArticle, saveArticles, getUser };
