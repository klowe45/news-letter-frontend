export const signUp = async () => {
  // localStorage.setItem( "user", { name, email, token: "fake-jwt-token" });
  // return { message: "User registered successfully!" };
  return new Promise((resolve, reject) => {
    resolve({ message: "User successfully registered!" });
  });
};

export const signIn = async () => {
  // return { token: "fake-jwt-token", message: "Login successful!" };
  return new Promise((resolve, reject) => {
    resolve({ token: "fake-jwt-token" });
  });
};

export const checkToken = async (token) => {
  // return token === "fake-jwt-token" ? { loggedIn: true } : { loggedIn: false };
  return new Promise((resolve, reject) => {
    resolve({
      data: { name: "Kenneth", email: "fake@example,com", _id: "fake-id" },
    });
  });
};
