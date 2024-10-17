import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import Output from './Output';

const Main = ({ gameResult }) => {
  const questions = [
    {
      id: 1,
      initialCode: `
#include <stdio.h>

int main() {
    int sum = 0;
    for (int i = 1; i <= 10; i++) {
        if (i % 2 = 0) {
            sum += i;
        }
    }
    printf("Sum of even numbers from 1 to 10: %d\\n", sum);
    return 0;
  }
      `,
      correctCode: `
#include <stdio.h>

int main() {
    int sum = 0;
    for (int i = 1; i <= 10; i++) {
        if (i % 2 == 0) {
            sum += i;
        }
    }
    printf("Sum of even numbers from 1 to 10: %d\\n", sum);
    return 0;
}
      `,
      correctOutput: 'Sum of even numbers from 1 to 10: 30',
      points: 10
    },
    {
      id: 2,
      initialCode: `
#include <stdio.h>

int main() {
    int num = 5, factorial = 1;
    for (int i = 0; i <= num; i++) {
        factorial = factorial * i;
    }
    printf("Factorial of %d: %d\\n", num, factorial);
    return 0;
}
      `,
      correctCode: `
#include <stdio.h>

int main() {
    int num = 5, factorial = 1;
    for (int i = 1; i <= num; i++) {
        factorial = factorial * i;
    }
    printf("Factorial of %d: %d\\n", num, factorial);
    return 0;
}
      `,
      correctOutput: 'Factorial of 5: 120',
      points: 15
    },
    {
      id: 3,
      initialCode: `
#include <stdio.h>

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum = arr[i];
    }
    printf("Sum of array: %d\\n", sum);
    return 0;
}
      `,
      correctCode: `
#include <stdio.h>

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += arr[i];
    }
    printf("Sum of array: %d\\n", sum);
    return 0;
}
      `,
      correctOutput: 'Sum of array: 15',
      points: 20
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [code, setCode] = useState(questions[0].initialCode);
  const [output, setOutput] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isQuestionCompleted, setIsQuestionCompleted] = useState(false);

  const runDebugger = () => {
    const question = questions[currentQuestionIndex];
    
    // Remove extra spaces from both user's code and the correct code to compare.
    const cleanedUserCode = code.replace(/\s+/g, ' ').trim();
    const cleanedCorrectCode = question.correctCode.replace(/\s+/g, ' ').trim();
    
    // Check if the user's code matches the correct code
    if (cleanedUserCode === cleanedCorrectCode) {
      // Check the output (for the sake of simplicity, we'll just simulate it here)
      if (question.correctOutput) {
        setOutput(question.correctOutput);
        setScore(score + question.points);
        gameResult(score + question.points);
        setFeedback(`Correct! You earned ${question.points} points.`);
        setIsQuestionCompleted(true); // Prevent further edits or running the code again for the current question
      }
    } else {
      setFeedback('Incorrect. Please try again.');
      setOutput('');
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCode(questions[currentQuestionIndex + 1].initialCode);
      setOutput('');
      setFeedback('');
      setIsQuestionCompleted(false); // Reset for the next question
    } else {
      setFeedback('Congratulations! You completed all questions.');
    }
  };

  return (
    <>
      <div style={{ padding: '20px', paddingTop: "5px" }}>
        <h1 className='text-center bg-black ml-auto mr-auto w-80 mb-0 shadow-lg rounded-lg p-3'>C Code Debugger Game</h1>
        <h2 className=''>Score: {score}</h2>
        <CodeEditor code={code} setCode={setCode} disabled={isQuestionCompleted} />
        <button className="bg-black text-white hover:bg-white hover:text-black rounded-lg m-1 p-3" onClick={runDebugger} disabled={isQuestionCompleted}>Run Code</button>
        <button className="bg-black text-white hover:bg-white hover:text-black rounded-lg m-1 p-3" onClick={nextQuestion} disabled={!isQuestionCompleted}>Next Question</button>
        <Output output={output} />
        {feedback && <h3 className='bg-black text-white p-3 opacity-80  '>{feedback}</h3>}
      </div>
    </>
  );
};

export default Main;
