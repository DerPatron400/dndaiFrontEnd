import React, { useEffect, useState } from "react";
import Scene from "./Scene";
import { cn } from "@/lib/utils";
import { reward } from "@/lib/Helpers/character";
import DiceBox from "@3d-dice/dice-box";
import { color } from "framer-motion";
import useCharacterStore from "@/utils/characterStore";

export default function Index({ character, setCharacter }) {
  const [rolling, setRolling] = useState(false);
  const { selectedFace, setSelectedFace } = useCharacterStore();
  const [diceBox, setDiceBox] = useState(null);

  useEffect(() => {
    const _diceBox = new DiceBox("#dice-box", {
      assetPath: "/assets/dice-box", // required
      theme: "default", // optional
      enableShadows: true, // optional
      themeColor: "#242e9e", // optional
      scale: 8,
      lightIntensity: 1,
      shadowIntensity: 2,
    });
    setDiceBox(_diceBox);
  }, []);

  const handleRollDice = () => {
    diceBox.init().then(() => {
      diceBox.roll("1d20").then((result) => {
        console.log(result);
        setSelectedFace(result[0].value);
      });

      console.log("here");
    });
  };

  useEffect(() => {
    if (!selectedFace) return;
    setCharacter((prev) => ({
      ...prev,
      gold: reward(selectedFace).gold,
      selectedFace,
    }));
  }, [selectedFace]);

  return (
    <>
      <div className='w-full h-screen top-0 md:top-0  fixed left-0  flex flex-col mb-20 md:mb-0 justify-center  items-center text-white '>
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
                  <span className='text-white'>
                    {reward(selectedFace).gold}
                  </span>
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
                onClick={() => {
                  handleRollDice();
                }}
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
    </>
  );
}
