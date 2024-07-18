import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import Button from "@/components/ui/custom-button";
import { cn } from "@/lib/utils";
import Cancel from "@/components/ui/Icons/Cancel";

export default function SaveCharacter({ children, action }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='bg-white/[8%] !rounded-[16px] !px-0 gap-0 text-white border border-white/10 !w-[94%] sm:min-w-[472px]'>
        <div className='flex flex-col gap-[11px] p-6 pt-4'>
          <span className='running-text-large'>Save character Progress</span>
          <span className='running-text text-gray2'>
            You can track your character progress in "My characters".
          </span>
        </div>

        <DialogFooter className='!flex gap-4 border-t border-white/10 p-6'>
          <Button onClick={() => setOpen(false)} withIcon={true}>
            <Cancel className='w-3 h-3' fill='white' />
            Cancel
          </Button>
          <Button
            onClick={() => {
              action();
              setOpen(false);
            }}
            variant={"primary"}
            withIcon={true}
            // disabled={isLoading}
            // className={cn(isLoading && "opacity-50")}
          >
            Save
            <span className='flex items-center '>
              (
              <img
                src='/gems/Mythic.webp'
                alt='arrow-right'
                className='h-[18px] mx-1'
              />
              1)
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
