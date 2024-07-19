"use client";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import Create from "@/components/campaigns/createCampaign/create";
import CustomButton from "@/components/ui/custom-button";
import { TIMES } from "./constants";
import { createCampaign } from "@/actions/campaigns";
import useUserStore from "@/utils/userStore";
import { getCredits } from "@/actions/character";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import Loader from "@/components/ui/Loader";
import { useRouter } from "next/navigation";
import useCustomToast from "@/hooks/useCustomToast";
import SoundButton from "@/components/ui/Shared/SoundButton";
import useControlsStore from "@/utils/controlsStore";

const INITIAL_STATE = {
  title: "",
  time: TIMES[0],
  plot: "",
  hook: "",
  setting: "",
};
export default function Index() {
  const [campaign, setCampaign] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const { user, setYellowCredits, setBlueCredits } = useUserStore();
  const { setShowCreditsDialogue } = useControlsStore();
  const router = useRouter();
  const { invokeToast } = useCustomToast();

  const handleSetCampaign = (key, value) => {
    setCampaign((prev) => ({ ...prev, [key]: value }));
  };

  const isValid = () => {
    return (
      campaign.title.length > 0 &&
      campaign.plot.length > 0 &&
      campaign.hook.length > 0 &&
      campaign.setting.length > 0
    );
  };

  const handleCreateCampaign = async () => {
    if (user.yellowCredits < 1) {
      setShowCreditsDialogue(true);
      return;
    }
    try {
      setLoading(true);
      const { newCampaign } = await createCampaign(campaign, user?.token);
      const { credits } = await getCredits(user?.token);
      console.log(newCampaign);
      setYellowCredits(credits.yellowCredits);

      setBlueCredits(credits.blueCredits);
      router.push(`/campaign/${newCampaign._id}`);
    } catch (error) {
      invokeToast(error?.response?.data || "Error creating Campaign", "Error");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <Loader className={"fixed top-0 left-0"} text='Creating Campaign...' />
    );
  return (
    <div className='h-full   z-[10] border-green-500 w-full flex flex-col   px-6 lg:px-12  '>
      {/* Desktop */}
      <div className='hidden md:flex flex-col gap-2.5 '>
        <h1 className='text-center hidden md:flex justify-start text-white headline-3 z-[10] '>
          Create your own campaign
        </h1>
      </div>

      {/* Mobile */}

      <Create campaign={campaign} handleSetCampaign={handleSetCampaign} />

      {/* Desktop */}
      <div className='md:flex h-full justify-end items-end my-12  hidden   w-full '>
        <CustomButton
          variant={"primary"}
          disabled={!isValid() || loading}
          onClick={handleCreateCampaign}
        >
          Create campaign ( <img src='/gems/Legendary.png' alt='' /> 1)
        </CustomButton>
      </div>

      {/* Mobile */}
      <div className='z-[20]  text-white fixed bottom-0 left-0 bg-blur-bottom-menu w-full flex  justify-center items-center py-5 md:hidden '>
        <div className='flex justify-between items-center w-full px-5 '>
          <SoundButton />
          <CustomButton
            variant={"primary"}
            disabled={!isValid() || loading}
            onClick={handleCreateCampaign}
          >
            Create campaign ( <img src='/gems/Legendary.png' alt='' /> 1)
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
