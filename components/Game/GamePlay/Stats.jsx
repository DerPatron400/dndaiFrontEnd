import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";

export default function Stats({ stats }) {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Convert the stats array to an object
  const statsObject = stats.reduce((acc, stat) => {
    acc[stat.name] = stat.value;
    return acc;
  }, {});

  // Define a function to calculate the percentage for the progress bar
  const calculatePercentage = (value, maxValue) => {
    return (value / maxValue) * 100 + "%";
  };

  return (
    <Transition.Root show={true}>
      <Dialog
        as="div"
        className="relative z-1 w-full "
        onClose={() => {
          console.log("closed");
        }}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
          <div className="flex  min-h-full min-w-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative dragon-hunter tracking-wider min-w-[70vw] h-full transform overflow-hidden rounded-lg bg-transparent text-left transition-all sm:my-8 sm:w-1/2 md:min-w-[60vw] ">
                {!isMobile ? (
                  <div className="relative">
                    <img src="/webBoard.png" alt="" className="w-full " />
                    <div className="absolute top-10 w-full h-full flex items-center justify-center">
                      <div className="absolute top-0 right-30">
                        <img
                          src="/heading.png"
                          alt="heading"
                          className="w-40 h-20 "
                        />
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl">
                          Stats
                        </span>
                      </div>
                    </div>
                    {/* Section for displaying stats */}
                    <div className="flex flex-col justify-center text-white gap-4 p-4 w-3/4 h-2/4 absolute top-28 left-28">
                      <div className="flex justify-between text-sm">
                        {/** First Section */}
                        <div>
                          <div>
                            <div className="flex gap-x-2">
                              <p>Hit Points:</p>
                              <p>{statsObject["Hit Points"]}</p>
                            </div>
                            {/* Progress bar for Hit Points */}
                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-red-600"
                                style={{
                                  width: calculatePercentage(
                                    statsObject["Hit Points"],
                                    100
                                  ),
                                }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex gap-x-2">
                              <p>Armor Class:</p>
                              <p>{statsObject["Armor Class"]}</p>
                            </div>
                            {/* Progress bar for Armor Class */}
                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500"
                                style={{
                                  width: calculatePercentage(
                                    statsObject["Armor Class"],
                                    100
                                  ),
                                }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex gap-x-2">
                              <p>Skills:</p>
                              <p>{statsObject["Skills"]}</p>
                            </div>
                          </div>
                          <div>
                            <div className="flex gap-x-2">
                              <p>Level:</p>
                              <p>{statsObject["Level"]}</p>
                            </div>
                          </div>
                          <div>
                            <div className="flex gap-x-2">
                              <p>Spell:</p>
                              <p>{statsObject["Spell"]}</p>
                            </div>
                          </div>
                        </div>
                        {/* Second Section */}
                        <div>
                          {Object.entries(statsObject)
                            .filter(
                              ([key]) =>
                                ![
                                  "Hit Points",
                                  "Armor Class",
                                  "Experience Points",
                                ].includes(key)
                            )
                            .map(([key, value]) => (
                              <div key={key}>
                                <div className="flex gap-x-2">
                                  <p>{key}:</p>
                                  <p>{value}</p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        <h1>Character Name</h1>
                      </div>
                      {/* Section for displaying Experience points progress bar */}
                      <div className="flex h-5 items-center justify-center gap-x-2 text-[14px]">
                        <div className="w-24 h-20 relative">
                          <img src="/label.png" alt="w-full" />
                          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl">
                            XP
                          </span>
                        </div>

                        <div className="w-3/4 h-1 flex-1 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-500"
                            style={{
                              width: calculatePercentage(
                                statsObject["Experience Points"],
                                100
                              ),
                            }}
                          ></div>
                        </div>

                        <div className="w-24 h-20 relative">
                          <img src="/label.png" alt="w-full" />
                          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl">
                            {statsObject["Level"]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <img src="/board.png" alt="" className="w-full " />
                    <div className="absolute top-12 w-full h-full flex items-center justify-center">
                      <div className="absolute top-0 right-30">
                        <img
                          src="/heading.png"
                          alt="heading"
                          className="w-40 h-20 "
                        />
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-xl">
                          Stats
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 p-4 absolute top-28 left-16 text-[10px] ">
                      {stats.map((stat, index) => (
                        <div key={index} className="flex items-center gap-x-2">
                          <span className="text-white font-semibold">
                            {stat.name}:
                          </span>
                          <span className="text-green-400 ">{stat.value}</span>
                          {/* Render progress bar for Level */}
                          {stat.name === "Level" && (
                            <div className="h-2 w-36 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-green-400"
                                style={{
                                  width: calculatePercentage(
                                    parseInt(stat.value),
                                    10
                                  ),
                                }} // Assuming max level is 10
                              ></div>
                            </div>
                          )}
                          {/* You can add similar logic for other stats if needed */}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
