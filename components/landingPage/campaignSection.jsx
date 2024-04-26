"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CampaignCard from "@/components/campaigns/card";
import CustomIconbutton from "../ui/custom-iconbutton";
import { cn } from "@/lib/utils";

export default function CampaignSection() {
  const containerRef = useRef(null);
  const [canScrollLeft, setScrollLeft] = useState(false);
  const [canScrollRight, setScrollRight] = useState(false);

  useEffect(() => {
    setScrollRight(
      containerRef.current?.scrollLeft < containerRef.current?.scrollWidth
    );
    setScrollLeft(containerRef.current?.scrollLeft > 0);

    containerRef.current.addEventListener("scroll", () => {
      setScrollRight(
        containerRef.current?.scrollLeft <
          containerRef.current?.scrollWidth - containerRef.current?.clientWidth
      );
      setScrollLeft(containerRef.current?.scrollLeft > 0);
    });
  }, [containerRef.current]);

  const scrollRight = () => {
    //check if scroll left on right side

    containerRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };
  const scrollLeft = () => {
    containerRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="max-w-screen flex flex-col border justify-center items-center pb-32 text-white gap-10">
        <h1 className="headline-1 text-center w-full ">
          EXPERIENCE GAMEPLAY WITHOUT CREATIVE BOUNDARIES.
        </h1>
        <div className=" flex w-screen   relative overflow-hidden ">
          <div
            className={cn(
              "absolute top-[50%] left-0 ease-animate opacity-100  translate-y-[-50%] z-10 h-full flex items-center justify-start px-10 w-[40vw] md:w-[20vw] ltr-gradient",
              !canScrollLeft && "pointer-events-none opacity-0"
            )}
          >
            <CustomIconbutton onClick={scrollLeft} variant="primary">
              <img src="/Icons/ArrowLeft.svg" alt="" className="w-5 h-5" />
            </CustomIconbutton>
          </div>
          <div
            className={cn(
              "absolute top-[50%] right-0 ease-animate opacity-100 translate-y-[-50%] z-10 h-full flex items-center justify-end px-10 w-[40vw] md:w-[20vw] rtl-gradient",
              !canScrollRight && "pointer-events-none opacity-0"
            )}
          >
            <CustomIconbutton onClick={scrollRight} variant="primary">
              <img src="/Icons/ArrowRight.svg" alt="" className="w-5 h-5" />
            </CustomIconbutton>
          </div>
          <div
            ref={containerRef}
            className="flex w-full h-full items-center gap-5 px-12   overflow-x-scroll hide-scrollbar "
          >
            {Array.from({ length: 7 }).map((_, index) => (
              <CampaignCard carousel />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
