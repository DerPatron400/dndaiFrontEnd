import React from "react";
import Card from "@/components/ui/Shared/Card/character";
import CustomButton from "@/components/ui/custom-button";
import useGameStore from "@/utils/gameStore";
import { useRouter } from "next/navigation";
import GeneralGameTabbar from "@/components/ui/Shared/TabBar/generalGame";

export default function index({ characters }) {
  const { currentCampaign } = useGameStore();
  const router = useRouter();

  const handleRedirection = () => {
    router.push("/character/create");
  };

  console.log(currentCampaign);

  return (
    <div className='border-white gap-8 w-full flex flex-col pt-[86px] md:pt-[128px] z-[10] text-white relative px-6 lg:px-12 md:pb-64'>
      <div className='flex justify-center items-center relative'>
        <h1 className='headline-3 text-center w-3/4 md:w-1/2'>
          Begin your journey by selecting{" "}
          <span className='text-irisPurpleLight'>your hero!</span>
        </h1>

        <CustomButton
          onClick={handleRedirection}
          className={"hidden md:flex absolute top-1/2 -translate-y-1/2 right-0"}
        >
          <img src='/Icons/CreateCharacter.svg' alt='' />
          Create character
        </CustomButton>
      </div>
      <div className='w-full grid place-items-center grid-cols-12 gap-[20px]'>
        {characters.map((character, index) => (
          <Card loadGameOnClick={true} key={index} character={character} />
        ))}
      </div>
      <GeneralGameTabbar />
    </div>
  );
}
