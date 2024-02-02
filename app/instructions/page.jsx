"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { IoIosArrowDown } from "react-icons/io";

const instructions = [
  {
    heading: "Introduction",
    content:
      "Embark on a solo D&D adventure with your very own AI Dungeonmaster, powered by GPT4. Start by baptizing your character, entering their name into the 'main protagonist' field. Next, from the dropdown menu, select the desired class and race.",
  },
  {
    heading: "Character Abilities",
    content:
      "Moving on to your character's abilities - Strength, Dexterity, Intelligence, Constitution, Wisdom, and Charisma - these too need to be defined. To ensure balance, the following values should be assigned once only: 15, 14, 13, 12, 10, and 8.",
  },
  {
    heading: "Starting Game",
    content:
      "Once these required fields are filled, press 'Game Start'. The AI will then conjure up your character, delineating skills, feats, HP, AC, and any pertinent spells according to your chosen race or class, and offer options to proceed.",
  },
  {
    heading: "Choosing Your Path",
    content:
      "From here, you have the freedom to choose the AI's suggestion or chart your own adventure, amplifying the immersive experience. Submit your chosen course of action in the user input field and press on the D20 to roll the dice. The resulting dice outcome dictates the progression of your story.",
  },
  {
    heading: "Visualizing Your Path",
    content:
      "While immersed in gameplay, the game interface's bottom left provides an art style dropdown menu. Adjacent to it is the 'Generate Images' button, useful for creating visuals based on your current location in the game. Pay attention to the AI's game response prefixed by 'VISUAL'; this instruction informs the image generation process when pressed.",
  },
  {
    heading: "Auditory Experience",
    content:
      "Textual gameplay can also morph into an auditory experience, thanks to the audio options available to the right of the user input. Simply choose this option if reading becomes monotonous.",
  },
];

function Instructions() {
  const [openQuestion, setOpenQuestion] = useState(null);

  const handleToggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <div className="md:w-[70vw] w-[90vw] my-auto border border-green-500 p-8 h-auto bg-transparent text-white rounded-md shadow-lg font-sans">
        <div data-aos="fade-up">
          <section>
            <h2 className="text-3xl font-bold mb-4 text-center">
              DnDAI <span className="text-green-500">Instructions</span>
            </h2>

            {instructions.map((item, index) => (
              <div key={index}>
                <h3>
                  <button
                    className="flex items-center justify-between w-full px-6 py-5 text-base font-semibold text-left text-white sm:p-6"
                    onClick={() => handleToggleQuestion(index)}
                  >
                    <span className="w-[90%]">{item.heading}</span>
                    <span className="ml-4">
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
                  <div className="px-6 pb-6">
                    <p className="text-base text-white opacity-90">
                      <React.Fragment>{item.content}</React.Fragment>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Instructions;
