import React, { useEffect, useState} from "react";
import axios from "axios";
import "../Sass/HomeComponent.scss";

const HomeComponent = () => {

  const [selectedDifficulty, setSelectedDifficulty] = useState("");
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

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Create a FormData object from the form element
    const formData = new FormData(event.target);

    // Convert FormData to a plain object
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Send the form data to the backend
    axios.post("http://127.0.0.1:5000/api/submit", data)
      .then(response => {
        console.log("Form submitted successfully:", response.data);
        // You can handle the response here
      })
      .catch(error => {
        console.error("There was an error submitting the form:", error);
      });
  };

  const handleCheckboxChange = (event) => {
    setSelectedDifficulty(event.target.value);
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

     {/* Sliding window for input*/}
      <div className={`sliding-window ${isWindowVisible ? 'visible' : ''}`}>
        <div className="sliding-window__content">
          <button className="sliding-window__close" onClick={closeSlidingWindow}>Close</button>
          <div className="config_page">
            <h1 className="home__title">ExamWell</h1>
            <form onSubmit={handleSubmit} action="/submit" method="post" className="form-container">
              <div className="text-input-container">
                <label htmlFor="subject">Subject/Topic:</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="what_subject"
                  placeholder="Enter the subject"
                  required
                />
                <div></div>
                <label htmlFor="Grade Level">Grade Level:</label>
                <input
                  type="text"
                  id="grade"
                  name="grade"
                  className="what_grade"
                  placeholder="Enter grade level"
                  required
                />
              </div>
              <div className="checkbox-container">
                <label htmlFor="difficulty1">
                  <input 
                    type="checkbox" 
                    id="difficulty1" 
                    name="difficulty" 
                    value="easy" 
                    checked={selectedDifficulty === "easy"} 
                    onChange={handleCheckboxChange}/>
                  Easy
                </label>
                <label htmlFor="difficulty2">
                  <input 
                    type="checkbox" 
                    id="difficulty2" 
                    name="difficulty" 
                    value="medium" 
                    checked={selectedDifficulty === "medium"} 
                    onChange={handleCheckboxChange}/>
                  Medium
                </label>
                <label htmlFor="difficulty3">
                  <input 
                    type="checkbox" 
                    id="difficulty3" 
                    name="difficulty" 
                    value="hard" 
                    checked={selectedDifficulty === "hard"} 
                    onChange={handleCheckboxChange}/>
                  Hard
                </label>
              </div>
              <div className="additionals_container">
                <label htmlFor="additionals_content">Additional Parameters:</label>
                <div></div>
                <input 
                  type="text"
                  id="additionals"
                  name="additionals"
                  className="additionals_content"
                  placeholder="i.e. pythagorean theorem, trig functions etc..."
                />

              </div>
              <input type="submit" className="submit_button" value="Submit"/>
            </form>
          </div>
        </div>
      </div>
      
    </div>
    
  );
};

export default HomeComponent;