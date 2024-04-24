"use client";
import { ParallaxProvider } from "react-scroll-parallax";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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
import ImagesVisual from "@/components/landingPage/imagesVisual";
import CampaignSection from "@/components/landingPage/campaignSection";
import ImageParallax from "@/components/landingPage/ImageParallax";
import useDeviceDetect from "@/hooks/useDviceDetect";
import Button from "@/components/ui/custom-button";
export default function Home() {
  const { isMobile } = useDeviceDetect();
  return (
    <div className='w-screen h-full flex flex-col items-center bg-russianViolet  '>
      {/* <div className='flex gap-x-10 mt-40 flex-wrap'>
        <SearchInput />

        <CustomInputIcon
          placeholder='What Would You Do?'
          icon={<ArrowUp size={16} />}
        />
        <CustomTab
          icon={<MessageCircle size={16} />}
          text={"comments"}
          number={258}
        />

        <CustomInput placeholder='Input Control' />

        <Switch />
        <RadioGroup defaultValue='option-one'>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='option-one' id='option-one' />
            <Label htmlFor='option-one'>Option One</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='option-two' id='option-two' />
            <Label htmlFor='option-two'>Option Two</Label>
          </div>
        </RadioGroup>

        <SaveProgress />

        <DropdownMenu>
          <DropdownMenuTrigger className='transition-all duration-300 hover:bg-russianViolet'>
            Dropdown
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <CustomDropdown
          placeholder={"dropdown"}
          options={["option1", "option2", "option3"]}
        />

        <ToastWithAction
          message='Error'
          title='Error message'
          actionText={"Retry"}
          actionIcon={<ShieldX size={15} />}
        />
        <ToastWithAction
          message='Success'
          title='Information Message'
          actionText={"Undo"}
          actionIcon={<Undo2 size={15} />}
        />
        <Card />
        <CommentBox />
      </div> */}
      <div
        className='w-screen h-screen flex gap-x-3 justify-center items-center relative'
        style={{
          backgroundImage: isMobile
            ? "url(/images/Landing/Header-mobile.png)"
            : "url(/images/Landing/Header.png)",
          backgroundSize: "cover",
          //position
          backgroundPosition: "center",
        }}
      >
        <div className='absolute md:bottom-10 bottom-24 md:left-10 left-5 md:w-2/5 w-4/5'>
          <span className='w-full headline-1 md:headline-2 text-white'>
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
        <div className='w-screen md:h-[200vh] py-10 h-full flex flex-col justify-center items-center bg-gradient-to-b from-russianViolet via-russianViolet to-[#262658]'>
          <ImageParallax />
        </div>
      </ParallaxProvider>
      <div className='w-full  h-full flex flex-col justify-center items-center bg-russianViolet py-32'>
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

      <div className='w-full h-full flex flex-col justify-center items-center bg-russianViolet'>
        <CampaignSection />
      </div>
    </div>
  );
}
