import React from "react";
import Row from "@/components/ui/Shared/DiscoverRow";
import Star from "@/components/ui/Icons/Star";
import World from "@/components/ui/Icons/World";
import MyCharacters from "@/components/character/myCharacter/characters/index";

export default function index({ characters, popular, mostLiked }) {
  return (
    <div className='pt-[128px] w-full h-full relative text-white  '>
      <span className='headline-3 !z-[20] px-5 md:px-12 hidden md:block'>
        Discover
      </span>
      <div className='flex flex-col h-full gap-16 w-full mt-5 md:mt-9'>
        <Row
          text={"Commuity favorties"}
          campaigns={mostLiked}
          icon={<Star isfilled={"true"} className='h-5 w-5 fill-gray2' />}
        />
        <Row
          text={"Public games"}
          campaigns={popular}
          icon={<World className='h-5 w-5 fill-gray2' />}
          showMore={true}
        />

        <MyCharacters
          characters={characters}
          className={" w-full px-5 md:px-12 pt-0 min-h-full "}
        />
      </div>
    </div>
  );
}
