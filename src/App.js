import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import './App.css';

// Demo questions, more to be added later
const questions = [
  {
    question: "What does the 'z-index' property do in CSS?",
    options: [
      "Specifies the stack order of elements",
      "Defines the zoom level",
      "Sets the z-coordinate of an element",
      "None of the above",
    ],
    answer: "Specifies the stack order of elements",
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-size", "text-style", "font-weight", "text-transform"],
    answer: "font-size",
  },
  {
    question: "What is the default position value of an HTML element?",
    options: ["static", "relative", "absolute", "fixed"],
    answer: "static",
  },
];

function App() {
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (index, selectedOption) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = selectedOption;
    setUserAnswers(newAnswers);
  };

  const calculateResults = () => {
    setShowResults(true);
  };

  const correctAnswersCount = userAnswers.reduce((count, answer, index) => {
    return answer === questions[index].answer ? count + 1 : count;
  }, 0);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen px-5 py-10 bg-gray-100">
      <h1 className="mb-10 text-3xl font-bold text-center">CSS Upskilling Q&A</h1>
      {!showResults ? (
        <div className="space-y-8">
          {questions.map((q, index) => (
            <div key={index} className="p-5 bg-white rounded shadow">
              <h2 className="mb-4 text-lg font-semibold">
                {index + 1}. {q.question}
              </h2>
              <div className="space-y-2">
                {q.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(index, option)}
                    className={`w-full text-left p-3 border rounded hover:bg-gray-200 transition ${
                      userAnswers[index] === option ? "bg-blue-100" : ""
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={calculateResults}
            className="w-full p-3 font-bold text-white transition bg-blue-500 rounded hover:bg-blue-600"
          >
            Submit Answers
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {questions.map((q, index) => (
            <div key={index} className="p-5 bg-white rounded shadow">
              <h2 className="mb-4 text-lg font-semibold">
                {index + 1}. {q.question}
              </h2>
              <div className="space-y-2">
                {q.options.map((option) => (
                  <div
                    key={option}
                    className={`p-3 border rounded ${
                      option === q.answer
                        ? "bg-green-100 border-green-500"
                        : userAnswers[index] === option && option !== q.answer
                        ? "bg-red-100 border-red-500"
                        : ""
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="text-center">
            <h2 className="text-2xl font-bold">Your Score: {correctAnswersCount}/{questions.length}</h2>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default App;
