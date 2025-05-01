const token_key = "jwt";

export const getToken = () => localStorage.getItem(token_key);

export const removeToken = () => localStorage.removeItem(token_key);

export const setToken = (token) => localStorage.setItem(token_key, token);
