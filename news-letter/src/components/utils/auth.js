export const signUp = async (email, password, username) => {
  return new Promise((resolve, reject) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      reject({ message: "User already exists!" });
    } else {
      const token = Math.random().toString(36).substr(2);

      const newUser = {
        email,
        password,
        token,
        username,
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      resolve({ message: "User successfully registered!" });
    }
  });
};

export const signIn = async (email, password) => {
  return new Promise((resolve, reject) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    console.log("Stored users:", users);
    console.log("Trying to sign in with:", { email, password });
    const user = users.find((currentUser) => currentUser.email === email);
    if (!user) {
      reject({ message: "Invalid email or password." });
    } else if (user.password !== password) {
      reject({ message: "Invalid email or password." });
    } else {
      resolve({
        token: user.token,
        username: user.username,
        message: "Login successful!",
      });
    }
  });
};

export const checkToken = async (token) => {
  return new Promise((resolve) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((u) => u.token === token);

    if (user) {
      resolve({
        loggedIn: true,
        data: {
          email: user.email,
          username: user.username,
          _id: "fake-id", // Mock
        },
      });
    } else {
      resolve({ loggedIn: false });
    }
  });
};
