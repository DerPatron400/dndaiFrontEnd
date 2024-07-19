import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CustomIconbutton from "../custom-iconbutton";
import Plus from "@/components/ui/Icons/Plus";
import Add from "@/components/ui/Icons/Add";
import CustomButton from "@/components/ui/custom-button";
import AddUser from "@/components/ui/Icons/AddUser";
import CampaignAdd from "@/components/ui/Icons/CampaignAdd";
import { useRouter } from "next/navigation";

export default function CreateMenu() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };
  return (
    <Popover>
      <PopoverTrigger>
        <CustomIconbutton>
          <Add className='h-5 w-5 fill-white' />
        </CustomIconbutton>
      </PopoverTrigger>
      <PopoverContent className='mt-5 !bg-russianViolet !p-0  !blur-none !backdrop-blur-none !border-none '>
        <div className='bg-white/10 p-5 py-2 border border-white/10 rounded-[16px]'>
          <CustomButton
            onClick={() => handleNavigation("/character/create")}
            withIcon={true}
            variant='subtle'
          >
            <AddUser className='h-5 w-5 fill-white' />
            Create Character
          </CustomButton>
          <CustomButton
            onClick={() => handleNavigation("/campaign/create")}
            withIcon={true}
            variant='subtle'
          >
            <CampaignAdd className='h-5 w-5 fill-white' />
            Create Campaign
          </CustomButton>
        </div>
      </PopoverContent>
    </Popover>
  );
}
