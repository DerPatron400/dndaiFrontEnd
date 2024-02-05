import React, { useEffect, useRef } from "react";
import { Select, Tooltip } from "@radix-ui/themes";
import useIntroTextStore from "@/utils/store/introTextStore";
import { twMerge } from "tailwind-merge";

const Input = ({ input, setInput }) => {
  const textAreaRef = useRef(null);
  // useEffect(() => {
  //   if (textAreaRef.current)
  //     textAreaRef.current.addEventListener("input", function () {
  //       if (this.value.length < 20) {
  //         this.style.height = "1px !important";
  //         return;
  //       }
  //       this.style.height = "auto"; // Reset height
  //       this.style.height = this.scrollHeight + "px"; // Set new height
  //       this.style.overflowY = "hidden";
  //     });
  // }, [textAreaRef.current]);
  return (
    <div className='flex flex-col items-end'>
      <textarea
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter your choice'
        className='bg-transparent border  px-3 h-14 w-full md:w-64 placeholder:text-[#d3d3d3] text-white py-2 rounded'
        ref={textAreaRef}
        maxLength={100}
      />
      <p className='text-xs text-white mt-1 opacity-60'>{input.length}/100</p>
    </div>
  );
};

//selection component
const Selection = ({ selection, setSelection }) => {
  return (
    <Select.Root onValueChange={(value) => setSelection(value)}>
      <Select.Trigger
        className='z-[50] w-32 md:!w-[20rem]  placeholder:!text-white !text-white !border !py-1 !px-2 !border-white !rounded-md'
        placeholder='Pick a Style'
      />
      <Select.Content className='z-[50] !bg-black !text-white h-full overflow-scroll '>
        <Select.Item value='Art Nouveau'>Art Nouveau</Select.Item>
        <Select.Item value='Anime'>Anime</Select.Item>
        <Select.Item value='Pixel Art'>Pixel Art</Select.Item>
        <Select.Item value='Line Art'>Line Art</Select.Item>
        <Select.Item value='Steam Punk'>Steam Punk</Select.Item>
        <Select.Item value='Blender Render'>Blender Render</Select.Item>
        <Select.Item value='Low-Poly Art'>Low-Poly Art</Select.Item>
        <Select.Item value='Psychedelic Art'>Psychedelic Art</Select.Item>
        <Select.Item value='Neon Art'>Neon Art</Select.Item>
        <Select.Item value='Airbrush Art'>Airbrush Art</Select.Item>
        <Select.Item value='Origami'>Origami</Select.Item>
        <Select.Item value='Wood carving'>Wood carving</Select.Item>
        <Select.Item value='Oil Painting'>Oil Painting</Select.Item>
        <Select.Item value='Silhouette illustration'>
          Silhouette illustration
        </Select.Item>
        <Select.Item value='Blueprint'>Blueprint</Select.Item>
        <Select.Item value='American Impressionism'>Impressionism</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

const Choice = ({
  buttonText,
  title,
  isInput,
  onClick,
  input = "",
  savedGame = false,
  setInput = null,
  paths = [],
}) => {
  const handleClick = (path, index) => {
    if (
      path.heading.toLowerCase().includes("free") &&
      path.heading.toLowerCase().includes("choice")
    ) {
      setInput("");
      return;
    } else {
      setInput(path.content);
    }
  };
  return (
    <div className='flex flex-col items-center flex-1 h-full'>
      <div
        className={twMerge(
          "flex items-center w-[43vw] md:w-full justify-between h-full py-10 flex-1 flex-col ",
          isInput ? "gap-y-6" : "gap-y-24"
        )}
      >
        <div className='flex flex-col gap-y-4 items-center flex-1 justify-center'>
          <div className='grid sm:grid-cols-2 grid-col-1 gap-2 items-center flex-wrap w-full mx-auto justify-center'>
            {paths.map((path, index) => (
              <Tooltip
                className='z-[50] w-64 '
                key={index}
                content={path.content}
              >
                <button
                  onClick={() => {
                    handleClick(path, index);
                  }}
                  className=' text-sm bg-gradient-to-t from-green-950 to-green-500 text-white px-2 z-[4] py-2 rounded-md hover:to-green-700 hover:from-green-400 transition-colors duration-300 ease-in-out '
                >
                  {path.heading.replaceAll("_", " ").replaceAll("*", "")}
                </button>
              </Tooltip>
            ))}
          </div>
          <div className='flex md:flex-row flex-col items-center gap-x-2'>
            {isInput ? (
              <Input input={input} setInput={setInput} />
            ) : (
              <Selection selection={input} setSelection={setInput} />
            )}

            <button
              type='button'
              className='justify-center mt-2 w-32 items-center flex  md:mt-0 h-10 text-sm bg-gradient-to-t from-green-950 to-green-500 text-white px-2 z-[4] py-3 rounded-md hover:to-green-700 hover:from-green-400 transition-colors duration-300 ease-in-out  '
              onClick={onClick}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choice;
