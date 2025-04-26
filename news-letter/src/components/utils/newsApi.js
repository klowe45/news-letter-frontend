export const API_KEY = "edd57b448a064784bbd437475747322b";

export const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

export const checkResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
};

export const getNews = (q, API_KEY, from, to) => {
  console.log("getNews working");
  return fetch(
    `${newsApiBaseUrl}?q=${q}&from=${from}&to=${to}&pageSize=100&apiKey=${API_KEY}`
  ).then(checkResponse);
};
