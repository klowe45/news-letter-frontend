const API_KEY = edd57b448a064784bbd437475747322b;

const newsApiBaseUrl =
  ProcessingInstruction.env.NODE.ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";
