import React from "react";
import Card from "../../../ui/Shared/Card/character";
import { cn } from "@/lib/utils";
import CustomButton from "@/components/ui/custom-button";
import AddUser from "@/components/ui/Icons/AddUser";
import CharacterTabBar from "@/components/ui/Shared/TabBar/character";
import { useRouter } from "next/navigation";
export default function characters({ characters = [], className }) {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/character/create");
  };
  return (
    <div
      className={cn(
        "h-full min-h-screen w-screen px-5 md:px-[48px] py-[120px] md:py-[128px] ",
        className
      )}
    >
      <div className=' flex flex-col gap-[20px] justify-start '>
        <div className='flex w-full items-center justify-between'>
          <span className='headline-3 z-[10]  '>
            My characters
            <span className='text-gray2 ms-3 md:ms-4 font-roboto-mono transform translate-up text-[17px] md:text-[24px] translate-y-[-15px] md:translate-y-[-20px]'>
              ({characters.length})
            </span>
          </span>

          <CustomButton
            onClick={handleRedirect}
            withIcon={true}
            className={"hidden md:flex"}
          >
            <AddUser className='h-5 w-5 opacity-70 fill-white' />
            Create character
          </CustomButton>
        </div>
        <div className=' w-full grid grid-cols-12 gap-[20px]'>
          {characters.map((_, index) => (
            <Card hideShowDetails={true} character={_} key={index} />
          ))}

          {characters.length <= 0 && (
            <span className='text-gray2 headline-4 h-96 flex items-center justify-center col-span-12 text-center'>
              You have no characters yet
            </span>
          )}
        </div>
        <CharacterTabBar />
      </div>
    </div>
  );
}
