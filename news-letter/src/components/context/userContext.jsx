import { createContext } from "react";

const UserContext = createContext({
  currentUser: [],
  isloggedIn: false,
});

export default UserContext;
