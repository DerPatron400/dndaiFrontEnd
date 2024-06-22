import React, { useState } from "react";
import Row from "./row";
import Star from "@/components/ui/Icons/Star";
import World from "@/components/ui/Icons/World";
import CustomButton from "@/components/ui/custom-button";
import CampaignAdd from "@/components/ui/Icons/CampaignAdd";
import SearchInput from "@/components/ui/search-input";

export default function index({ popular, mostLiked }) {
  const [query, setQuery] = useState("");
  return (
    <div className=' w-full h-full relative text-white  pb-12'>
      <div className=' flex justify-center items-center relative flex-col mx-12 '>
        <h1 className='headline-3 text-center '>
          Forge your destiny <br />
          and choose{" "}
          <span className='text-irisPurpleLight'>your campaign!</span>
        </h1>

        <CustomButton className={"absolute top-1/2 -translate-y-1/2 right-0"}>
          <CampaignAdd className='h-4 w-4 fill-white' />
          Create Campaign
        </CustomButton>
      </div>
      <SearchInput
        query={query}
        setQuery={setQuery}
        placeholder='Search campaign'
        className={"mt-8 w-4/5 max-w-[465px] mx-auto"}
      />
      <div className='flex flex-col gap-16 w-full mt-9'>
        <Row
          text={"Commuity favorties"}
          campaigns={mostLiked}
          icon={<Star isfilled={"true"} className='h-4 w-4 fill-gray2' />}
        />
        <Row
          text={"Public games"}
          campaigns={popular}
          icon={<World className='h-4 w-4 fill-gray2' />}
        />
      </div>
    </div>
  );
}
