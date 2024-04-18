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

export default function saveProgress() {
  return (
    <div>
      <Dialog>
        <DialogTrigger className='px-4 py-2  rounded-md bg-white text-black'>
          Share
        </DialogTrigger>
        <DialogContent className='bg-russianViolet border-none '>
          <DialogHeader>
            <DialogTitle className=' text-2xl font-medium text-white font-helvetica-now-display '>
              Character progress not saved!
            </DialogTitle>
            <DialogDescription className='text-white opacity-75 py-4 font-helvetica-now-display '>
              It seems that you haven’t saved your character progress. Would you
              like to save?
            </DialogDescription>
            <div className='w-full flex justify-between items-center font-roboto-mono '>
              <DialogClose className='text-white bg-white/10'></DialogClose>
              <Button className='text-white bg-errorRed'>DON'T SAVE</Button>
              <Button className='text-black bg-white hover:text-white'>
                SAVE (1)
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
