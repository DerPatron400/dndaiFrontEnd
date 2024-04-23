import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CampaignCard from "@/components/campaigns/card";

export default function CampaignSection() {
  return (
    <>
      <div className='w-screen flex flex-col justify-center items-center pb-32 text-white gap-10'>
        <h1 className='headline-1 text-center w-full '>
          EXPERIENCE GAMEPLAY WITHOUT CREATIVE BOUNDARIES.
        </h1>
        <div className=' flex w-auto gap-x-5 items-center overflow-hidden'>
          {" "}
          {Array.from({ length: 5 }).map((_, index) => (
            <CampaignCard carousel />
          ))}
        </div>
      </div>
    </>
  );
}
