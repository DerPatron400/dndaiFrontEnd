import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CustomButton from "@/components/ui/custom-button";
import Cancel from "@/components/ui/Icons/Cancel";
import Save from "@/components/ui/Icons/Save";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import GenerateNew from "./generate-new";
import { cn } from "@/lib/utils";

const CurrentAvatarsList = ({ avatars }) => {
  return (
    <div className={"flex gap-5 flex-col items-start p-6 pt-4"}>
      <span className='text-white running-text-large '>
        Change character portrait
      </span>
      <div className='grid grid-cols-12 w-full gap-5 min-h-96 max-h-[550px] overflow-scroll hide-scrollbar items-center justify-center '>
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className='col-span-4'
            onClick={() => {
              console.log("avatar clicked", avatar);
            }}
          >
            <img src={avatar} alt='avatar' className='w-full h-full ' />
          </div>
        ))}

        {avatars.length === 0 && (
          <span className='text-white flex items-center justify-center running-text-mono uppercase col-span-12  w-full'>
            No avatars found
          </span>
        )}
      </div>
    </div>
  );
};
export default function Avatar({ open, setOpen, avatars = [] }) {
  //get params
  const params = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const generateAvatar = params.get("generateAvatar");

  console.log("generateAvatar", generateAvatar);

  const handleAvatarClick = () => {
    //current path: /character/my-characters
    console.log("avatar clicked", path);
    router.push(path + "?generateAvatar=true");
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(_open) => setOpen(_open)}
      className='bg-russianViolet !gap-0'
    >
      <DialogContent className='bg-[#1b1b31] !rounded-[16px] !p-0 flex-col !gap-0 border border-white/10  !min-w-[757px] '>
        {generateAvatar ? (
          <GenerateNew />
        ) : (
          <CurrentAvatarsList avatars={avatars} />
        )}

        <div
          className={cn(
            "p-6 border-t border-white/10 justify-between w-full flex items-center  ",
            generateAvatar && "justify-end"
          )}
        >
          <CustomButton
            variant={"primary"}
            onClick={() => {
              handleAvatarClick();
            }}
            withIcon={true}
            className={cn(generateAvatar && "hidden")}
          >
            Generate new portrait
            <div className='flex  items-center gap-1 '>
              (<img src='/gems/Legendary.png' className='p-0' />
              1)
            </div>
          </CustomButton>
          <div className='flex items-center gap-4'>
            <CustomButton
              onClick={() => {
                setOpen(false);
              }}
              withIcon={true}
            >
              <Cancel className='w-5 h-5 opacity-70' fill={"white"} />
              Cancel
            </CustomButton>
            <CustomButton
              variant={"primary"}
              onClick={() => {
                setOpen(false);
              }}
              withIcon={true}
              disabled={avatars.length === 0}
              className={cn(generateAvatar && "hidden")}
            >
              <Save className='w-5 h-5 ' fill={"#0A0A21"} />
              Save
            </CustomButton>

            <CustomButton
              variant={"primary"}
              onClick={() => {
                setOpen(false);
              }}
              withIcon={true}
              className={cn(!generateAvatar && "hidden")}
            >
              Generate
              <div className='flex  items-center gap-1 '>
                (<img src='/gems/Legendary.png' className='p-0' />
                1)
              </div>
            </CustomButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
