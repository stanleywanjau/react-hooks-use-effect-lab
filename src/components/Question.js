import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    let isMounted = true;

    const callbackFunction = () => {
      if (isMounted) {
        setTimeRemaining((prevTime) => Math.max(0, prevTime - 1));
        if (timeRemaining === 1) {
          // Reset timeRemaining to 10 seconds
          setTimeRemaining(10);

          // Trigger onAnswered callback with a value of false
          onAnswered(false);
        }
      }
    };

    const timerId = setTimeout(callbackFunction, 1000);

    return () => {
      isMounted = false;
      clearTimeout(timerId);
    };
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
