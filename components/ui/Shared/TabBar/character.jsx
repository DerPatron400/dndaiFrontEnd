"use client";
import React, { useState, useEffect } from "react";

import useSoundControls from "@/utils/controlsStore";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import CustomButton from "@/components/ui/custom-button";
import { useRouter } from "next/navigation";
import _ from "lodash";
import Play from "@/components/ui/Icons/Play";
import Add from "@/components/ui/Icons/Add";
import CampaignAdd from "@/components/ui/Icons/CampaignAdd";
import AddUser from "@/components/ui/Icons/AddUser";
import { cn } from "@/lib/utils";
import useGameStore from "@/utils/gameStore";
import Search from "../../Icons/Search";
import SoundButton from "../SoundButton";
import SearchInput from "@/components/ui/search-input";

export default function character() {
  const router = useRouter();
  const { isSoundOn, set } = useSoundControls();
  const { setCurrentCampaign, currentCharacter } = useGameStore();
  const [searchMode, setSearchMode] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [query, setQuery] = useState("");
  const detectClickOutside = (e) => {
    if (showButtons || (searchMode && !e.target.closest(".search"))) {
      if (!e.target.closest(".btns-menu")) {
        setShowButtons(false);
        setSearchMode(false);
        console.log("clicked outside");
      }
    }
  };
  useEffect(() => {
    document.addEventListener("click", detectClickOutside);

    return () => {
      document.removeEventListener("click", detectClickOutside);
    };
  }, [showButtons]);

  useEffect(() => {
    // Add event listener
    document.addEventListener("click", detectClickOutside);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("click", detectClickOutside);
    };
  }, [searchMode]); // Depend on searchMode to properly handle changes in its state

  const handlePlay = () => {
    setCurrentCampaign(campaign);
    console.log(currentCharacter);
    if (!currentCharacter) {
      router.push("/game/character-selection");
    } else {
      router.push("/game/play");
    }
  };

  return (
    <div className="z-[20]  text-white fixed bottom-0 left-0 bg-blur-bottom-menu w-full flex  justify-center items-center  md:hidden ">
      <div className="flex flex-col items-center gap-4 w-full relative p-5">
        <hr
          className={cn(
            "w-9 border-[1px] rounded-sm border-gray1 text-gray1",
            !showButtons && "hidden"
          )}
        />
        <div
          className={cn(
            "border w-full flex flex-col btns-menu border-white/10 bg-white/10 rounded-[16px] gap-2 py-2 px-5",
            !showButtons && "hidden"
          )}
        >
          <div>
            <CustomButton variant={"subtle"}>
              <AddUser className="h-5 w-5 fill-white opacity-70" />
              Create Character
            </CustomButton>
          </div>
          <div>
            <CustomButton variant={"subtle"}>
              <CampaignAdd className="h-5 w-5 fill-white opacity-70" />
              Create Campaign
            </CustomButton>
          </div>
        </div>
        <div className="flex justify-between items-center w-full ">
          {searchMode ? (
            <SearchInput
              autoFocus={true}
              className={"w-full search text-white"}
              query={query}
              setQuery={setQuery}
            />
          ) : (
            <>
              <div className="flex items-center gap-5">
                <SoundButton />
                <CustomIconbutton
                  onClick={() => setShowButtons((prev) => !prev)}
                >
                  <Add className="h-5 w-5 fill-white" />
                </CustomIconbutton>

                <CustomIconbutton
                  onClick={() => {
                    console.log("search");
                    setSearchMode(true);
                  }}
                >
                  <img
                    src={"/Icons/Search.svg"}
                    alt="Search Toggle"
                    className="h-5 w-5  "
                  />
                </CustomIconbutton>
              </div>
              <CustomButton
                variant={"primary"}
                onClick={handlePlay}
                // disabled={!isValid() || loading}
                // onClick={handleCreateCampaign}
              >
                <Play className="h-5 w-5 fill-russianViolet" />
                Play Now
              </CustomButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
