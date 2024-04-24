import React, { useState } from "react";
import { User, CircleUserRound, Images } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import IconButton from "@/components/ui/custom-iconbutton";
import CustomButton from "../ui/custom-button";
import CustomMenuItem from "../ui/custom-menu-item";

export default function accountDropdown() {
  const [open, setOpen] = useState(false);
  console.log(open);
  return (
    <DropdownMenu onOpenChange={(e) => setOpen(e)} open={open}>
      <DropdownMenuTrigger className='outline-none bg-white/10 h-9 w-9 border border-white/10 flex items-center justify-center rounded-full'>
        <img src='/Icons/User.svg' className='h-5 w-5 invert' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-transparent uppercase flex flex-col gap-2 p-2 mt-4 border border-white/10 z-[10] bg-blur text-white running-text-mono rounded-[16px]'>
        <CustomButton withIcon variant='primary'>
          <img
            src='/Icons/Login.svg'
            alt='logo'
            className='h-[15px] w-[15px] '
          />
          SIGN IN
        </CustomButton>

        <DropdownMenuItem className='felx gap-2 hover:bg-transparent focus:bg-transparent focus:text-white hover:scale-105 py-[14px] transition-all duration-300 ease-linear cursor-pointer'>
          <CustomMenuItem>
            <CircleUserRound size={15} className='text-iconColor' />
            <span>My characters</span>
          </CustomMenuItem>
        </DropdownMenuItem>
        <DropdownMenuItem className='flex gap-2 hover:bg-transparent focus:bg-transparent focus:text-white hover:scale-105 py-[14px] transition-all duration-300 ease-linear cursor-pointer'>
          <CustomMenuItem>
            <Images size={15} className='text-iconColor' />
            <span>Saved images</span>
          </CustomMenuItem>
        </DropdownMenuItem>
        <DropdownMenuItem className='flex gap-2 hover:bg-transparent focus:bg-transparent focus:text-white hover:scale-105 py-[14px] transition-all duration-300 ease-linear cursor-pointer'>
          <CustomMenuItem>
            <img src='/images/campaign.png' alt='' className='h-3 w-4' />
            <span>My campaigns</span>
          </CustomMenuItem>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
