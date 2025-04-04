import React from "react";
import authorImg from "../../assets/author.jpeg";
import "./About.css";

function About() {
  return (
    <main className="about">
      <img className="about__author-img" src={authorImg} alt="Author" />
      <div className="about__content">
        <h2 className="about__title">About the author</h2>
        <p className="about__description">
          This block shows some random infor about the author you had picked for
          your news litter
        </p>
        <p>Just another p tag for the formatting of this site.</p>
      </div>
    </main>
  );
}

export default About;
