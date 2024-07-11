"use client";
import React, { useEffect, useState, useRef } from "react";
import CampaignCard from "@/components/ui/Shared/Card/campaign";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import { cn } from "@/lib/utils";

export default function Campaign({ campaigns, isLanding = false, className }) {
  const containerRef = useRef(null);
  const [canScrollLeft, setScrollLeft] = useState(false);
  const [canScrollRight, setScrollRight] = useState(false);
  useEffect(() => {
    if (!containerRef.current) return;
    if (containerRef.current?.clientWidth !== containerRef.current?.scrollWidth)
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

    return () => {
      containerRef?.current?.removeEventListener("scroll", () => {});
    };
  }, [containerRef.current, campaigns]);

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
    <div
      className={cn(
        " flex w-screen md:w-full relative h-full  overflow-hidden z-[10]",
        isLanding && " w-screen md:w-screen mt-16 "
      )}
    >
      <div
        className={cn(
          "absolute top-[50%] left-0 ease-animate opacity-100   translate-y-[-50%] z-10  h-full hidden md:flex items-center justify-start px-10 w-[40vw] md:w-[20vw] ",
          !canScrollLeft && "pointer-events-none opacity-0"
        )}
      >
        <CustomIconbutton onClick={scrollLeft} variant="primary">
          <img src="/Icons/ArrowLeft.svg" alt="" className="w-5 h-5" />
        </CustomIconbutton>
      </div>
      <div
        className={cn(
          "absolute top-[50%] right-0 !z-[30]  ease-animate  opacity-100 translate-y-[-50%]  h-full flex  items-center justify-end px-10 w-[64px] md:w-[270px]",
          !canScrollRight && "pointer-events-none opacity-0"
        )}
      >
        <CustomIconbutton
          onClick={scrollRight}
          variant="primary"
          className={"hidden md:flex"}
        >
          <img src="/Icons/ArrowRight.svg" alt="" className="w-5 h-5" />
        </CustomIconbutton>
      </div>
      <div
        ref={containerRef}
        className={cn(
          "flex w-full h-full items-center gap-x-4 md:gap-x-5  snap-x snap-mandatory overflow-x-scroll hide-scrollbar ",
          isLanding && "px-5 md:px-12 ",
          className
        )}
      >
        {campaigns.map((campaign, index) => (
          <CampaignCard
            campaign={campaign}
            key={index}
            carousel
            isLanding={isLanding}
            className="snap-center"
          />
        ))}
      </div>
    </div>
  );
}
