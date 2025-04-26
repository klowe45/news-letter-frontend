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

function saveArticles(
  { keyword, title, text, date, source, link, image },
  token
) {
  return fetch(`${newsApiBaseUrl}/articles/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ keyword, title, text, date, source, link, image }),
  }).then(checkResponse);
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
