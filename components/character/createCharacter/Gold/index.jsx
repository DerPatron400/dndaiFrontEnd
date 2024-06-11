import React, { useEffect, useState } from "react";
import Scene from "./Scene";
import { cn } from "@/lib/utils";
import { reward } from "@/lib/Helpers/character";

export default function Index({ character, setCharacter }) {
  const [rolling, setRolling] = useState(false);
  const [selectedFace, setSelectedFace] = useState(character.selectedFace);

  useEffect(() => {
    setCharacter((prev) => ({
      ...prev,
      gold: reward(selectedFace).gold,
      selectedFace,
    }));
  }, [selectedFace]);

  return (
    <div className='w-full h-full  flex flex-col mt-10 md:mt-0 justify-center  items-center text-white '>
      <div
        className={cn(
          " flex flex-col gap-8 md:gap-3 justify-center items-center ",
          selectedFace && "gap-0"
        )}
      >
        {selectedFace ? (
          <img
            src={`/images/CreateCharacter/Gold/Gold.png `}
            alt=''
            className='w-[231px] md:w-[200px] object-contain '
          />
        ) : (
          <div className='w-full h-[20vh]  md:h-[30vh] '>
            <Scene
              selectedFace={selectedFace}
              setSelectedFace={setSelectedFace}
              rolling={rolling}
              setRolling={setRolling}
            />
          </div>
        )}
        {selectedFace ? (
          <div className='flex flex-col gap-3 text-center '>
            <span className='headline-4'>
              {reward(selectedFace).message}
              <br />
              You've Rolled a {selectedFace}
            </span>
            <div
              onClick={() => setRolling(true)}
              className='flex justify-center cursor-pointer items-center gap-2'
            >
              <span className='running-text   text-gray2'>
                Starting Gold:{" "}
                <span className='text-white'>{reward(selectedFace).gold}</span>
              </span>
              <img
                src={`/images/CreateCharacter/Gold/gold-coin.png`}
                alt=''
                className=' w-[30px] object-contain'
              />
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-3'>
            <span className='headline-4'>Roll for starting gold</span>
            <div
              onClick={() => setRolling(true)}
              className='flex justify-center cursor-pointer items-center gap-2'
            >
              <img
                src='/Icons/Click.svg'
                alt=''
                className='text-gray2 w-[16px] h-[16px] invert opacity-75'
              />
              <span className='running-text   text-gray2'>
                Click the dice to roll
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
