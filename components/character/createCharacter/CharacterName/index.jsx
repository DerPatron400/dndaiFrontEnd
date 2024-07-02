import CustomInput from "@/components/ui/custom-input";
import React from "react";
import CustomButton from "@/components/ui/custom-button";
import { getRandomName } from "@/lib/Helpers/character";
export default function index({ character, setCharacter }) {
  const handleRandomCharacterName = async () => {
    const name = getRandomName();
    setCharacter((prev) => ({
      ...prev,
      name,
    }));
  };
  return (
    <div className='flex h-screen fixed top-[200px] left-0 px-6 w-full flex-col gap-5'>
      <img
        src={`/images/CreateCharacter/CharacterName/CharacterName.png`}
        alt=''
        className='w-full h-[248px] rounded-[16px]  object-cover'
      />
      <CustomInput
        value={character.name}
        icon={
          character.name && (
            <img src='/Icons/Success.svg' alt='Success' className=' h-4 w-4' />
          )
        }
        onChange={(value) => setCharacter((prev) => ({ ...prev, name: value }))}
        placeholder='CHARACTER NAME'
        className={"w-full"}
      />
      <CustomButton withIcon onClick={handleRandomCharacterName}>
        <img src='/Icons/Random.svg' alt='logo' className='h-5 w-5 ' />
        RANDOM CHARACTER Name
      </CustomButton>
    </div>
  );
}
