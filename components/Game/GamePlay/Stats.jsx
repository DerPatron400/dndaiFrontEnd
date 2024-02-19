import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useGameStore from "@/utils/store/introTextStore";
import { getMaxXPForNextLevel } from "@/utils/gameLogic";
import { twMerge } from "tailwind-merge";

const CHARACTER_ATTRIBUTES = [
  "Hit Points",
  "HP",
  "lvl",
  "AC",
  "Max AC",
  "Max HP",
  "Race",
  "Class",
  "XP",
  "Armor Class",
  "Experience Points",
  "Skills",
  "Level",
  "Feats",
];

// Define a function to calculate the percentage for the progress bar
const calculatePercentage = (value, maxValue) => {
  return (value / maxValue) * 100 + "%";
};

const ProgressBarStat = ({ name, value, maxValue = 100 }) => {
  return (
    <div className='flex items-center gap-x-4 '>
      <div className='flex gap-x-2 w-24'>
        <p>{name}</p>
      </div>
      {/* Progress bar for Hit Points */}
      <div className='h-4 w-2/4 bg-gray-200 rounded-full overflow-hidden'>
        <div
          className={twMerge(
            "h-full text-xs bg-gradient-to-t from-green-950   text-white font-[300] flex items-center justify-center",
            name === "Hit Points" ? "to-blue-500" : "to-slate-300"
          )}
          style={{
            width: calculatePercentage(parseInt(value), parseInt(maxValue)),
          }}
        >
          {value}
        </div>
      </div>
      <div>{maxValue}</div>
    </div>
  );
};

const StatText = ({ key = "1", name, value }) => {
  return (
    <div key={key}>
      <div className='flex gap-x-2'>
        <p>{name}:</p>
        <p>{value}</p>
      </div>
    </div>
  );
};

const StatsHeader = () => {
  return (
    <div className='absolute -top-0 z-[10] w-full h-full flex items-center justify-center'>
      <div className='absolute top-0 right-30'>
        <img src='/heading.png' alt='heading' className='w-40 h-20 ' />
        <span className='absolute poppins top-1/2 left-1/2 transform font-semibold -translate-x-1/2 -translate-y-[55%] text-white text-2xl'>
          Stats
        </span>
      </div>
    </div>
  );
};
export default function Stats({ stats, show, setShow }) {
  const { character } = useGameStore((state) => state);

  // Convert the stats array to an object
  const statsObject = stats.reduce((acc, stat) => {
    acc[stat.name] = stat.value;
    return acc;
  }, {});

  return (
    <Transition.Root show={show}>
      <Dialog
        as='div'
        className='relative z-1 w-full '
        onClose={() => {
          setShow(false);
        }}
      >
        <div className='fixed inset-0 z-10 w-screen overflow-y-auto '>
          <div className='flex  min-h-full min-w-full items-center justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative  w-[95vw] md:w-[85vw] lg:w-[70vw] h-[95vh] md:h-[80vh] xl:h-full transform overflow-hidden rounded-lg bg-transparent text-left transition-all sm:my-8  '>
                <div className='relative  h-full w-full    flex items-center  justify-center stats-container'>
                  <img
                    src='/images/stats/webBoard.png'
                    alt=''
                    className='w-full h-full object-fill '
                  />
                  <StatsHeader />
                  {/* Section for displaying stats */}
                  <div className='flex flex-col md:justify-between text-sm md:text-base   text-white  gap-4 p-4 w-[90%] md:w-[80%] h-[80%] md:h-3/4 absolute top-14 left-[50%] translate-x-[-48%]'>
                    <div className='grid grid-cols-1 md:grid-cols-2 content-center  gap-x-10 h-full flex-1 items-center'>
                      {/** First Section */}
                      <div className='col-span-1 flex flex-col gap-y-2'>
                        <ProgressBarStat
                          name='Hit Points'
                          value={statsObject["HP"]}
                          maxValue={statsObject["Max HP"]}
                        />
                        <ProgressBarStat
                          name='Armor Class'
                          value={statsObject["AC"]}
                          maxValue={statsObject["Max AC"]}
                        />
                        <StatText name='Skills' value={statsObject["Skills"]} />

                        <StatText name='Class' value={statsObject["Class"]} />

                        <StatText name='Race' value={statsObject["Race"]} />

                        <StatText name='Feats' value={statsObject["Feats"]} />
                      </div>
                      {/* Second Section */}
                      <div className='col-span-1 flex flex-col gap-y-2 mt-2 md:mt-0'>
                        {Object.entries(statsObject)
                          .filter(
                            ([key]) => !CHARACTER_ATTRIBUTES.includes(key)
                          )
                          .map(([key, value]) => (
                            <StatText key={key} name={key} value={value} />
                          ))}
                      </div>
                    </div>
                    <div className='flex flex-col gap-y-5'>
                      <div className='flex dragon-hunter  tracking-wide justify-center items-center text-2xl'>
                        <h1>{character}</h1>
                      </div>
                      {/* Section for displaying Experience points progress bar */}
                      <div className='flex h-5 w-full md:w-3/4 mx-auto items-center justify-center  text-[14px]'>
                        <div className=' w-16 md:w-24 -me-10 h-auto relative '>
                          <img
                            src='/images/stats/label.png'
                            alt='w-full object-contain'
                          />
                          <span className='absolute text-sm md:text-base lg:text-lg flex items-center justify-center top-1/2 left-1/2 transform -translate-x-[48%]   -translate-y-1/2 text-white '>
                            XP
                          </span>
                        </div>

                        <div className='h-6 flex-1 bg-gray-200 rounded-md  overflow-hidden'>
                          <div
                            className='h-full bg-gradient-to-t from-green-950  to-red-500 text-white font-[300] flex items-center justify-center'
                            style={{
                              width: calculatePercentage(
                                statsObject["XP"],
                                getMaxXPForNextLevel(
                                  parseInt(statsObject["lvl"]) + 1
                                )
                              ),
                            }}
                          >
                            {parseInt(statsObject["XP"])}
                          </div>
                        </div>

                        <div className=' w-16 md:w-24 h-auto -ms-10 relative '>
                          <img
                            src='/images/stats/label.png'
                            alt='w-full object-contain'
                          />
                          <span className='absolute text-sm md:text-base lg:text-lg flex items-center justify-center top-1/2 left-1/2 transform -translate-x-[48%]   -translate-y-1/2 text-white '>
                            L{statsObject["lvl"]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
