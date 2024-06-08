"use client";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import Create from "@/components/campaigns/createCampaign/create";
import CustomButton from "@/components/ui/custom-button";
import { TIMES } from "./constants";
import { createCampaign } from "@/actions/campaigns";
import useUserStore from "@/utils/userStore";
import { getCredits } from "@/actions/character";
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

  const handleSetCampaign = (key, value) => {
    setCampaign((prev) => ({ ...prev, [key]: value }));
  };
  console.log(campaign);
  const isValid = () => {
    return (
      campaign.title.length > 0 &&
      campaign.plot.length > 0 &&
      campaign.hook.length > 0 &&
      campaign.setting.length > 0
    );
  };

  const handleCreateCampaign = async () => {
    try {
      setLoading(true);
      const newCampaign = await createCampaign(campaign, user?.token);
      const { credits } = await getCredits(user?.token);
      console.log(newCampaign);
      setYellowCredits(credits.yellowCredits);

      setBlueCredits(credits.blueCredits);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-screen max-h-screen w-full flex flex-col bg-gradient pt-[172px] md:pt-[120px] px-6 lg:px-12 md:pb-64 '>
      <div className='hidden md:flex flex-col gap-2.5 '>
        <h1 className='text-center flex justify-start text-white headline-3 z-[10] '>
          Create your own campaign
        </h1>
      </div>
      <div
        className={
          "flex flex-col gap-2.5 bg-blur-bottom-menu z-[12] w-screen left-0 h-[198px] px-5 pb-4 md:hidden fixed top-0 justify-end"
        }
      >
        <h1 className='text-center flex justify-start text-white headline-3 z-[10] '>
          Create your own campaign
        </h1>
      </div>
      <div className='w-full h-[62vh] flex z-[10] '>
        <Create campaign={campaign} handleSetCampaign={handleSetCampaign} />
      </div>
      <div className='flex justify-end items-end py-12 '>
        <CustomButton
          variant={"primary"}
          disabled={!isValid() || loading}
          onClick={handleCreateCampaign}
        >
          <img src='/Icons/Add.svg' alt='' className='h-5 w-5 opacity-75' />
          Create campaign ( <img src='/gems/Legendary.png' alt='' /> 1)
        </CustomButton>
      </div>
    </div>
  );
}
