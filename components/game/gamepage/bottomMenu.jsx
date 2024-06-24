import React, { useState } from "react";
import CustomButton from "@/components/ui/custom-button";
import CustomInputIcon from "@/components/ui/custom-input-icon";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Step1 from "./steps/step1";
import ImageZoom from "./imageZoom";
import Narrate from "./narrate";

export default function bottomMenu() {
  const [imageDialog, setImageDialog] = useState(false);
  const [imageViewDialog, setImageViewDialog] = useState(false);
  const [narrateDialog, setNarrateDialog] = useState(false);
  return (
    <div className='flex justify-between items-center'>
      <div className='flex justify-start items-center gap-3'>
        <Dialog
          open={imageDialog}
          onOpenChange={(isOpen) => setImageDialog(isOpen)}
        >
          <DialogTrigger asChild suppressHydrationWarning>
            <button className='running-text-mono flex items-center pe-5 ps-[20px] gap-2 h-[48px] px-6 bg-white/10 hover:bg-white/10 uppercase border border-white/10 hover:border-white/20 active:bg-white/20 active:border-white/40 disabled:opacity-30 rounded-[10px]  cursor-pointer z-[10] ease-animate  hover:!duration-200 active:!duration-100'>
              <img
                src='/Icons/Generate.svg'
                alt=''
                className='h-4 w-4 opacity-70'
              />
              Generate image
            </button>
          </DialogTrigger>
          <Step1 setOpen={setImageDialog} setImageOpen={setImageViewDialog} />
        </Dialog>

        <Dialog
          open={imageViewDialog}
          onOpenChange={(isOpen) => setImageViewDialog(isOpen)}
        >
          <ImageZoom
            setOpen={setImageViewDialog}
            setImageDialog={setImageDialog}
          />
        </Dialog>

        <Dialog
          open={narrateDialog}
          onOpenChange={(isOpen) => setNarrateDialog(isOpen)}
        >
          <DialogTrigger asChild>
            <button className='running-text-mono flex items-center pe-5 ps-[20px] gap-2 h-[48px] px-6 bg-white/10 hover:bg-white/10 uppercase border border-white/10 hover:border-white/20 active:bg-white/20 active:border-white/40 disabled:opacity-30 rounded-[10px]  cursor-pointer z-[10] ease-animate  hover:!duration-200 active:!duration-100'>
              <img
                src='/Icons/Narrate.svg'
                alt=''
                className='h-4 w-4 opacity-70'
              />
              Narrate
            </button>
          </DialogTrigger>
          <Narrate setOpen={setNarrateDialog} />
        </Dialog>
        <CustomButton>
          <img src='/Icons/Bulb.svg' alt='' className='h-4 w-4 opacity-70' />
          Suggest next move
        </CustomButton>
      </div>
      <div className='flex gap-2 justify-start items-center'>
        <span className='running-text-mono text-gray2'>TEXT SIZE</span>
        <CustomIconbutton variant={"primary"} className={"h-6 w-6"}>
          <img src='/Icons/Minus.svg' alt='logo' className='h-2 w-2' />
        </CustomIconbutton>

        <CustomIconbutton variant={"primary"} className={"h-6 w-6"}>
          <img src='/Icons/Add.svg' alt='logo' className='h-2 w-2' />
        </CustomIconbutton>
      </div>
    </div>
  );
}
