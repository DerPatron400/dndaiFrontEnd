import React from "react";
import { DialogContent } from "@/components/ui/dialog";
import CustomButton from "@/components/ui/custom-button";
import Generate from "@/components/ui/Icons/Generate";
import Download from "@/components/ui/Icons/Download";
import Cancel from "@/components/ui/Icons/Cancel";
import useGameStore from "@/utils/gameStore";
import CustomIconbutton from "@/components/ui/custom-iconbutton";

export default function imageZoom({ setOpen, setImageDialog }) {
  const { image } = useGameStore();

  const downloadImage = () => {
    const link = document.createElement("a");
    link.target = "_blank";
    link.href = image;
    link.download = "image.png";
    link.click();
  };

  return (
    <DialogContent className=' text-white bg-transparent border-none p-5 md:p-0 !max-w-screen !w-screen  md:!w-full'>
      <div className='grid grid-cols-1 gap-4 relative '>
        <CustomIconbutton
          onClick={() => {
            setOpen(false);
          }}
          className={"absolute md:hidden top-4 right-4 bg-blur-icon-button"}
        >
          <img src='/Icons/Cancel.svg' alt='' className='h-5 w-5 ' />
        </CustomIconbutton>
        <img
          src={image}
          className='w-full md:h-[500px]  ease-animate object-cover rounded-[10px] '
        />
      </div>

      <div className='flex justify-between w-full md:w-auto '>
        <div className='flex justify-start gap-4 '>
          <CustomButton
            onClick={() => {
              setOpen(true);
              setImageDialog(true);
            }}
            withIcon={true}
          >
            <Generate className='w-5 h-5 opacity-70 fill-white' />
            Generate another image
          </CustomButton>
          <CustomButton
            className={"hidden md:flex"}
            onClick={downloadImage}
            withIcon={true}
            variant={"subtle"}
          >
            <Download className='h-5 w-5 opacity-70 fill-white' />
            download image
          </CustomButton>
        </div>
        <CustomButton
          className={"hidden md:flex"}
          onClick={() => setOpen(false)}
          withIcon={true}
        >
          <Cancel className='w-3 h-3 opacity-70 fill-white' />
          <span className='running-text-mono text-white'>CLOSE</span>
        </CustomButton>
      </div>
    </DialogContent>
  );
}
