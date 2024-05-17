import CustomInput from "@/components/ui/custom-input";
import React from "react";

export default function index({ character, setCharacter }) {
  return (
    <div className='flex flex-col gap-5'>
      <img
        src={`/images/CreateCharacter/CharacterName/CharacterName.png`}
        alt=''
        className='w-full rounded-[16px]  object-contain'
      />
      <CustomInput
        value={character.name}
        icon={
          character.name && (
            <img src='/Icons/Success.png' alt='Success' className=' h-4 w-4' />
          )
        }
        onChange={(value) => setCharacter((prev) => ({ ...prev, name: value }))}
        placeholder='CHARACTER NAME'
        className={"w-full"}
      />
    </div>
  );
}
