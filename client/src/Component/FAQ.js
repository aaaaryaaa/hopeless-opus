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
        <p className="text-2xl text-gray-400">
          You need to come at least once in your life
        </p>
      </div>

      {faqData.map((faq, index) => (
        <div
          key={index}
          className="mb-6 bg-gradient-to-r from-black via-gray-900 to-blue-950 rounded-lg transition-transform transform hover:scale-105"
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
    question: "What documents do I need for my trip, and how do I obtain them?",
    answer:
      "Provide a step-by-step guide on how users can browse and book travel services on your platform...",
  },
  {
    question: "What documents do I need for my trip, and how do I obtain them?",
    answer: "Same question repeated.",
  },
  {
    question:
      "In the event that I need to modify or cancel my reservation, what are the policies in place?",
    answer:
      "Information about the policies regarding reservation modification and cancellations.",
  },
  {
    question:
      "Can you specify the types of credit/debit cards, digital wallets, or other online payment methods accepted?",
    answer: "Accepted payment methods including cards and wallets.",
  },
  {
    question:
      "What are the working hours, and what can I expect in terms of response times?",
    answer: "Details about the working hours and expected response times.",
  },
];

export default FAQ;
