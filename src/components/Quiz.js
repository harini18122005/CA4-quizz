// Quiz.js
import React, { useState } from 'react';
import { QuizData } from '../Data/QuizData'; // Importing quiz data from external file
import QuizResult from './QuizResult'; // Importing QuizResult component

function Quiz() {
    // State variables declaration using useState hook
    const [currentQuestion, setCurrentQuestion] = useState(0); // Current question index
    const [score, setScore] = useState(0); // User's score
    const [clickedOption, setClickedOption] = useState(0); // Index of the option clicked by the user
    const [showResult, setShowResult] = useState(false); // Flag to display quiz result
    const [darkMode, setDarkMode] = useState(false); // State for dark mode
    const [highlighted, setHighlighted] = useState(false); // State for highlighted question

    // Function to change the current question
    const changeQuestion = () => {
        updateScore();
        if (currentQuestion < QuizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setClickedOption(0);
        } else {
            setShowResult(true);
        }
    };

    // Function to update user's score
    const updateScore = () => {
        if (clickedOption === QuizData[currentQuestion].answer) {
            setScore(score + 1);
        }
    };

    // Function to reset quiz
    const resetAll = () => {
        setShowResult(false);
        setCurrentQuestion(0);
        setClickedOption(0);
        setScore(0);
    };

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode); // Toggle dark mode
        if (!darkMode) {
            document.body.style.backgroundColor = 'black'; // Set background color to black when dark mode is activated
        } else {
            document.body.style.backgroundColor = ''; // Reset background color when dark mode is deactivated
        }
    };

    // Function to highlight question
    const highlightQuestion = () => {
        setHighlighted(true);
    };

    // Function to remove highlight from question
    const removeHighlight = () => {
        setHighlighted(false);
    };

    // Rendering the JSX content
    return (
        <div className={`quiz-container ${darkMode ? 'dark-mode' : ''}`}>
            <div className="dark-mode-toggle">
                <button onClick={toggleDarkMode}>
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>
            <div>
                <p className="heading-txt">Quiz APP</p>
                <div className="container">
                    {showResult ? (
                        <QuizResult score={score} totalScore={QuizData.length} tryAgain={resetAll} />
                    ) : (
                        <>
                            <div className={`question ${highlighted ? 'highlighted' : ''}`}>
                                <span id="question-number">{currentQuestion + 1}. </span>
                                <span id="question-txt">{QuizData[currentQuestion].question}</span>
                            </div>
                            <div className="option-container">
                                {QuizData[currentQuestion].options.map((option, i) => {
                                    return (
                                        <button
                                            className={`option-btn ${
                                                clickedOption === i + 1 ? 'checked' : ''
                                            }`}
                                            key={i}
                                            onClick={() => setClickedOption(i + 1)}
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>
                            <input type="button" value="Next" id="next-button" onClick={changeQuestion} />
                            <button onClick={highlightQuestion}>Highlight</button>
                            <button onClick={removeHighlight}>Remove Highlight</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Quiz;
