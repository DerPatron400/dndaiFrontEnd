"use client";
import React, { useEffect } from "react";
import { ParallaxProvider } from "react-scroll-parallax";

import Step from "@/components/landingPage/step";

import ImageParallax from "@/components/landingPage/ImageParallax";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import Button from "@/components/ui/custom-button";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import CustomIconbutton from "@/components/ui/custom-iconbutton";

const ImagesVisual = dynamic(
  () => import("@/components/landingPage/imagesVisual"),
  {
    ssr: false,
  }
);
const Campaigns = dynamic(
  () => import("@/components/landingPage/campaignSection"),
  {
    ssr: false,
  }
);

export default function Home() {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);
  const { isMobile } = useDeviceDetect();
  return (
    // from-russianViolet via-russianViolet to-[#262658]
    <div
      data-scroll-container
      className='w-full md:w-[99%]  h-full overflow-x-hidden bg-gradient-to-b px-0 py-0 m-0  !bg-russianViolet  '
    >
      <div
        className=' w-full h-screen  relative '
        style={{
          backgroundImage: isMobile
            ? "url(/images/Landing/Header-mobile.png)"
            : "url(/images/Landing/Header.png)",
          backgroundSize: "cover",
          //position
          backgroundPosition: "center",
        }}
      >
        <div className='absolute md:bottom-10 px-5 md:px-12  bottom-5 md:left-0 left-0 w-full'>
          <span className=' headline-1 md:headline-2 text-white md:w-2/4 w-full'>
            EXPIRIENCE GAMEPLAY WTHOUT CREATIVE BOUNDARIES, WHERE YOUR
            IMAGINATION IS THE ONLY LIMIT.
          </span>
          <div
            className={cn(
              `flex mt-12 w-full  justify-between items-center md:hidden`
            )}
          >
            <CustomIconbutton>
              <img
                src='/Icons/SoundOff.svg'
                alt='logo'
                className='h-5 w-5 invert'
              />
            </CustomIconbutton>
            <Button variant={"primary"}>PLAY FOR FREE</Button>
          </div>
        </div>
      </div>
      <ParallaxProvider>
        <div
          style={{
            backgroundImage: "url(/parallax/Race2.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className='w-screen md:h-[200vh] py-10 h-full flex flex-col justify-center items-center bg-russianViolet'
        >
          <ImageParallax />
        </div>
      </ParallaxProvider>

      <div className='h-full flex flex-col justify-center items-center bg-transparent py-32 px-5 md:px-12  '>
        <Step
          number={1}
          title={"CRAFT YOUR OWN CHARACTER"}
          description={
            "You can easily create your own character by selecting from a wide range of races, classes, backgrounds, starting gear, and more. This allows you to venture into your own unique stories, shaping your character's journey as you progress and level up!"
          }
          image={"/images/step1.png"}
        />
        <Step
          number={2}
          title={"DESIGN YOUR OWN CAMPAIGNS"}
          description={
            "Unleash your creativity and effortlessly craft your own campaign. You have the freedom to set the main plot, establish the setting, create a timeline, and add a special hook. There are no limits to what you can create!"
          }
          image={"/images/step2.png"}
        />
        <Step
          number={3}
          title={"EXPERIENCE EPIC CHARACTER PROGRESSION"}
          description={
            "Whether playing solo or with friends in multiplayer mode, immerse yourself in the journey of your character's growth. Progress through your own campaigns or those created by others, both privately and publicly, for an unforgettable gaming experience!"
          }
          image={"/images/step3.png"}
        />
      </div>

      <ImagesVisual />
      <div className='w-s h-full flex flex-col justify-center items-center bg-transparent'>
        <Campaigns />
      </div>
    </div>
  );
}
