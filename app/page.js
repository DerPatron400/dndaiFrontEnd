"use client";
import React, { useState } from "react";
import { BackgroundScene } from "@/components/BackgroundScene";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [showInstructions, setShowInstructions] = useState(false);

  const startGame = () => {
    router.push("/input");
  };

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className="relative h-screen">
      <BackgroundScene />

      <div className="absolute inset-0 flex items-center justify-center bg-opacity-75 bg-black text-white">
        <div className="z-[10] p-8 max-w-xl mx-auto">
          <div className="flex flex-col">
            <button
              onClick={startGame}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
            >
              Play Game
            </button>
            <button
              onClick={toggleInstructions}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
            >
              {showInstructions ? "Hide Instructions" : "Show Instructions"}
            </button>
          </div>

          {/* Instructions Section */}
          {showInstructions && (
            <div className="text-white mt-4 space-y-4 overflow-auto h-[50vh] text-justify p-4">
              <p className="pl-4 border-l-4 border-green-500">
                Embark on a solo D&D adventure with your very own AI
                Dungeonmaster, powered by GPT4. Start by baptizing your
                character, entering their name into the "main protagonist"
                field. Next, from the dropdown menu, select the desired class
                and race.
              </p>
              <p className="pl-4 border-l-4 border-green-500">
                Moving on to your character's abilities - Strength, Dexterity,
                Intelligence, Constitution, Wisdom, and Charisma - these too
                need to be defined. To ensure balance, the following values
                should be assigned once only: 15, 14, 13, 12, 10, and 8.
              </p>
              <p className="pl-4 border-l-4 border-green-500">
                Once these required fields are filled, press "Game Start". The
                AI will then conjure up your character, delineating skills,
                feats, HP, AC, and any pertinent spells according to your chosen
                race or class, and offer options to proceed.
              </p>
              <p className="pl-4 border-l-4 border-green-500">
                From here, you have the freedom to choose the AI's suggestion or
                chart your own adventure, amplifying the immersive experience.
                Submit your chosen course of action in the user input field and
                press on the D20 to roll the dice. The resulting dice outcome
                dictates the progression of your story.
              </p>
              <p className="pl-4 border-l-4 border-green-500">
                While immersed in gameplay, the game interface's bottom left
                provides an art style dropdown menu. Adjacent to it is the
                "Generate Images" button, useful for creating visuals based on
                your current location in the game. Pay attention to the AI's
                game response prefixed by "VISUAL"; this instruction informs the
                image generation process when pressed.
              </p>
              <p className="pl-4 border-l-4 border-green-500">
                Textual gameplay can also morph into an auditory experience,
                thanks to the audio options available to the right of the user
                input. Simply choose this option if reading becomes monotonous.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
