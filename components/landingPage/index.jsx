"use client";
import React, { useEffect, useRef } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
// import LocomotiveScroll from "locomotive-scroll"
import Step from "@/components/landingPage/step";

import ImageParallax from "@/components/landingPage/ImageParallax";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import Button from "@/components/ui/custom-button";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import useControlsStore from "@/utils/controlsStore";
import SoundButton from "@/components/ui/Shared/SoundButton";
import PlayForFreeMobile from "@/components/ui/Shared/PlayForFreeMobile";
import { useRouter } from "next/navigation";
import ImagesVisual from "@/components/landingPage/imagesVisual";
import Campaigns from "@/components/landingPage/campaignSection";
// import LocomotiveScroll from "./LocomotiveScroll"

const LocomotiveScroll = dynamic(
  () => import("@/components/landingPage/LocomotiveScroll"),
  {
    ssr: false,
  }
);

export default function Home() {
  const { showMenu } = useControlsStore();
  const scrollRef = useRef(null);
  const locoScrollRef = useRef(null);

  const { isMobile } = useDeviceDetect();
  return (
    <>
      <LocomotiveScroll scrollRef={scrollRef} locoScrollRef={locoScrollRef} />{" "}
      <div
        data-scroll-container
        ref={scrollRef}
        className="w-full h-full overflow-x-hidden bg-gradient-to-b px-0 py-0 m-0  !bg-russianViolet  "
      >
        <div
          className=" w-full h-screen  relative "
          style={{
            backgroundImage: isMobile
              ? "url(/images/Landing/Header-mobile.png)"
              : "url(/images/Landing/Header.webp)",
            backgroundSize: "cover",

            backgroundPosition: "center",
          }}
        >
          <div className="absolute md:bottom-10 px-5 md:px-12 bottom-20 md:left-0 left-0 md:w-2/4  w-full">
            <span className=" headline-1 md:headline-2 text-white    w-full">
            EXPERIENCE GAMEPLAY WITHOUT CREATIVE BOUNDARIES, WHERE YOUR
              IMAGINATION IS THE ONLY LIMIT.
            </span>
            <div
              className={cn(
                `flex w-full z-50 fixed bottom-[20px] left-0 px-[20px] justify-between items-center md:hidden`,
                showMenu && "hidden"
              )}
            >
              <SoundButton />
              <PlayForFreeMobile />
            </div>
          </div>
        </div>
        <ParallaxProvider>
          <div className="w-screen md:h-[200vh] py-10 h-full flex flex-col justify-center items-center bg-russianViolet">
            <ImageParallax />
          </div>
        </ParallaxProvider>

        <div className="h-full flex flex-col justify-center items-center bg-transparent md:py-32 px-5 md:px-12  ">
          <Step
            number={1}
            title={"CRAFT YOUR OWN CHARACTER"}
            description={
              "You can easily create your own character by selecting from a wide range of races, classes, backgrounds, starting gear, and more. This allows you to venture into your own unique stories, shaping your character's journey as you progress and level up!"
            }
            image={
              "https://dndai-images.s3.eu-central-1.amazonaws.com/tutorial/tutorial-1.webp"
            }
          />
          <Step
            number={2}
            title={"DESIGN YOUR OWN CAMPAIGNS"}
            description={
              "Unleash your creativity and effortlessly craft your own campaign. You have the freedom to set the main plot, establish the setting, create a timeline, and add a special hook. There are no limits to what you can create!"
            }
            image={
              "https://dndai-images.s3.eu-central-1.amazonaws.com/tutorial/tutorial-2.webp"
            }
          />
          <Step
            number={3}
            title={"EXPERIENCE EPIC CHARACTER PROGRESSION"}
            description={
              "Whether playing solo or with friends in multiplayer mode, immerse yourself in the journey of your character's growth. Progress through your own campaigns or those created by others, both privately and publicly, for an unforgettable gaming experience!"
            }
            image={
              "https://dndai-images.s3.eu-central-1.amazonaws.com/tutorial/tutorial-3.webp"
            }
          />
        </div>

        <ImagesVisual />
        <div className="w-s h-full flex flex-col justify-center items-center bg-transparent">
          <Campaigns />
        </div>
      </div>
    </>
  );
}
