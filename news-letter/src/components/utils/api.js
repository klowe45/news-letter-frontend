import { newsApiBaseUrl } from "./newsApi";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error ${res.status}`);
  }
}

function getUserArticles(token) {
  return fetch(`${newsApiBaseUrl}/articles`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function deleteArticles(id, token) {
  return fetch(`${newsApiBaseUrl}/articles/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function saveArticles({ article, savedArticles }) {
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
export { getUserArticles, deleteArticles, saveArticles, getUser };
