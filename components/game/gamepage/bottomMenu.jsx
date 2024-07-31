import React, { useState, useRef, useEffect } from "react";
import CustomButton from "@/components/ui/custom-button";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Step1 from "./steps/step1";
import ImageZoom from "./imageZoom";
import Narrate from "./narrate";

import Save from "@/components/ui/Icons/Save";
import { saveCharacter } from "@/actions/game";
import useGameStore from "@/utils/gameStore";
import useUserStore from "@/utils/userStore";
import useCustomToast from "@/hooks/useCustomToast";

import SaveCharacterDialogue from "@/components/ui/Shared/Dialogue/SaveCharacter";

import MobileMenu from "./MobileMenu/index";
import Generate from "@/components/ui/Icons/Generate";
import AdjustTextSize from "./AdjustTextSize";

import NarrationControls from "./NarrateControls";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import useControlsStore from "@/utils/controlsStore";
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
  gameCharacter,
  showMenu,
  setShowMenu,
}) {
  const [imageDialog, setImageDialog] = useState(false);
  const [narrateDialog, setNarrateDialog] = useState(false);
  const [audio, setAudio] = useState(null);
  const [audioLoading, setAudioLoading] = useState(false);
  const { invokeToast } = useCustomToast();
  const { game } = useGameStore();
  const { setBlueCredits, setYellowCredits, user } = useUserStore();
  const { setShowCreditsDialogue } = useControlsStore();
  const { isMobile } = useDeviceDetect();

  const handleSaveCharacter = async () => {
    if (user.blueCredits < 1) {
      setShowCreditsDialogue(true);
      return;
    }
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
    <>
      {isMobile && (
        <MobileMenu
          textSize={textSize}
          gameCharacter={gameCharacter}
          setTextSize={setTextSize}
          setImageDialog={setImageDialog}
          setNarrateDialog={setNarrateDialog}
          audio={audio}
          setNarrate={setNarrate}
          narrate={narrate}
          loading={audioLoading}
          handleSaveCharacter={handleSaveCharacter}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        />
      )}
      <div className='hidden lg:flex  justify-between items-center relative '>
        {!isMobile && (
          <NarrationControls
            audio={audio}
            setNarrate={setNarrate}
            narrate={narrate}
            loading={audioLoading}
          />
        )}
        <div className='flex justify-start items-center gap-3'>
          <Dialog
            open={imageDialog}
            onOpenChange={(isOpen) => setImageDialog(isOpen)}
          >
            <DialogTrigger asChild suppressHydrationWarning>
              <button className='running-text-mono flex items-center pe-5 ps-[20px] gap-2 h-[48px] px-6 bg-white/10 hover:bg-white/10 uppercase border border-white/10 hover:border-white/20 active:bg-white/20 active:border-white/40 disabled:opacity-30 rounded-[10px]  cursor-pointer z-[10] ease-animate  hover:!duration-200 active:!duration-100'>
                <Generate className='h-5 w-5 fill-white opacity-70' />
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
              <Save className='h-5 w-5 fill-white opacity-70 ' />
              Save Character
            </CustomButton>
          </SaveCharacterDialogue>
        </div>
        <AdjustTextSize textSize={textSize} setTextSize={setTextSize} />
      </div>
    </>
  );
}
