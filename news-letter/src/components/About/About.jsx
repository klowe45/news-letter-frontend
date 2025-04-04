import React from "react";
import authorImg from "../../assets/author.jpeg";
import "./About.css";

function About() {
  return (
    <main className="main">
      <img className="main__author-img" src={authorImg} alt="Author" />
      <div className="main__content">
        <h2 className="main__title">About the author</h2>
        <p className="main__description">
          This block shows some random infor about the author you had picked for
          your news litter
        </p>
        <p>Just another p tag for the formatting of this site.</p>
      </div>
    </main>
  );
}

export default About;
