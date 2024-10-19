import React, { useState } from 'react';

const QuizGame = ({gameResult}) => {
  const [questionIndex, setQuestionIndex] = useState('initial');
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  const quizData = {
    initial: {
      question: "Security Officer: 'You two look shaken. What is going on?'",
      choices: [
        "We have uncovered something horrifying! The stranger is immortal, and we can time travel!",
        "You need to listen! The stranger is hunting us, and he is not human!",
        "We found journals at a burnt house that revealed dark truths about him. We are in grave danger!"
      ],
      next: ['time_travel', 'hunting', 'journals'],
    },
    time_travel: {
      question: "Security Officer: 'Time travel? Immortal? Sounds like something out of a horror movie. Are you serious?'",
      choices: [
        "We know he preys on people—he is a predator!",
        "Look, we cannot waste time; this is real!",
        "We have proof! You have to believe us!"
      ],
      correct: [0, 2],
      next: 'final',
      onWrongChoice: "The officer doesn't believe you. Game Over."
    },
    hunting: {
      question: "Security Officer: 'Hunting you? This sounds absurd.'",
      choices: [
        "He is not just hunting; he is stalking us down, and he will not stop!",
        "You have to trust us; he is dangerous!",
        "If you do not help us, more people will disappear!"
      ],
      correct: [0, 2],
      next: 'final',
      onWrongChoice: "The officer doesn't believe you. Game Over."
    },
    journals: {
      question: "Security Officer: 'Journals? You need to explain this further.'",
      choices: [
        "The journals detail his history and dark powers!",
        "They warn of the danger he poses to anyone who crosses his path!",
        "You have to trust us; we barely escaped!"
      ],
      correct: [0, 1],
      next: 'final',
      onWrongChoice: "The officer doesn't believe you. Game Over."
    },
    final: {
      question: "Security Officer: 'What do you want us to do?'",
      choices: [
        "We need you to investigate him immediately!",
        "We want you to help us hide!",
        "We want you to believe us and take action!"
      ],
      correct: [0, 2],
      onComplete: "You've convinced the officier! Good Work",
      onWrongChoice: "That weakens your case. Game Over."
    }
  };

  const handleChoice = (choiceIndex) => {
    const currentQuestion = quizData[questionIndex];

    if (currentQuestion.correct && !currentQuestion.correct.includes(choiceIndex)) {
      setMessage(currentQuestion.onWrongChoice || "Wrong choice! Game Over.");
      setGameOver(true);
      gameResult(-100, false);
    } else {
      const nextQuestion = currentQuestion.next instanceof Array
        ? currentQuestion.next[choiceIndex]
        : currentQuestion.next;

      if (nextQuestion === 'final' || quizData[nextQuestion]) {
        setMessage("Good choice! Proceeding...");
        setQuestionIndex(nextQuestion);
      } else {
        setMessage(currentQuestion.onComplete || "You have convinced the officier! Good Work");
        setGameOver(true);
        gameResult(200, true);
      }
    }
  };

  const currentQuestion = quizData[questionIndex];

  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black">
        <h1 className="text-3xl font-bold text-red-600 mb-4">{message}</h1>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Restart
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4 text-white">{currentQuestion.question}</h1>
        <div className="space-y-3">
          {currentQuestion.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoice(index)}
              className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            >
              {choice}
            </button>
          ))}
        </div>
        <p className="text-lg text-white mt-4">{message}</p>
      </div>
    </div>
  );
};

export default QuizGame;
