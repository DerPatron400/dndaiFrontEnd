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
import { MessageCircle, ArrowUp, Undo2, ShieldX } from "lucide-react";
import CustomInputIcon from "@/components/ui/custom-input-icon";
import CommentBox from "@/components/ui/comment-box";
import ToastWithAction from "@/components/ui/custom-toast";
import CustomDropdown from "@/components/ui/custom-dropdown";
import CustomButton from "@/components/ui/custom-button";
import CustomIcontext from "@/components/ui/custom-icontext";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import { Toast } from "@radix-ui/react-toast";
export default function Page() {
  return (
    <div className='bg-russianViolet w-screen h-screen flex items-center justify-center gap-x-5'>
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
      <CustomIconbutton>
        <img src='/Icons/User.svg' alt='logo' className='h-5 w-5 invert ' />
      </CustomIconbutton>

      <CustomTab
        icon={<MessageCircle size={15} />}
        text='Comments'
        number={5}
      />
      <SaveProgress />
    </div>
  );
}
