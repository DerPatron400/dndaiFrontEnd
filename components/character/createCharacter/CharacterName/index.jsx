import CustomInput from "@/components/ui/custom-input";
import React from "react";
import CustomButton from "@/components/ui/custom-button";
import { getRandomName } from "@/lib/Helpers/character";
import useCharacterStore from "@/utils/characterStore";
export default function index({ character, setCharacter }) {
  const { characterNameError, setCharacterNameError } = useCharacterStore();
  const handleRandomCharacterName = async () => {
    const name = getRandomName();
    setCharacter((prev) => ({
      ...prev,
      name,
    }));
    setCharacterNameError(false);
  };
  return (
    <div className='flex h-screen fixed top-[156px] left-0 px-6 w-full flex-col gap-5'>
      <img
        src={`/images/CreateCharacter/CharacterName/CharacterName.png`}
        alt=''
        className='w-full h-[248px] rounded-[16px]  object-cover'
      />
      <div className='flex flex-col gap-1'>
        {" "}
        <CustomInput
          value={character.name}
          icon={
            character.name && (
              <img
                src='/Icons/Success.svg'
                alt='Success'
                className=' h-4 w-4'
              />
            )
          }
          onChange={(value) => {
            if (value) setCharacterNameError(false);
            else setCharacterNameError(true);
            if (value.length <= 32)
              setCharacter((prev) => ({ ...prev, name: value }));
          }}
          placeholder='CHARACTER NAME'
          className={"w-full"}
        />
        {characterNameError && (
          <span className='text-errorRed uppercase font-roboto-mono  text-[10px] '>
            Please enter a character name
          </span>
        )}
      </div>

      <CustomButton withIcon onClick={handleRandomCharacterName}>
        <img src='/Icons/Random.svg' alt='logo' className='h-5 w-5 ' />
        RANDOM CHARACTER Name
      </CustomButton>
    </div>
  );
}
