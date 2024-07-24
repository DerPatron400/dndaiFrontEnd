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
import CustomMenuItem from "../custom-menu-item";
import { cn } from "@/lib/utils";

//menu
export default function CreateMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleNavigation = (path) => {
    router.push(path);
  };
  return (
    <Popover open={open} onOpenChange={(open) => setOpen(open)}>
      <PopoverTrigger>
        <CustomIconbutton
          className={cn(
            open &&
              "bg-white/20 border-white/40 hover:bg-white/20 active:bg-white/20 active:border-white/40 hover:border-white/40"
          )}
        >
          <Add className='h-5 w-5 fill-white' />
        </CustomIconbutton>
      </PopoverTrigger>
      <PopoverContent className='mt-5 !bg-russianViolet !p-0  !blur-none !backdrop-blur-none !border-none '>
        <div className='bg-white/10 p-5 py-2  px-2 border border-white/10 rounded-[16px]'>
          <CustomMenuItem
            onClick={() => handleNavigation("/character/create")}
            withIcon={true}
            variant='subtle'
          >
            <AddUser className='h-5 w-5 fill-white' />
            Create Character
          </CustomMenuItem>
          <CustomMenuItem
            onClick={() => handleNavigation("/campaign/create")}
            withIcon={true}
            variant='subtle'
          >
            <CampaignAdd className='h-5 w-5 fill-white' />
            Create Campaign
          </CustomMenuItem>
        </div>
      </PopoverContent>
    </Popover>
  );
}
