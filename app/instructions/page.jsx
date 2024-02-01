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
              <div key={index} className="mb-6">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => handleToggleQuestion(index)}
                >
                  <h3 className="text-xl mb-2 ml-2">{item.heading}</h3>
                  <IoIosArrowDown
                    className={`text-green-500 transform transition-transform ${
                      openQuestion === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <div
                  className={`overflow-hidden max-h-96 transition-all ease-in-out duration-300  ${
                    openQuestion === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  {openQuestion === index && (
                    <div
                      data-aos="fade-down"
                      data-aos-delay="200"
                      className="p-4"
                    >
                      <p>{item.content}</p>
                    </div>
                  )}
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
