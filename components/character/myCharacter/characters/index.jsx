import React from "react";
import Card from "../../../ui/Shared/Card/character";
import { cn } from "@/lib/utils";
import CustomButton from "@/components/ui/custom-button";
import AddUser from "@/components/ui/Icons/AddUser";
import CharacterTabBar from "@/components/ui/Shared/TabBar/general";
import { useRouter } from "next/navigation";
import Character from "@/components/ui/Shared/Placeholder/character";
export default function characters({ characters = [], className }) {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/character/create");
  };
  return (
    <div
      className={cn(
        "h-full min-h-screen w-screen px-5 md:px-[48px] pt-[120px] md:pt-[128px] pb-5 ",
        className
      )}
    >
      <div className=' flex flex-col gap-[20px] justify-start pt-8 md:pt-0 '>
        <div className='md:flex w-full items-center justify-between hidden'>
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
            <Character className={" h-[50vh] col-span-12  w-full relative"} />
          )}
        </div>
        <CharacterTabBar />
      </div>
    </div>
  );
}
