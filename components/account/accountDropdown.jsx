import React from "react";
import { User, CircleUserRound, Images } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function accountDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="outline-none">
        <button className="bg-transparent text-iconColor font-bold p-2 rounded-full border border-iconColor">
          <User />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-transparent flex flex-col gap-2 py-4 mt-4 bg-blur text-white dm-mono px-6 rounded-3xl border-none">
        <button className="bg-white py-3 px-10 text-black rounded-xl">
          SIGN IN
        </button>
        <DropdownMenuItem className="felx gap-2 hover:bg-transparent focus:bg-transparent focus:text-white hover:scale-105 transition-all duration-300 ease-linear cursor-pointer">
          <CircleUserRound size={15} className="text-iconColor" />
          <span>My characters</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2 hover:bg-transparent focus:bg-transparent focus:text-white hover:scale-105 transition-all duration-300 ease-linear cursor-pointer">
          <Images size={15} className="text-iconColor" />
          <span>Saved images</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2 hover:bg-transparent focus:bg-transparent focus:text-white hover:scale-105 transition-all duration-300 ease-linear cursor-pointer">
          <img src="/images/campaign.png" alt="" className="h-3 w-4" />
          <span>My campaigns</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
