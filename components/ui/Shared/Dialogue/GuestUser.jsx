import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import Button from "@/components/ui/custom-button";
import Cancel from "@/components/ui/Icons/Cancel";
import Delete from "@/components/ui/Icons/Delete";
import { useSearchParams } from "next/navigation";
import CustomIconbutton from "../../custom-iconbutton";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Benefit = ({ text }) => {
  return (
    <div className='flex items-center gap-2'>
      <img src='/Icons/Success.svg' alt='Success' className=' h-5 w-5' />
      {text}
    </div>
  );
};

export default function GuestUser({ children, action }) {
  const showGuestDialogue = useSearchParams().get("showGuestDialogue");

  const [open, setOpen] = useState(showGuestDialogue);
  const router = useRouter();
  const pathname = usePathname();

  const closeModal = () => {
    router.push(pathname);
    setOpen(false);
  };
  console.log(showGuestDialogue);
  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className='bg-white/[8%] gap-6 p-6 pt-4 !rounded-[16px]  text-white border border-white/10 !w-[94%] sm:min-w-[320px]'>
        <div className='flex flex-col gap-4 '>
          <span className='running-text-large'>Lets Get Started!</span>
          <CustomIconbutton
            onClick={closeModal}
            className={"h-6 w-6 absolute top-4 right-4"}
          >
            <Cancel className='w-2 h-2 fill-white' fill='white' />
          </CustomIconbutton>
          <Button
            onClick={() => router.push("/game/campaign-selection")}
            variant={"primary"}
            className={"w-fit"}
          >
            Play now as a guest
          </Button>
        </div>
        <div className='flex flex-col gap-4'>
          <span>
            Or sign up
            <span className='text-successGreen'> for free </span>
            to recieve:
          </span>
          <div className='flex flex-col text-gray2 gap-1'>
            <Benefit
              text={
                <span className='flex items-center gap-1.5'>
                  5{" "}
                  <img
                    src='/gems/Legendary.webp'
                    alt=''
                    className='h-[18px] object-contain '
                  />
                </span>
              }
            />
            <Benefit
              text={
                <span className='flex items-center gap-1.5'>
                  500{" "}
                  <img
                    src='/gems/Mythic.webp'
                    alt=''
                    className='h-[18px] object-contain '
                  />
                </span>
              }
            />
            <Benefit text={"Custom Character Portrait"} />
            <Benefit text={"Save your character progression"} />
          </div>
        </div>
        <Button
          className={"w-fit"}
          onClick={() => router.push("/auth/sign-up")}
        >
          Sign up for free
        </Button>
      </DialogContent>
    </Dialog>
  );
}
