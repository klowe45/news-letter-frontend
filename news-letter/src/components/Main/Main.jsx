import { useContext } from "react";
import UserContext from "../context/usercontext";
import Preloader from "../Preloader/Preloader";
import "./Main.css";

function Main() {
  return (
    <main>
      <Preloader />
    </main>
  );
}

export default Main;
