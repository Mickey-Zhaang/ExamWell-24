import React from "react";
import "../Sass/HomeComponent.scss";

const HomeComponent = () => {
  return (
    <div className="home-wrapper">
      <div className="home">
        <h1 className="home__title">ExamWell</h1>
        <p className="home__statement"><i>"Whether you're a teacher that is looking to facilitate the test creation process or a student that is looking to study better, ExamWell is the go-to tool for efficient education."</i></p>
      </div>
      <div>
        <input className="search_bar" type="text" placeholder="What are you looking for?"/>
      </div>
    </div>
  );
};

export default HomeComponent;