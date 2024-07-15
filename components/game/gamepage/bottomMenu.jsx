import React, { useState, useRef, useEffect } from "react";
import CustomButton from "@/components/ui/custom-button";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Step1 from "./steps/step1";
import ImageZoom from "./imageZoom";
import Narrate from "./narrate";
import Stop from "@/components/ui/Icons/Stop";
import Pause from "@/components/ui/Icons/Pause";
import Play from "@/components/ui/Icons/Play";
import { cn } from "@/lib/utils";
import Save from "@/components/ui/Icons/Save";
import { saveCharacter } from "@/actions/game";
import useGameStore from "@/utils/gameStore";
import useUserStore from "@/utils/userStore";
import useCustomToast from "@/hooks/useCustomToast";
import Loader from "@/components/ui/Loader";
import SaveCharacterDialogue from "@/components/ui/Shared/Dialogue/SaveCharacter";
const NarrationControls = ({ audio, narrate, setNarrate, loading }) => {
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
      {loading && (
        <Loader
          className={
            "absolute h-[212px] w-[245px] border-white/10 bg-transparent rounded-[16px] items-center justify-center border right-0 bottom-full flex  -translate-y-3 "
          }
          text='Loading narrative ...'
        />
      )}
      <div
        className={cn(
          "absolute h-auto w-[245px] border-white/10 rounded-[16px] border gap-5 right-0 bottom-full flex flex-col p-5  -translate-y-3 ",
          (!audio || !narrate) && "hidden border-0",
          loading && "border-0"
        )}
      >
        <div className={cn("flex flex-col gap-3", loading && "hidden")}>
          <span className='headline-4'>Narration</span>
          <span className='text-gray2 running-text-small'>
            Each created text-block of narration costs
            <img
              src='/gems/Mythic.webp'
              alt=''
              className='h-5  mx-1 object-contain'
              style={{ display: "inline", verticalAlign: "middle" }}
            />
            2 additional
          </span>
        </div>
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          src={audio}
          autoPlay
          className='w-full '
        />
        <div className={cn("flex items-center space-x-3", loading && "hidden")}>
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
              className='custom-progress-handle w-4 h-4 border  bg-[#2C2C3F] rounded-full absolute top-1/2 transform -translate-y-1/2 cursor-pointer'
              style={{ left: `${progress}%` }}
              onMouseDown={handleMouseDown}
            ></div>
          </div>
        </div>
        <CustomButton
          className={cn("self-start pb-0 h-auto", loading && "hidden")}
          onClick={stopNarration}
          withIcon={true}
          variant='subtle'
        >
          <Stop className='h-5 w-5 fill-errorRed' />
          Stop Narrating
        </CustomButton>
      </div>
    </>
  );
};

export default function bottomMenu({
  textSize,
  setTextSize,
  imageViewDialog,
  setImageViewDialog,
  setChat,
  loading,
  setLoading,
  narrate,
  setNarrate,
  setGameCharacter,
  isImageLoading,
  setIsImageLoading,
}) {
  const [imageDialog, setImageDialog] = useState(false);
  const [narrateDialog, setNarrateDialog] = useState(false);
  const [audio, setAudio] = useState(null);
  const [audioLoading, setAudioLoading] = useState(false);
  const { invokeToast } = useCustomToast();
  const { game } = useGameStore();
  const { setBlueCredits, setYellowCredits, user } = useUserStore();

  const handleSaveCharacter = async () => {
    try {
      setLoading(true);
      console.log(game);
      const payload = {
        characterId: game.characterId,
        gameId: game._id,
      };

      const { character, credits } = await saveCharacter(payload, user?.token);
      setGameCharacter(character);

      setYellowCredits(credits.yellow);
      setBlueCredits(credits.blue);
      invokeToast("Character Saved Successfully", "Success");
    } catch (error) {
      invokeToast(
        error?.response?.data?.message || "Something Went Wrong",
        "error"
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const chatBox = document.querySelector(".chat-box");
    if (imageDialog) {
      //remove scorll
      chatBox.style.height = "10vh";
      chatBox.style.overflow = "hidden";
    } else {
      //add scroll
      chatBox.style.height = "auto";
      chatBox.style.overflow = "auto";
    }
  }, [imageDialog]);

  return (
    <div className='flex  justify-between items-center relative '>
      <NarrationControls
        audio={audio}
        setNarrate={setNarrate}
        narrate={narrate}
        loading={audioLoading}
      />
      <div className='flex justify-start items-center gap-3'>
        <Dialog
          open={imageDialog}
          onOpenChange={(isOpen) => setImageDialog(isOpen)}
        >
          <DialogTrigger asChild suppressHydrationWarning>
            <button className='running-text-mono flex items-center pe-5 ps-[20px] gap-2 h-[48px] px-6 bg-white/10 hover:bg-white/10 uppercase border border-white/10 hover:border-white/20 active:bg-white/20 active:border-white/40 disabled:opacity-30 rounded-[10px]  cursor-pointer z-[10] ease-animate  hover:!duration-200 active:!duration-100'>
              <img
                src='/Icons/Generate.svg'
                alt=''
                className='h-5 w-5 opacity-70'
              />
              Generate image
            </button>
          </DialogTrigger>
          <Step1
            loading={isImageLoading}
            setLoading={setIsImageLoading}
            setChat={setChat}
            setOpen={setImageDialog}
            setImageOpen={setImageViewDialog}
          />
        </Dialog>

        <Dialog
          open={imageViewDialog}
          onOpenChange={(isOpen) => setImageViewDialog(isOpen)}
        >
          <ImageZoom
            setOpen={setImageViewDialog}
            setImageDialog={setImageDialog}
          />
        </Dialog>

        <Dialog
          open={narrateDialog}
          onOpenChange={(isOpen) => setNarrateDialog(isOpen)}
        >
          <DialogTrigger asChild>
            <button className='running-text-mono flex items-center pe-5 ps-[20px] gap-2 h-[48px] px-6 bg-white/10 hover:bg-white/10 uppercase border border-white/10 hover:border-white/20 active:bg-white/20 active:border-white/40 disabled:opacity-30 rounded-[10px]  cursor-pointer z-[10] ease-animate  hover:!duration-200 active:!duration-100'>
              <img
                src='/Icons/Narrate.svg'
                alt=''
                className='h-5 w-5 opacity-70'
              />
              Start Narrate
            </button>
          </DialogTrigger>
          <Narrate
            loading={audioLoading}
            setLoading={setAudioLoading}
            audio={audio}
            setAudio={setAudio}
            setOpen={setNarrateDialog}
            setNarrate={setNarrate}
            narrate={narrate}
          />
        </Dialog>
        <SaveCharacterDialogue action={handleSaveCharacter}>
          <CustomButton>
            <Save className='h-5 w-5 fill-white ' />
            Save Character
          </CustomButton>
        </SaveCharacterDialogue>
      </div>
      <div className='flex gap-2 justify-start items-center'>
        <span className='running-text-mono text-gray2'> </span>
        <CustomIconbutton
          disabled={textSize <= 17}
          onClick={() => setTextSize((prev) => prev - 1)}
          variant={"primary"}
          className={"h-6 w-6"}
        >
          <img src='/Icons/Minus.svg' alt='logo' className='h-2 w-2' />
        </CustomIconbutton>

        <CustomIconbutton
          onClick={() => setTextSize((prev) => prev + 1)}
          disabled={textSize >= 22}
          variant={"primary"}
          className={"h-6 w-6"}
        >
          <img src='/Icons/Add.svg' alt='logo' className='h-2 w-2' />
        </CustomIconbutton>
      </div>
    </div>
  );
}
