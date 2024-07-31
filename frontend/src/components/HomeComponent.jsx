import React, { useEffect, useState} from "react";
import axios from "axios";
import "../Sass/HomeComponent.scss";

const HomeComponent = () => {

  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");

  const [isParametersWindowVisible, setIsParametersWindowVisible] = useState(false);
  const [isFinalWindowVisible, setIsFinalWindowVisible] = useState(false);

  const [submittedData, setSubmittedData] = useState(null);
  const [isQuestionPopupVisible, setIsQuestionPopupVisible] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [voteCount, setVoteCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


  const LoadingScreen = () => (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p className="loading_text">Generating questions...</p>
    </div>
  );

  const handleButtonClick = () => {
    axios.get("http://127.0.0.1:5000/api/button-message")
      .then(response => {
        setIsParametersWindowVisible(true);
      })
      .catch(error => {
        console.error("there was an error fetching the button message.", error)
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission

    setIsLoading(true); // Set loading state to true

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
        setSubmittedData(response.data.problems);
        setIsFinalWindowVisible(true);
        setIsLoading(false); // Set loading state to false
        event.target.reset();
        setSelectedDifficulty("");
        setSelectedFormat("");
        // You can handle the response here
      })
      .catch(error => {
        console.error("There was an error submitting the form:", error);
        setIsLoading(false); // Set loading state to false
      });
  };

  const handleDifficultyCheckboxChange = (event) => {
    setSelectedDifficulty(event.target.value);
  }

  const handleFormatCheckboxChange = (event) => {
    setSelectedFormat(event.target.value);
  }


  const closeParametersSlidingWindow = () => {
    setIsParametersWindowVisible(false);
  }

  const closeFinalSlidingWindow = () => {
    setIsFinalWindowVisible(false);
  }

  const openQuestionPopup = (question) => {
    setSelectedQuestion(question);
    setIsQuestionPopupVisible(true);
  }

  const closeQuestionPopup = () => {
    setIsQuestionPopupVisible(false);
  }

  const handleUpvote = () => {
    setVoteCount(voteCount + 1);
  }

  const handleDownvote = () => {
    setVoteCount(voteCount - 1);
  }

  return (

    
    <div className="home-wrapper">
      {isLoading && <LoadingScreen />}
      {/* Home page*/}
      <div className="home">
        <h1 className="home__title">ExamWell</h1>
        <p className="home__statement"><i>"Efficient education achieved through the synergy of AI and human effort."</i></p>
     </div>
     <button className="create__problem" onClick={handleButtonClick}>
      <span className="plus__sign">+</span> 
     </button>

      {/* Sliding window for input*/}

      <div className={`sliding-window ${isParametersWindowVisible ? 'visible' : ''}`}>
        <div className="sliding-window__content">
          <button className="sliding-window__close" onClick={closeParametersSlidingWindow}>Close</button>
          <div className="config_page">
            <h1 className="home__title">ExamWell</h1>
            <form onSubmit={handleSubmit} action="/submit" method="post" className="form-container">
              <div className="text-input-container">
                <label htmlFor="subject">Subject:</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="what_subject"
                  placeholder="Enter the subject"
                  required
                />
                <div></div>
                <label htmlFor="subject">Topic:</label>
                <input
                  type="text"
                  id="topic"
                  name="topic"
                  className="what_topic"
                  placeholder="Enter the topic"
                  required
                />
              </div>
              <h3>Difficulty:</h3>
              <div className="checkbox-container">
                <label htmlFor="difficulty1">
                  <input 
                    type="checkbox" 
                    id="difficulty1" 
                    name="difficulty" 
                    value="easy" 
                    checked={selectedDifficulty === "easy"} 
                    onChange={handleDifficultyCheckboxChange}/>
                  Easy
                </label>
                <label htmlFor="difficulty2">
                  <input 
                    type="checkbox" 
                    id="difficulty2" 
                    name="difficulty" 
                    value="medium" 
                    checked={selectedDifficulty === "medium"} 
                    onChange={handleDifficultyCheckboxChange}/>
                  Medium
                </label>
                <label htmlFor="difficulty3">
                  <input 
                    type="checkbox" 
                    id="difficulty3" 
                    name="difficulty" 
                    value="hard" 
                    checked={selectedDifficulty === "hard"} 
                    onChange={handleDifficultyCheckboxChange}/>
                  Hard
                </label>
              </div>
              <h3>Format of Question:</h3>

              <div className="checkbox-container">
                <label htmlFor="format1">
                  <input 
                    type="checkbox" 
                    id="format1" 
                    name="format" 
                    value="multiple-choice" 
                    checked={selectedFormat === "multiple-choice"} 
                    onChange={handleFormatCheckboxChange}/>
                  multiple-choice
                </label>
                <label htmlFor="format2">
                  <input 
                    type="checkbox" 
                    id="format2" 
                    name="format" 
                    value="short-answer" 
                    checked={selectedFormat === "short-answer"} 
                    onChange={handleFormatCheckboxChange}/>
                  short-answer
                </label>
                <label htmlFor="format3">
                  <input 
                    type="checkbox" 
                    id="format3" 
                    name="format" 
                    value="free-response" 
                    checked={selectedFormat === "free-response"} 
                    onChange={handleFormatCheckboxChange}/>
                  free-response
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
    
      {/* Sliding window for final page */}
      <div className={`final-sliding-window ${isFinalWindowVisible ? 'visible' : ''}`}>
        <div className="final-sliding-window__content">
          <button className="sliding-window__close" onClick={closeFinalSlidingWindow}>Close</button>
          <h1 className="home__title">ExamWell</h1>
          <div className="scroll-pane">
            <h1 className="ai_gen">Questions Tailored Just For You</h1>
            {submittedData && (
              <div className="question-list">
                {submittedData.map((question, index) => (
                  <div key={index} className="question-item" onClick={() => openQuestionPopup(question)}>
                    <h3>{question.problem_summary}</h3>
                    {question.verification && <span className="verified-sticker">Verified</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Question detail popup */}
      <div className={`question-popup ${isQuestionPopupVisible ? 'visible' : ''}`}>
        <div className="question-popup__content">
        <button className="popup__close" onClick={closeQuestionPopup}>Close</button>
          {selectedQuestion && (
              <div className="question-detail">
                <h2>Generated Problem</h2>
                <p>{selectedQuestion.problem}</p>
                <hr className="black-line"></hr>
                <h2>Answer</h2>
                <p>{selectedQuestion.answer}</p>
                <hr className="black-line"></hr>
                <div className="vote-buttons">
                  <button className="vote-button upvote" onClick={handleUpvote}>Upvote</button>
                  <p className="vote_count">{voteCount}</p>
                  <button className="vote-button downvote" onClick={handleDownvote}>Downvote</button>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
    
  );
};

export default HomeComponent;