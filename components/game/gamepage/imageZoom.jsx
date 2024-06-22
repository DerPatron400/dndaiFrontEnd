import React from "react";
import { DialogContent } from "@/components/ui/dialog";
import CustomButton from "@/components/ui/custom-button";
import Generate from "@/components/ui/Icons/Generate";
import Download from "@/components/ui/Icons/Download";
import Cancel from "@/components/ui/Icons/Cancel";

export default function imageZoom() {
  return (
    <DialogContent className=' text-white bg-transparent border-none p-0'>
      <>
        <div className='grid grid-cols-1 gap-4  '>
          <img
            src='/images/CreateCharacter/CharacterName/CharacterName.png'
            className='w-full h-[107px] md:h-[500px] md:w-full ease-animate object-cover rounded-[10px] '
          />
        </div>
      </>

      <div className='flex justify-between '>
        <div className='flex justify-start gap-4 '>
          <CustomButton withIcon>
            <Generate className='w-5 h-5 opacity-70 fill-white' />
            Generate another image
          </CustomButton>
          <CustomButton withIcon variant={"subtle"}>
            <Download className='h-5 w-5 opacity-70 fill-white' />
            download image
          </CustomButton>
        </div>
        <CustomButton withIcon>
          <Cancel className='w-3 h-3 opacity-70 fill-white' />
          <span className='running-text-mono text-white'>CLOSE</span>
        </CustomButton>
      </div>
    </DialogContent>
  );
}
