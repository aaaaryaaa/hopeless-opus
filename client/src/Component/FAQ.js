import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={styles.container}>
      <div style={styles.heading}>
        <h1 style={styles.title}>
          <span style={styles.under}>Frequently Asked</span>{" "}
          <span style={styles.highlight}>Questions</span>
        </h1>
        <p style={styles.subtitle}>
          You need to come at least once in your life
        </p>
      </div>
      {faqData.map((faq, index) => (
        <div key={index} style={styles.faqItem}>
          <div
            style={styles.questionContainer}
            onClick={() => toggleFAQ(index)}
          >
            <div style={styles.number}>
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </div>
            <div style={styles.question}>{faq.question}</div>
            <div style={styles.icon}>{openIndex === index ? "-" : "+"}</div>
          </div>

          <div
            style={{
              ...styles.answer,
              maxHeight: openIndex === index ? "1000px" : "0px",
              opacity: openIndex === index ? 1 : 0,
              padding: openIndex === index ? "12px" : "0px 12px",
            }}
          >
            {faq.answer}
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

const styles = {
  heading: {
    marginBottom: "100px",
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "50px",
    fontFamily: "Arial, sans-serif",
    color: "#fff",
  },
  title: {
    fontSize: "60px",
    textAlign: "center",
    marginBottom: "10px",
    color: "#FFFFFF",
    fontFamily: "'Manrope' sans-serif",
  },
  under: {
    borderBottom: "3px solid #36454F",
  },
  highlight: {
    color: "#520000",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: "40px",
    color: "#737373",
    fontSize: "30px",
  },
  faqItem: {
    marginBottom: "10px",
    background: "#1a1a1a",
    borderRadius: "8px",
    overflow: "hidden",
    background: "linear-gradient(90deg, #000101 30%, #011517 70%)",
    transition: "all 0.3s ease",
  },
  questionContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    cursor: "pointer",
    borderBottom: "1px solid #333",
  },
  number: {
    fontWeight: "extrabold",
    fontFamily: "'Manrope', sans-serif",
    fontSize: "46.66px",
  },
  question: {
    flexGrow: 1,
    marginLeft: "10px",
    fontSize: "22.9px",
    fontFamily: " 'Urbanist' , sans-serif",
  },
  icon: {
    fontWeight: "bold",
    fontSize: "18px",
  },
  answer: {
    maxHeight: "0px", // Initially closed
    overflow: "hidden", // Prevent content overflow
    transition: "all 0.3s ease", // Smooth transition for height and opacity
    opacity: 0,
    padding: "0px 12px", // Initially no padding
    background: "#333",
    fontFamily: "'Manrope', sans-serif",
    fontSize: "18.03px",
  },
};

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
  @import
  url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
</style>;

export default FAQ;
