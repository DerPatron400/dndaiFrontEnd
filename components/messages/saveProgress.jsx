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
        <DialogTrigger>
          <Button variant="outline">Share</Button>
        </DialogTrigger>
        <DialogContent className="bg-blur border-none">
          <DialogHeader>
            <DialogTitle className="headline-3 text-2xl text-white ">
              Character progress not saved!
            </DialogTitle>
            <DialogDescription className="text-white opacity-75 py-4">
              It seems that you haven’t saved your character progress. Would you
              like to save?
            </DialogDescription>
            <div className="w-full flex justify-between items-center ">
              <DialogClose className="text-white"></DialogClose>
              <Button className="text-white bg-errorRed">DON'T SAVE</Button>
              <Button className="text-black bg-white">SAVE (1)</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
