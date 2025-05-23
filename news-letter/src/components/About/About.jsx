import React from "react";
import authorImg from "../../assets/author.jpeg";
import "./About.css";

function About() {
  return (
    <section className="about">
      <img className="about__author-img" src={authorImg} alt="Author" />
      <div className="about__content">
        <h2 className="about__title">About the author</h2>
        <p className="about__description">
          My name is Kenneth Lowe, and I’m the creator of this website, which I
          built using the skills and knowledge I gained through my time with
          TripleTen. One of the key practices in this project was the use of
          components and the effective passing of data between them. Managing
          the state of various elements played a crucial role in building a
          functional and responsive site. The technical abilities I’ve
          developed—along with my problem-solving skills and
          resourcefulness—will be valuable assets to any future employer.
        </p>
      </div>
    </section>
  );
}

export default About;
