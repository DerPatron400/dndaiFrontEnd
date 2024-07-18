import React from "react";
import { DialogContent } from "@/components/ui/dialog";
import CustomButton from "@/components/ui/custom-button";
import Download from "@/components/ui/Icons/Download";
import Cancel from "@/components/ui/Icons/Cancel";
import CustomIconbutton from "@/components/ui/custom-iconbutton";

export default function Image({ setOpen, image }) {
  const downloadImage = () => {
    const link = document.createElement("a");
    link.target = "_blank";
    link.href = image;
    link.download = "image.png";
    link.click();
  };

  return (
    <DialogContent className=' text-white bg-transparent border-none p-5 md:p-0'>
      <>
        <div className='grid relative grid-cols-1 gap-4  '>
          <CustomIconbutton
            onClick={() => {
              setOpen(false);
            }}
            className={"absolute top-4 right-4 bg-blur-icon-button"}
          >
            <img src='/Icons/Cancel.svg' alt='' className='h-5 w-5 ' />
          </CustomIconbutton>
          <img
            src={image}
            className='w-full md:h-[500px] md:w-full ease-animate object-cover rounded-[10px] '
          />
        </div>
      </>

      <div className='md:flex justify-between hidden '>
        <div className='flex justify-start gap-4 '>
          <CustomButton onClick={downloadImage} withIcon variant={"subtle"}>
            <Download className='h-5 w-5 opacity-70 fill-white' />
            download image
          </CustomButton>
        </div>
        <CustomButton onClick={() => setOpen(false)} withIcon>
          <Cancel className='w-3 h-3 opacity-70 fill-white' />
          <span className='running-text-mono text-white'>CLOSE</span>
        </CustomButton>
      </div>
    </DialogContent>
  );
}
