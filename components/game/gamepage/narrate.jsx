import React, { useState, useRef, useEffect } from "react";
import { DialogContent } from "@/components/ui/dialog";
import CustomButton from "@/components/ui/custom-button";
import CustomDropdown from "@/components/ui/custom-dropdown";
import useGameStore from "@/utils/gameStore";
import useUserStore from "@/utils/userStore";
import { textToSpeech } from "@/actions/game";
import { getCredits } from "@/actions/character";
import Cancel from "@/components/ui/Icons/Cancel";
import Pause from "@/components/ui/Icons/Pause";
import Play from "@/components/ui/Icons/Play";

const VOICES = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"];

export default function Narrate({
  setOpen,
  setAudio,
  setNarrate,
  narrate,
  loading,
  setLoading,
}) {
  const [selectedVoice, setSelectedVoice] = useState(VOICES[0]);
  const { game } = useGameStore();
  const { user, setYellowCredits, setBlueCredits } = useUserStore();

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

  const reset = () => {
    //reset progress
    setProgress(0);
    setIsPlaying(false);
  };
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    reset();
  }, [selectedVoice]);
  const handleNarrate = async () => {
    try {
      audioRef?.current?.pause();
      setLoading(true);
      setOpen(false);
      setIsPlaying(false);
      setNarrate(true);

      const payload = {
        voice: selectedVoice.toLowerCase(),
        input: game.state,
      };

      const url = await textToSpeech(payload, user?.token);
      const { credits } = await getCredits(user?.token);

      setYellowCredits(credits.yellowCredits);

      setBlueCredits(credits.blueCredits);
      setAudio(url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (game && narrate) {
      handleNarrate();
    }
  }, [game]);
  return (
    <DialogContent className='bg-white/[8%] h-fit px-0 pb-0 pt-4 !rounded-[16px] text-white border border-white/10 w-fit '>
      <div className='flex px-6 flex-col gap-2'>
        <span className='running-text-large'>
          Enhance Your Story with Narration?
        </span>
      </div>
      <div className='flex mx-6 flex-col gap-2 pb-4 p-4 bg-white/[8%] rounded-[16px] border border-white/10 '>
        <span className='running-text w-full'>Choose narraters voice</span>
        <CustomDropdown
          className={"!w-full !min-w-full"}
          placeholder={"Voice"}
          selectedOption={selectedVoice}
          setSelectedOption={(option) => setSelectedVoice(option)}
          options={VOICES}
        />
        <div className='flex items-center w-[98%] space-x-3 mt-3'>
          <div className='cursor-pointer' onClick={togglePlayPause}>
            {isPlaying ? (
              <Pause className='h-5 w-5 fill-white hover:fill-gray1 active:fill-gray2' />
            ) : (
              <Play className='h-5 w-5 fill-white hover:fill-gray1 active:fill-gray2' />
            )}
          </div>
          <div
            className='custom-progress-bar flex-grow h-[1px] bg-gray-300 rounded relative cursor-pointer'
            ref={progressBarRef}
            onClick={handleProgressBarClick}
          >
            <div
              className='bg-gray2 h-full rounded'
              style={{ width: `${progress}%` }}
            ></div>
            <div
              className='custom-progress-handle w-4 h-4 border ease-animate duration-150 bg-[#2C2C3F] rounded-full absolute top-1/2 transform -translate-y-1/2 cursor-pointer'
              style={{ left: `${progress - 2}%` }}
              onMouseDown={handleMouseDown}
            ></div>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        src={`/audio/voiceModels/${selectedVoice}.wav`}
        className='w-full '
      />

      <div className='text-gray2 px-6 flex items-center'>
      Text will be read aloud by voice of choice. Costs (
        <img
          src='/gems/Mythic.webp'
          alt=''
          className='h-[18px] mx-1 object-contain '
        />
        2) additional
      </div>

      <div className='flex p-6 justify-end gap-4  border-white/10 border-t '>
        <CustomButton
          disabled={loading}
          onClick={() => setOpen(false)}
          withIcon
        >
          <Cancel className='h-3 w-3  fill-white opacity-70' />
          <span className='running-text-mono text-white'>CANCEL</span>
        </CustomButton>
        <CustomButton
          disabled={loading}
          onClick={handleNarrate}
          withIcon
          variant={"primary"}
        >
          <img
            src='/Icons/Narrate.svg'
            alt=''
            className='h-4 w-4 opacity-70 invert'
          />
          <span className='running-text-mono text-black'>Narrate</span>
        </CustomButton>
      </div>
    </DialogContent>
  );
}
