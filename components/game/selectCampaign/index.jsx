import React from "react";
import Row from "./row";
import Star from "@/components/ui/Icons/Star";
import World from "@/components/ui/Icons/World";
import MyCharacters from "@/components/character/myCharacter/characters/index";

export default function index({ characters, popular, mostLiked }) {
  return (
    <div className="pt-[128px] w-full h-full relative text-white  pb-12">
      <span className="headline-3 !z-[20] px-5 md:px-12">Discover</span>
      <div className="flex flex-col gap-16 w-full mt-9">
        <Row
          text={"Commuity favorties"}
          campaigns={mostLiked}
          icon={<Star isfilled={"true"} className="h-4 w-4 fill-gray2" />}
        />
        <Row
          text={"Public games"}
          campaigns={popular}
          icon={<World className="h-4 w-4 fill-gray2" />}
        />

        <MyCharacters
          characters={characters}
          className={" w-full px-5 md:px-12 pt-0 "}
        />
      </div>
    </div>
  );
}
