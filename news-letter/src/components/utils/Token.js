const token_key = "jwt";

export const getToken = () => localStorage.getItem(token_key);

export const removeToken = () => localStorage.removeToken(token_key);

export const setToken = (token) => localStorage.setItem(token_key, token);
