"use client";
import React, { useEffect } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import Card from "@/components/campaigns/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/context-menu";
import SaveProgress from "@/components/messages/saveProgress";
import CustomInput from "@/components/ui/custom-input";
import SearchInput from "@/components/ui/search-input";
import CustomTab from "@/components/ui/custom-tab";
import { MessageCircle, ArrowUp, Undo2, ShieldX } from "lucide-react";
import CustomInputIcon from "@/components/ui/custom-input-icon";
import CommentBox from "@/components/ui/comment-box";
import ToastWithAction from "@/components/ui/custom-toast";
import CustomDropdown from "@/components/ui/custom-dropdown";
import Step from "@/components/landingPage/step";

import ImageParallax from "@/components/landingPage/ImageParallax";
import useDeviceDetect from "@/hooks/useDviceDetect";
import Button from "@/components/ui/custom-button";
import CustomRadioButton from "@/components/ui/custom-radio-button";
import dynamic from "next/dynamic";

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
      className="w-full md:w-[99%]  h-full overflow-x-hidden bg-gradient-to-b px-0 py-0 m-0  !bg-russianViolet  "
    >
      <div
        className=" w-full h-screen  relative "
        style={{
          backgroundImage: isMobile
            ? "url(/images/Landing/Header-mobile.png)"
            : "url(/images/Landing/Header.png)",
          backgroundSize: "cover",
          //position
          backgroundPosition: "center",
        }}
      >
        <div className="absolute md:bottom-10 px-4 md:px-8  bottom-24 md:left-0 left-0 md:w-2/4 w-4/5">
          <span className="w-full headline-1 md:headline-2 text-white">
            EXPIRIENCE GAMEPLAY WTHOUT CREATIVE BOUNDARIES, WHERE YOUR
            IMAGINATION IS THE ONLY LIMIT.
          </span>
        </div>
        <div
          className={`absolute bottom-5 right-5 ${
            isMobile ? "visible" : "hidden"
          }`}
        >
          <Button variant={"primary"}>PLAY FOR FREE</Button>
        </div>
      </div>
      <ParallaxProvider>
        <div className="w-screen md:h-[200vh] py-10 h-full flex flex-col justify-center items-center bg-russianViolet">
          <ImageParallax />
        </div>
      </ParallaxProvider>

      <div className=" h-full flex flex-col justify-center items-center bg-transparent md:py-32 px-4 md:px-8  py-0">
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
      <div className="w-s h-full flex flex-col justify-center items-center bg-transparent">
        <Campaigns />
      </div>
    </div>
  );
}
