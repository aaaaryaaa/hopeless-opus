import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-10 text-white">
      <div className="mb-20 text-center">
        <h1 className="text-5xl font-bold mb-4">
          <span className="border-b-4 border-gray-700">Frequently Asked</span>{" "}
          <span className="text-red-900">Questions</span>
        </h1>
        {/* <p className="text-2xl text-gray-400">
          You need to come at least once in your life
        </p> */}
      </div>

      {faqData.map((faq, index) => (
        <div
          key={index}
          className="mb-6 bg-gradient-to-r from-black via-stone-800  to-gray-950 rounded-lg transition-transform transform hover:scale-105"
        >
          <div
            className="flex justify-between items-center p-5 cursor-pointer border-b border-gray-600"
            onClick={() => toggleFAQ(index)}
          >
            <div className="text-4xl font-extrabold">
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </div>
            <div
              className={`ml-4 flex-grow text-xl transition-all ${
                openIndex === index ? "text-gray-300" : ""
              } font-semibold sm:font-semibold font-normal`}
            >
              {faq.question}
            </div>
            <div className="text-xl font-bold">
              {openIndex === index ? "-" : "+"}
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index
                ? "max-h-screen opacity-100 p-4"
                : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-base sm:text-lg font-normal">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const faqData = [
  {
    question: "How does the game work ?",
    answer:
      "The game is designed as a 1-2 player interactive experience where each player's choices directly influence how the story unfolds. Both players will share the same screen, collaborating and competing to shape the narrative.",
  },
  {
    question: "How do choices affect the game?",
    answer: "Choices can lead to different outcomes, alter character relationships, and influence the overall narrative direction, creating a unique experience for each player.",
  },
  {
    question:
      "Is the game purely focused on making decisions?",
    answer:
      "The game includes several mini-games that allow players to score points and perform specific tasks. These mini-games help players pass obstacles and progress further in the game.",
  },
  {
    question:
      "What if I get stuck on a puzzle/minigame or decision?",
    answer: "Depending on the game or choices you get a few tries and on some games there's just one chance. So play wisely! ",
  },
  {
    question:
      "What platforms can I play this game on?",
    answer: "The game is compatible on PC. We suggest players to screencast while playing to get a better experience.",
  },
  {
    question:
      "How will the Winner be decided or what are the constraints?",
    answer: "The game features several constraints that will ultimately determine how players are judged, including time, money, health, and points. Players have a total of three lives, and their choices and performance in mini-games contributes to their overall score. Additionally, managing health and money effectively will be crucial to navigating the challenges presented throughout the game",
  },
  {
    question:
      "The game froze. What should I do",
    answer: "If the game freezes, refreshing the page or restarting the app usually helps. If issues persist, check your internet connection or clear your browser cache.",
  },
  {
    question:
      " How do I track my progress in the story?",
    answer: "Progress is tracked through a menu, where players can see completed tasks, current challenges, and any unlocked mini-games or story elements.",
  }
];

export default FAQ;
