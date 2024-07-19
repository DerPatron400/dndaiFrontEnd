import React, { useRef, useState, useEffect } from "react";
import Stop from "@/components/ui/Icons/Stop";
import Pause from "@/components/ui/Icons/Pause";
import Play from "@/components/ui/Icons/Play";
import { cn } from "@/lib/utils";
import Loader from "@/components/ui/Loader";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import CustomButton from "@/components/ui/custom-button";

export default function NarrationControls({
  audio,
  narrate,
  setNarrate,
  loading,
}) {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleTimeUpdate = () => {
    if (!isDragging) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      const percent = (current / duration) * 100;
      setProgress(percent);
    }
  };

  const handleProgressBarClick = (e) => {
    const rect = progressBarRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const totalWidth = rect.width;
    let percent = (offsetX / totalWidth) * 100;
    percent = Math.min(100, Math.max(0, percent)); // Clamp between 0 and 100
    const newTime = (audioRef.current.duration / 100) * percent;
    audioRef.current.currentTime = newTime;
    setProgress(percent);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const reset = () => {
    //reset progress
    setProgress(0);

    setIsPlaying(true);
  };

  useEffect(() => {
    reset();
  }, [audio]);

  const handleMouseMove = (e) => {
    if (isDragging) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const totalWidth = rect.width;
      let percent = (offsetX / totalWidth) * 100;
      percent = Math.min(100, Math.max(0, percent)); // Clamp between 0 and 100
      const newTime = (audioRef.current.duration / 100) * percent;
      audioRef.current.currentTime = newTime;
      setProgress(percent);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const stopNarration = () => {
    if (!audioRef.current.paused) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    setNarrate(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);
  return (
    <>
      {/* Desktop */}
      {loading && (
        <Loader
          className={
            "absolute h-[212px] w-[245px] border-white/10 bg-transparent rounded-[16px] items-center justify-center border right-0 bottom-full hidden lg:flex  -translate-y-3 "
          }
          text='Loading narrative ...'
        />
      )}
      {/* Mobile */}
      {loading && (
        <div className='flex items-center justify-center uppercase running-text-mono lg:hidden'>
          Loading Narrative ...
        </div>
      )}
      <div
        className={cn(
          "lg:absolute h-auto w-full lg:w-[245px] border-white/10 rounded-[16px] lg:border gap-5 right-0 bottom-full flex lg:flex-col lg:p-5   lg:-translate-y-3 ",
          (!audio || !narrate) && "hidden border-0",
          loading && "border-0"
        )}
      >
        <div
          className={cn("lg:flex flex-col gap-3 hidden", loading && "hidden")}
        >
          <span className='headline-4'>Narration</span>
          <span className='text-gray2 running-text-small'>
            Text will be read aloud. Costs
            <img
              src='/gems/Mythic.webp'
              alt=''
              className='h-5  mx-1 object-contain'
              style={{ display: "inline", verticalAlign: "middle" }}
            />
            2 additional per turn
          </span>
        </div>
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          src={audio}
          autoPlay
          className='w-full '
        />
        <div
          className={cn(
            "flex items-center flex-1 space-x-3",
            loading && "hidden"
          )}
        >
          <div className='cursor-pointer' onClick={togglePlayPause}>
            {isPlaying ? (
              <Pause className='h-5 w-5 fill-white hover:fill-gray1 active:fill-gray2' />
            ) : (
              <Play className='h-5 w-5 fill-white hover:fill-gray1 active:fill-gray2' />
            )}
          </div>
          <div
            className='custom-progress-bar flex-grow flex-1 h-[1px] bg-gray-300 rounded relative cursor-pointer'
            ref={progressBarRef}
            onClick={handleProgressBarClick}
          >
            <div
              className='bg-gray2 h-full rounded'
              style={{ width: `${progress}%` }}
            ></div>
            <div
              className='custom-progress-handle w-4 h-4 border  bg-[#2C2C3F] rounded-full absolute top-1/2 transform -translate-y-1/2 cursor-pointer'
              style={{ left: `${progress}%` }}
              onMouseDown={handleMouseDown}
            ></div>
          </div>
        </div>
        <CustomButton
          className={cn("lg:self-start md:pb-0 lg:h-auto", loading && "hidden")}
          onClick={stopNarration}
          withIcon={true}
          variant='subtle'
        >
          <Stop className='h-5 w-5 fill-errorRed' />
          <span className='hidden lg:block'>Stop Narrating</span>
          <span className='lg:hidden'>Stop </span>
        </CustomButton>
      </div>
    </>
  );
}
