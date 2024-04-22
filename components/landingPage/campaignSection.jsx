import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CampaignCard from "./campaignCard";

export default function CampaignSection() {
  return (
    <div className="w-full flex flex-col justify-center items-center py-20 text-white gap-10">
      <h1 className="headline-1 md:text-[90px] text-[34px] text-center w-full">
        EXPERIENCE GAMEPLAY WITHOUT CREATIVE BOUNDARIES.
      </h1>
      <div className="flex justify-center items-center w-full h-full">
        <Carousel>
          <CarouselPrevious />
          <CarouselContent>
            <CarouselItem>
              <CampaignCard />
            </CarouselItem>
            <CarouselItem>
              <CampaignCard />
            </CarouselItem>
            {/* <CarouselItem>
              <CampaignCard />
            </CarouselItem>
            <CarouselItem>
              <CampaignCard />
            </CarouselItem> */}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
