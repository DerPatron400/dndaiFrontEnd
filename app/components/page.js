"use client";
import React, { useState } from "react";
import Button from "@/components/ui/custom-button";
import CustomRadioButton from "@/components/ui/custom-radio-button";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// import Card from "@/components/campaigns/card";
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
import useCustomToast from "@/hooks/useCustomToast";
import CustomMenuItem from "@/components/ui/custom-menu-item";
import { User, CircleUserRound, Images } from "lucide-react";
import { Toast } from "@radix-ui/react-toast";
import CustomIconButtonText from "@/components/ui/custom-iconButtonText";
import Check from "@/components/ui/Icons/Check";
import Comment from "@/components/ui/Icons/Comment";
export default function Page() {
  const [value, setValue] = useState("");

  //show toast
  const { invokeToast } = useCustomToast();

  //

  const onClick = () => {
    invokeToast("Something Went Wrong", "error");
  };

  return (
    <div className='bg-russianViolet w-screen h-full flex flex-col px-5 justify-center py-24 gap-2'>
      <div className='w-full  flex flex-wrap px-5 py-5 items-center justify-center gap-x-5'>
        <CustomButton onClick={onClick} variant={"primary"}>
          Button
        </CustomButton>
        <CustomButton variant={"primary"} withIcon={true}>
          <ArrowUp size={15} />
          Go
        </CustomButton>

        <CustomIcontext>
          <ShieldX size={15} opacity={0.7} />
          Safe
        </CustomIcontext>
        <CustomButton withIcon={true} variant={"success"}>
          Finish And Start
          <ArrowUp size={15} />
        </CustomButton>

        <CustomIconbutton className={"w-6 h-6"}>
          <X className='h-3 w-3 ' color='white' />
        </CustomIconbutton>

        <CustomIconbutton>
          <img src='/Icons/User.svg' alt='logo' className='h-5 w-5 invert ' />
        </CustomIconbutton>
        <CustomIconButtonText />
      </div>
      <div className='w-full flex flex-wrap px-5 py-5 items-center justify-center gap-x-5'>
        <CustomInput
          value={value}
          onChange={(e) => setValue(e)}
          placeholder='Input Control'
        />
        <CustomDropdown
          placeholder={"dropdown"}
          options={["option1", "option2", "option3"]}
        />
        <SearchInput />

        <CustomTab
          icon={
            <Comment className='h-4 w-4 opacity-70 fill-gray2 group-active:fill-white ease-animate group-active:!duration-100' />
          }
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
      <CustomRadioButton />
      <div className=' flex flex-wrap px-5 py-5 items-center justify-center gap-x-5'>
        <SaveProgress />

        {/* <Card /> */}
        <CustomInputIcon
          placeholder='What Would You Do?'
          icon={<ArrowUp size={16} />}
        />
        <CustomInputIcon
          placeholder='Write a comment....'
          icon={<Check fill={"white"} className='h-4 w-4  opacity-70' />}
          isComment={true}
          text={"Send"}
          isSubtle={true}
        />
        {/* <CommentBox /> */}
      </div>
    </div>
  );
}
