"use client";
import React, { useState, useEffect } from "react";
import { BackgroundScene } from "@/components/shared/BackgroundScene";
import { useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";
import useUserStore from "@/utils/store/userStore";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";
import AOS from "aos";
import { IoIosArrowDown } from "react-icons/io";

const InstructionsModal = ({ onClose }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  const [openQuestion, setOpenQuestion] = useState(null);

  const handleToggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

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
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-opacity-75 bg-black z-50'>
      <div className='bg-black border border-green-500 text-white p-8 rounded-md w-[70vw] max-h-[70vh] overflow-auto relative'>
        <div className='absolute top-4 right-4'>
          <MdClose
            className='cursor-pointer hover:text-green-500 transition-colors duration-300'
            size={30}
            onClick={onClose}
          />
        </div>
        <h2 className='text-3xl font-bold mb-4'>
          DnDAI <span className='text-green-500'>Instructions</span>
        </h2>

        {instructions.map((item, index) => (
          <div key={index} className='mb-6'>
            <div
              className='flex justify-between items-center cursor-pointer'
              onClick={() => handleToggleQuestion(index)}
            >
              <h3 className='text-xl mb-2 ml-2'>{item.heading}</h3>
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
                <div data-aos='fade-down' data-aos-delay='200' className='p-4'>
                  <p>{item.content}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const [showInstructions, setShowInstructions] = useState(false);
  const user = useUserStore((state) => state.user);
  const cookies = new Cookies();

  useEffect(() => {
    if (user) cookies.set("uid", user._id, { path: "/" });
  }, [user]);
  const startGame = () => {
    if (!user) {
      toast.error("Please login to play the game");
      return;
    }

    router.push("/input");
  };

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className='relative h-screen bg-black z-[1]'>
      <BackgroundScene setLoaded={setLoaded} />
      {loaded && (
        <div className='relative top-0 left-0 w-[100vw] h-full flex justify-center items-center'>
          <div className='w-[100vw] p-4 sm:p-8 mx-auto flex flex-col justify-center items-center'>
            <h1 className='text-xl neon-text sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-center text-white relative z-[4]'>
              <span className='text-white'>
                Welcome to <span className='text-green-500'>DnDAI</span>{" "}
                Adventures!
              </span>
            </h1>
            <div className='flex flex-col w-[80vw] sm:w-[20vw] z-[4]'>
              <button
                onClick={startGame}
                className='bg-green-500 text-white px-4 py-2 rounded-md mb-2 sm:mb-2 hover:bg-green-600 focus:outline-none transition-colors duration-300'
              >
                Play Game
              </button>
              <button
                onClick={toggleInstructions}
                className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none transition-colors duration-300'
              >
                Show Instructions
              </button>
            </div>
            {showInstructions && (
              <InstructionsModal onClose={toggleInstructions} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
