import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import Button from "@/components/ui/custom-button";
import Cancel from "@/components/ui/Icons/Cancel";
import Diamond from "@/components/ui/Icons/Diamond";
import useControlsStore from "@/utils/controlsStore";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
export default function CreditsDialogue() {
  const router = useRouter();
  const isGamePage = usePathname().includes("/game/play");
  const id = useSearchParams().get("id");

  const { showCreditsDialogue, setShowCreditsDialogue } = useControlsStore();

  return (
    <Dialog
      open={showCreditsDialogue}
      onOpenChange={(open) => {
        if (!open && isGamePage && !id) {
          router.push("/discover");
        }
        setShowCreditsDialogue(open);
      }}
    >
      <DialogContent className='bg-white/[8%] !rounded-[16px] !px-0 gap-0 text-white border border-white/10 w-[94%] sm:min-w-[472px] sm:w-auto'>
        <div className='flex flex-col gap-[11px] p-6 pt-4'>
          <span className='running-text-large'>
            You don’t have enough credits!
          </span>
          <span className='running-text text-gray2'>
            Please upgrade your plan or buy more credits to continue playing.
          </span>
        </div>

        <DialogFooter className='!flex gap-4 border-t border-white/10 p-6'>
          <Button
            onClick={() => {
              if (isGamePage && !id) {
                router.push("/discover");
              }
              setShowCreditsDialogue(false);
            }}
            withIcon={true}
          >
            <Cancel className='w-3 h-3' fill='white' />
            Cancel
          </Button>
          <Button
            onClick={() => {
              router.push("/pricing");
              setShowCreditsDialogue(false);
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
