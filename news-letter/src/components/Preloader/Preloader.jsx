import React, { useContext } from "react";
import "./Preloader.css";
import UserContext from "../context/usercontext";

function Preloader() {
  const { isLoading } = useContext(useContext);

  return (
    <div className="preloader">
      <div className="circle-preloader"></div>
    </div>
  );
}

export default Preloader;
