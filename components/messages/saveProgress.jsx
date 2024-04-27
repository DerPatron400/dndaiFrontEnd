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
      <Dialog className='bg-russianViolet'>
        <DialogTrigger className='px-4 py-2 running-text-mono uppercase  rounded-md bg-white text-black'>
          Open Modal
        </DialogTrigger>
        <DialogContent className='bg-[#1b1b31] !rounded-[16px] !p-0 flex-col gap-6 border border-white/10  '>
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
            <CustomButton variant='primary'>
              <div className='text-russianViolet flex items-center gap-2.5 '>
                SAVE
                <div className='flex  items-center gap-1 '>
                  (<img src='/gems/Legendary.png' className='p-0' />
                  1)
                </div>
              </div>
            </CustomButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
