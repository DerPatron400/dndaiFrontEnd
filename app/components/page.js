"use client";
import React from "react";
import Button from "@/components/ui/custom-button";
import CustomRadioButton from "@/components/ui/custom-radio-button";
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
import { MessageCircle, ArrowUp, Undo2, ShieldX, X } from "lucide-react";
import CustomInputIcon from "@/components/ui/custom-input-icon";
import CommentBox from "@/components/ui/comment-box";
import ToastWithAction from "@/components/ui/custom-toast";
import CustomDropdown from "@/components/ui/custom-dropdown";
import CustomButton from "@/components/ui/custom-button";
import CustomIcontext from "@/components/ui/custom-icontext";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import CustomMenuItem from "@/components/ui/custom-menu-item";
import { User, CircleUserRound, Images } from "lucide-react";
import { Toast } from "@radix-ui/react-toast";
export default function Page() {
  return (
    <div className="bg-russianViolet w-screen h-full flex flex-col px-5 justify-center py-24 gap-2">
      <div className="w-full  flex flex-wrap px-5 py-5 items-center justify-center gap-x-5">
        <CustomButton variant={"primary"}>Button</CustomButton>
        <CustomButton variant={"primary"} withIcon={true}>
          <ArrowUp size={15} />
          Go
        </CustomButton>

        <CustomIcontext>
          <ShieldX size={15} opacity={0.7} />
          Safe
        </CustomIcontext>
        <CustomButton
          withIcon={true}
          className={
            "bg-green-400 hover:bg-green-400  text-black p3-4 ps-6  active:opacity-80 hover:opacity-90"
          }
        >
          Finish And Start
          <ArrowUp size={15} />
        </CustomButton>

        <CustomIconbutton className={"w-6 h-6"}>
          <X className="h-3 w-3 " color="white" />
        </CustomIconbutton>

        <CustomIconbutton>
          <img src="/Icons/User.svg" alt="logo" className="h-5 w-5 invert " />
        </CustomIconbutton>

        <div className={"flex justify-center items-center gap-2"}>
          <CustomIconbutton>
            <img src="/Icons/User.svg" alt="logo" className="h-5 w-5 invert " />
          </CustomIconbutton>
          <span className="text-white"> Text</span>
        </div>
      </div>
      <div className="w-full flex flex-wrap px-5 py-5 items-center justify-center gap-x-5">
        <CustomInput placeholder="Input Control" />
        <CustomDropdown
          placeholder={"dropdown"}
          options={["option1", "option2", "option3"]}
        />
        <SearchInput />

        <CustomTab
          icon={<MessageCircle size={16} />}
          text={"comments"}
          number={258}
        />

        {/* <DropdownMenu>
          <DropdownMenuTrigger className="transition-all duration-300 hover:bg-russianViolet">
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

        <Switch />
        <CustomRadioButton /> */}

        {/* <SaveProgress /> */}

        {/* <ToastWithAction
          message="Error"
          title="Error message"
          actionText={"Retry"}
          actionIcon={<ShieldX size={15} />}
        />
        <ToastWithAction
          message="Success"
          title="Information Message"
          actionText={"Undo"}
          actionIcon={<Undo2 size={15} />}
        />

        <CustomTab
          icon={<MessageCircle size={15} />}
          text="Comments"
          number={5}
        /> */}
      </div>
      <div className="w-full flex flex-wrap px-5 py-5 items-center justify-center gap-x-5">
        <RadioGroup>
          <RadioGroupItem value="1">Option 1</RadioGroupItem>
          <RadioGroupItem value="2">Option 2</RadioGroupItem>
          <RadioGroupItem value="3">Option 3</RadioGroupItem>
        </RadioGroup>
      </div>
      <div className="w-full flex flex-wrap px-5 py-5 items-center justify-center gap-x-5">
        {/* <SaveProgress /> */}
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none bg-white/10 h-9 w-9 border border-white/10 hover:border-white/20 active:border-white/40  transition-all duration-300  flex items-center justify-center rounded-full">
            <img src="/Icons/User.svg" className="h-5 w-5 invert" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-transparent uppercase flex flex-col mt-4 p-2 border border-white/10 z-[10] bg-blur text-white running-text-mono rounded-[16px]">
            <CustomButton withIcon variant="primary">
              <img
                src="/Icons/Login.svg"
                alt="logo"
                className="h-[15px] w-[15px] "
              />
              SIGN IN
            </CustomButton>

            <DropdownMenuItem className="flex gap-2 hover:bg-transparent focus:bg-transparent focus:text-white hover:scale-105 transition-all duration-300 ease-linear cursor-pointer">
              <CustomMenuItem>
                <CircleUserRound size={15} className="text-iconColor" />
                <span>My characters</span>
              </CustomMenuItem>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2 hover:bg-transparent focus:bg-transparent focus:text-white hover:scale-105 transition-all duration-300 ease-linear cursor-pointer">
              <CustomMenuItem>
                <Images size={15} className="text-iconColor" />
                <span>Saved images</span>
              </CustomMenuItem>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2 hover:bg-transparent focus:bg-transparent focus:text-white hover:scale-105 transition-all duration-300 ease-linear cursor-pointer">
              <CustomMenuItem>
                <img src="/images/campaign.png" alt="" className="h-3 w-4" />
                <span>My campaigns</span>
              </CustomMenuItem>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Card />
        <CustomInputIcon
          placeholder="What Would You Do?"
          icon={<ArrowUp size={16} />}
        />
        <CustomInputIcon
          placeholder="Write a comment...."
          icon={<ArrowUp size={16} />}
        />
        {/* <CommentBox /> */}
      </div>
    </div>
  );
}
