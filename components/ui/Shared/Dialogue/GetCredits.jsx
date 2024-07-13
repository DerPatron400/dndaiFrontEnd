import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import Button from "@/components/ui/custom-button";
import { cn } from "@/lib/utils";
import Cancel from "@/components/ui/Icons/Cancel";
import Diamond from "@/components/ui/Icons/Diamond";

export default function GetCredits({ children, action }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='bg-white/[8%] !rounded-[16px] !px-0 gap-0 text-white border border-white/10 !w-auto sm:min-w-[472px]'>
        <div className='flex flex-col gap-[11px] p-6 pt-4'>
          <span className='running-text-large'>
            You don’t have enough credits!
          </span>
          <span className='running-text text-gray2'>
            Please upgrade your plan or buy more credits to continue playing.
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
            variant={"upgrade"}
            withIcon={true}

            // disabled={isLoading}
            // className={cn(isLoading && "opacity-50")}
          >
            <Diamond className='w-5 h-5' fill='white' />
            Upgrade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
