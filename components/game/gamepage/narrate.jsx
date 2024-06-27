import React, { useState } from "react";
import { DialogContent } from "@/components/ui/dialog";
import CustomButton from "@/components/ui/custom-button";
import CustomDropdown from "@/components/ui/custom-dropdown";
import useGameStore from "@/utils/gameStore";
import useUserStore from "@/utils/userStore";
import { textToSpeech } from "@/actions/game";
import { getCredits } from "@/actions/character";
import Cancel from "@/components/ui/Icons/Cancel";

const VOICES = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"];

export default function narrate({ setOpen, audio, setAudio }) {
  const [selectedVoice, setSelectedVoice] = useState(VOICES[0]);
  const { game } = useGameStore();
  const { user, setYellowCredits, setBlueCredits } = useUserStore();

  const [loading, setLoading] = useState(false);

  const handleNarrate = async () => {
    try {
      setLoading(true);

      const payload = {
        voice: selectedVoice.toLowerCase(),
        input: game.state,
      };

      const url = await textToSpeech(payload, user?.token);
      const { credits } = await getCredits(user?.token);

      setYellowCredits(credits.yellowCredits);

      setBlueCredits(credits.blueCredits);
      setAudio(url);
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <DialogContent className='bg-white/[8%] h-fit text-white border border-white/10 w-fit '>
      <div className='flex flex-col gap-2'>
        <span className='running-text-large'>
          Enhance Your Story with Narration?
        </span>
      </div>
      <div className='flex flex-col gap-2 pb-4 p-4 bg-white/[8%] rounded-[8px] '>
        <span className='running-text w-full'>Choose narraters voice</span>
        <CustomDropdown
          className={"!w-full !min-w-full"}
          placeholder={"dropdown"}
          selectedOption={selectedVoice}
          setSelectedOption={(option) => setSelectedVoice(option)}
          options={VOICES}
        />
      </div>
      <div className='text-gray2 flex items-center'>
        Each line of narration costs (
        <img
          src='/gems/Mythic.webp'
          alt=''
          className='h-[18px] mx-1 object-contain '
        />
        1) additional
      </div>

      <div className='flex justify-end gap-4 pt-2'>
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
