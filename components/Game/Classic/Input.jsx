import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { sendUserInput } from "@/api/game";
import useUserStore from "@/utils/store/userStore";
import useGameStore from "@/utils/store/introTextStore";
import { Switch, Tooltip } from "@radix-ui/themes";

export default function Input({ query, setQuery, setMessages }) {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const conversationIndex = searchParams.get("conversationIndex");
  const [crystal, setCrystal] = useState("purple");
  const { user, setCredits, setGreenCredits } = useUserStore((state) => state);
  const { setIntroText, setImage, setCharacter, character } = useGameStore(
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
      isGreen: crystal === "green",
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
    <div className="text-white grid grid-cols-12 gap-x-3  items-center  p-4 left-0 fixed bg-black w-full bottom-0">
      <Tooltip
        content={
          crystal === "green"
            ? "Green Gem: Use standard AI, budget-friendly and ready for action."
            : "Purple Gem: Access the smartest AI gaming for an exclusive experience."
        }
      >
        <div className="flex col-span-2  items-center gap-x-2  me-auto">
          <Switch
            defaultChecked
            variant="classic"
            color="violet"
            className="bg-green-500 !cursor-pointer "
            onCheckedChange={(e) => {
              setCrystal(e ? "purple" : "green");
            }}
          />

          <span className="capitalize">{crystal} gem</span>
        </div>
      </Tooltip>
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        type="text"
        maxLength={420}
        className="border p-2 w-full col-span-6  bg-transparent rounded-lg"
        placeholder="What will you do"
      />
      <p className="text-xs text-white   mt-1 col-span-1 opacity-60">
        {query.length}/420
      </p>
      <button
        onClick={handleSubmit}
        disabled={isLoading || query.trim() === ""}
        className=" bg-gradient-to-t me-auto  col col-span-3 from-green-950 to-green-500 text-white px-3 z-[4] p-2 rounded-md hover:to-green-700 hover:from-green-400 transition-colors duration-300 ease-in-out anim-9 disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none"
      >
        {isLoading ? "Generating..." : " Roll Dice"}
      </button>
    </div>
  );
}
