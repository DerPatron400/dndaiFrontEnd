"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import { IoIosArrowDown } from "react-icons/io";
import "aos/dist/aos.css";

function Faq() {
  useEffect(() => {
    AOS.init();
  }, []);

  const [openQuestion, setOpenQuestion] = useState(null);

  const handleToggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const questions = [
    {
      question: "Why is the loading time so long?",
      answer:
        "To create the game and send user input, we use the GPT-4 API. The time it takes for these API calls to complete can range from 7 seconds to as long as 90 seconds.",
    },
    {
      question: "Why isn't my image being generated?",
      answer:
        "Because we're using the DALL-E API to create images, the safety rules are quite stringent. If the text in the game, especially after the 'VISUAL' line, contains explicit language or violent content, it will be flagged by the safety system and won't be used to generate images.",
    },
    {
      question: "Why do you have a Patreon?",
      answer:
        "Each time you use the GPT 4 API and DALLE API, it comes with a cost. We hope to make this more budget-friendly in the future. To ensure the continued operation of this game and website, we rely on donations.",
    },
    {
      question: "Who are you and why did you create this?",
      answer:
        "I'm Alex, a 30-year-old gamer and a big fan of Dungeons & Dragons (D&D) from Austria. In February 2023, I had an idea for a project. With the help of a friend, we developed a D&D Solo Adventure that allows you to play D&D with an AI acting as the Game Master. Our friends loved it, so we decided to make it available online for everyone to enjoy. We created the entire project from our own place, without any external connections or financial support secured at this point.",
    },
  ];

  return (
    <div className='w-screen h-[80vh] flex justify-center items-center bg-black'>
      <div className='md:w-[70vw] w-[90vw] mx-auto mt-10 mb-10 p-8 h-auto bg-transparent text-white rounded-md shadow-lg font-sans'>
        <div data-aos='fade-up'>
          <h2 className='text-3xl font-semibold mb-6 flex justify-center items-center text-center'>
            <span className='text-white'>
              Frequently Asked <span className='text-green-500'>Questions</span>
            </span>
          </h2>

          {questions.map((item, index) => (
            <div key={index}>
              <h3>
                <button
                  className='flex items-center justify-between w-full px-6 py-5 text-base font-semibold text-left text-white sm:p-6'
                  onClick={() => handleToggleQuestion(index)}
                >
                  <span className='w-[90%]'>{item.question}</span>
                  <span className='ml-4'>
                    <IoIosArrowDown
                      className={`text-green-500 transform duration-700 transition-transform ${
                        openQuestion === index ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>
              </h3>
              <div
                className={`overflow-hidden transition-max-height duration-700 ${
                  openQuestion === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className='px-6 pb-6'>
                  <p className='text-base text-white opacity-90'>
                    <React.Fragment>{item.answer}</React.Fragment>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Faq;
