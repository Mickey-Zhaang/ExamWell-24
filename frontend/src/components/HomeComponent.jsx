import React, { useEffect, useState} from "react";
import axios from "axios";
import "../Sass/HomeComponent.scss";

const HomeComponent = () => {

  const [message, setMessage] = useState("");
  const [buttonMessage, setButtonMessage] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/data")
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const handleButtonClick = () => {
    axios.get("http://127.0.0.1:5000/api/button-message")
      .then(response => {
        setButtonMessage(response.data.message);
      })
      .catch(error => {
        console.error("there was an error fetching the button message.", error)
      })
  }


  return (
    <div className="home-wrapper">
      <div className="home">
        <h1 className="home__title">ExamWell</h1>
        <p className="home__statement"><i>"Whether you're a teacher that is looking to facilitate the test creation process or a student that is looking to study better, ExamWell is the go-to tool for efficient education."</i></p>
     </div>
     <button className="create__problem" onClick={handleButtonClick}>
      <span className="plus__sign">+</span> 
     </button>
     <p>{buttonMessage}</p> 
    </div>
  );
};

export default HomeComponent;