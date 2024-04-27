import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import CustomButton from "@/components/ui/custom-button";

export default function saveProgress() {
  return (
    <div>
      <Dialog open={true} className='bg-russianViolet'>
        <DialogTrigger className='px-4 py-2  rounded-md bg-white text-black'>
          Share
        </DialogTrigger>
        <DialogContent className='bg-[#1b1b31] rounded-[16%] !p-0 flex-col gap-6 border border-white/10  '>
          <div className={"flex gap-3 flex-col px-6 pt-4"}>
            <span className='  text-white running-text-large '>
              Character progress not saved!
            </span>
            <span className='text-gray2   running-text '>
              It seems that you haven’t saved your character progress. Would you
              like to save?
            </span>
          </div>
          <div className='w-full flex p-6 border-t border-white/10 justify-between items-center font-roboto-mono '>
            <CustomButton withIcon={true}>
              <img
                src='/Icons/Cancel.svg'
                alt='logo'
                className='h-5 w-5 invert '
              />
              Cancel
            </CustomButton>
            <CustomButton variant='error'>DON'T SAVE</CustomButton>
            <CustomButton variant='primary'>SAVE (1)</CustomButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
