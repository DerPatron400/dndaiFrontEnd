import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { sendUserInput } from "@/api/game";
import useUserStore from "@/utils/store/userStore";
import useGameStore from "@/utils/store/introTextStore";

export default function Input({ query, setQuery, setMessages }) {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const conversationIndex = searchParams.get("conversationIndex");
  const { user, setCredits, setGreenCredits } = useUserStore((state) => state);
  const { setIntroText, setImage, setCharacter } = useGameStore(
    (state) => state
  );
  const handleSubmit = async (e) => {
    setMessages((prev) => [
      ...prev,
      {
        text: query,
        isUser: true,
      },
    ]);

    //scroll to end of screen
    setTimeout(() => {
      const element = document.querySelector(".chat-container");
      element.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 500);

    //generate random number between 1 to 20
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    const bodyData = {
      userInput: query,
      randomNumber,
      conversationIndex,
    };

    try {
      console.log("here");
      setIsLoading(true);
      const data = await sendUserInput(bodyData, user.token);
      setIntroText(data.responseText);
      setCharacter(data.character);
      setCredits(data.credits);
      setGreenCredits(data.greenCredits);
      setQuery("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='text-white flex items-center gap-x-3 justify-center py-4 left-0 fixed bg-black w-full bottom-0'>
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        type='text'
        className='border p-2 w-[40%] bg-transparent rounded-lg'
        placeholder='What will you do'
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading || query.trim() === ""}
        className=' bg-gradient-to-t from-green-950 to-green-500 text-white px-3 z-[4] p-2 rounded-md hover:to-green-700 hover:from-green-400 transition-colors duration-300 ease-in-out anim-9 disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none'
      >
        {isLoading ? "Generating..." : " Roll Dice"}
      </button>
    </div>
  );
}
