"use client";
import React, { useState } from "react";
import { DialogContent } from "@/components/ui/dialog";
import CustomButton from "@/components/ui/custom-button";
import { IMAGE_STYLES, IMAGE_TYPES } from "@/components/constants/ImageStyles";
import { cn } from "@/lib/utils";
import { generateGameImage } from "@/actions/game";
import useUserStore from "@/utils/userStore";
import useGameStore from "@/utils/gameStore";
import Loader from "@/components/ui/Loader";

export default function StepDialog({
  setOpen,
  setImageOpen,
  setChat,
  loading,
  setLoading,
}) {
  const [step, setStep] = useState(1);
  const [style, setStyle] = useState(IMAGE_STYLES[0]);
  const [imageType, setImageType] = useState(IMAGE_TYPES[0].type);

  const { user, setBlueCredits, setYellowCredits } = useUserStore();
  const { game, setGameImage } = useGameStore();

  const handleNextStep = () => {
    if (step === 1) {
      setStep((prevStep) => (prevStep < 2 ? prevStep + 1 : prevStep));
    } else {
      handleGenerateGameImage();
      return;
    }
  };

  const handleCancel = () => {
    if (step === 1) {
      setOpen(false);
    } else {
      // Reset to the initial step or perform any cancel action
      setStep(1);
    }
  };

  const handleGenerateGameImage = async () => {
    setLoading(true);
    setOpen(false);
    try {
      const payload = {
        type: imageType,
        artStyle: style,
        prompt: game.state,
      };
      const { imageUrl, credits } = await generateGameImage(
        payload,
        user?.token
      );
      setGameImage(imageUrl);
      setChat((prev) => [
        ...prev,
        {
          type: "image",
          url: imageUrl,
        },
      ]);
      setBlueCredits(credits.blue);
      setYellowCredits(credits.yellow);

      setStep(1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      // setImageOpen(false);
    }
  };

  return (
    <DialogContent className='bg-white/[8%]  overflow-hidden !gap-0 text-white border !p-0 border-white/10 !rounded-[16px]'>
      {step === 1 && (
        <>
          <div className='flex p-6 pb-5 flex-col gap-2'>
            <span className='running-text-mono text-irisPurpleLight'>
              STEP 1/2
            </span>
            <span className='running-text-large'>
            Choose what kind of image you want to create
            </span>
          </div>
          <div className='grid grid-cols-3 gap-4  p-6 pb-4  pt-0 overflow-auto hide-scrollbar max-h-[50vh]'>
            {IMAGE_TYPES.map((type, i) => (
              <div onClick={() => setImageType(type.type)} key={i}>
                <img
                  src={type.image}
                  className={cn(
                    "w-full  cursor-pointer  md:w-[223px] ease-animate object-contain rounded-[10px] ",
                    type.type === imageType &&
                      "border border-irisPurpleLight shadow-custom-1"
                  )}
                />
                <span className='description uppercase'>{type.name}</span>
              </div>
            ))}
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div className='flex p-6 pb-5  flex-col gap-2'>
            <span className='running-text-mono text-irisPurpleLight'>
              STEP 2/2
            </span>
            <span className='running-text-large'>
              Select an art style you want to use
            </span>
            {/* Add your step 2 content here */}
          </div>
          <div className='grid px-6 grid-cols-12 w-full gap-5 min-h-96  max-h-[80vh] md:max-h-[60vh] h-full overflow-y-scroll hide-scrollbar  pb-6'>
            {IMAGE_STYLES.map((avatar, index) => (
              <div
                key={index}
                className='col-span-6 md:col-span-4 gap-3 text-white flex flex-col'
                onClick={() => {
                  setStyle(avatar);
                }}
              >
                <img
                  src={`https://dndai-images.s3.eu-central-1.amazonaws.com/art-styles/${avatar
                    .toLowerCase()
                    .replaceAll(" ", "-")}.webp`}
                  alt='avatar'
                  style={{ aspectRatio: "1/1" }}
                  className={cn(
                    " cursor-pointer ease-animate rounded-[16px]",
                    style === avatar &&
                      "border border-irisPurpleLight shadow-custom-1"
                  )}
                />
                <span className='uppercase running-text-mono'>{avatar}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <div className='flex justify-end gap-4  p-6 border-t border-white/10'>
        <CustomButton disabled={loading} withIcon onClick={handleCancel}>
          <img src='/Icons/Cancel.svg' alt='' className='w-6 h-6 opacity-70' />
          <span className='running-text-mono text-white'>CANCEL</span>
        </CustomButton>
        <CustomButton
          disabled={loading}
          withIcon
          variant={"primary"}
          onClick={handleNextStep}
        >
          <span className='running-text-mono text-black'>
            {step === 1 ? "NEXT STEP" : "GENERATE"}
          </span>
          {step === 1 ? (
            <img
              src='/Icons/ArrowRight.svg'
              alt=''
              className='w-6 h-6 opacity-70'
            />
          ) : (
            <>
              (<img src='/gems/Legendary.png' alt='' /> 1)
            </>
          )}
        </CustomButton>
      </div>
    </DialogContent>
  );
}
