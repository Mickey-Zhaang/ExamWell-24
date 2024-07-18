import React, { useEffect, useState} from "react";
import axios from "axios";
import "../Sass/HomeComponent.scss";

const HomeComponent = () => {

  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/data")
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);


  return (
    <div className="home-wrapper">
      <div className="home">
        <h1 className="home__title">ExamWell</h1>
        <p className="home__statement"><i>"Whether you're a teacher that is looking to facilitate the test creation process or a student that is looking to study better, ExamWell is the go-to tool for efficient education."</i></p>
      </div>
      <div>
        <input className="search_bar" type="text" placeholder="What are you looking for?"/>
        <div>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;