import React, { useEffect, useState} from "react";
import axios from "axios";
import "../Sass/HomeComponent.scss";

const HomeComponent = () => {

  const [buttonMessage, setButtonMessage] = useState("");
  const [isWindowVisible, setIsWindowVisible] = useState(false);


  const handleButtonClick = () => {
    axios.get("http://127.0.0.1:5000/api/button-message")
      .then(response => {
        setIsWindowVisible(true);
      })
      .catch(error => {
        console.error("there was an error fetching the button message.", error)
      })
  }

  const closeSlidingWindow = () => {
    setIsWindowVisible(false);
  }


  return (
    <div className="home-wrapper">
      <div className="home">
        <h1 className="home__title">ExamWell</h1>
        <p className="home__statement"><i>"Efficient education achieved through the synergy of AI and human effort."</i></p>
     </div>
     <button className="create__problem" onClick={handleButtonClick}>
      <span className="plus__sign">+</span> 
     </button>
     {isWindowVisible && (
        <div className="sliding-window">
          <div className="sliding-window__content">
            <button className="sliding-window__close" onClick={closeSlidingWindow}>Close</button>
            <div className="config_page">
              <h1 className="home__title">ExamWell</h1>
              <form action="/submit" method="post" className="form-container">
                <div className="text-input-container">
                  <label htmlFor="subject">Subject:</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="what_subject"
                    placeholder="Enter the subject"
                  />
                </div>
                <div className="checkbox-container">
                  <label htmlFor="hobby1">
                    <input type="checkbox" id="difficulty1" name="difficulty" value="easy" />
                    Easy
                  </label>
                  <label htmlFor="hobby2">
                    <input type="checkbox" id="difficulty2" name="difficulty" value="medium" />
                    Medium
                  </label>
                  <label htmlFor="hobby3">
                    <input type="checkbox" id="difficulty3" name="difficulty" value="hard" />
                    Hard
                  </label>
                </div>
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default HomeComponent;