"use client";
import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Shared/Card/campaign";
import useSoundControls from "@/utils/controlsStore";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import CustomButton from "@/components/ui/custom-button";
import { useRouter } from "next/navigation";
import _ from "lodash";
import Play from "@/components/ui/Icons/Play";
import Add from "@/components/ui/Icons/Add";
import CampaignAdd from "@/components/ui/Icons/CampaignAdd";
import AddUser from "@/components/ui/Icons/AddUser";
import { cn } from "@/lib/utils";

export default function index({ campaigns, setCampaigns }) {
  const router = useRouter();
  const { isSoundOn, toggleSound } = useSoundControls();
  const [showButtons, setShowButtons] = useState(true);
  const handleRedirect = (path) => {
    router.push(path);
  };

  const handleUpdateCampaigns = (campaign) => {
    let _campaigns = campaigns.filter((c) => c._id !== campaign._id);
    _campaigns.push(campaign);
    _campaigns = _.sortBy(_campaigns, ["createdAt"]);
    setCampaigns(_campaigns);
  };

  return (
    <div className='min-h-screen w-full flex flex-col pt-[120px] px-5 lg:px-12 pb-10 md:pb-64 '>
      <div className='flex flex-col gap-2.5 '>
        <div className='text-center flex justify-between text-white headline-3 z-[10] '>
          <span className='headline-3 z-[10]  '>
            My campaigns
            <span className='text-gray2 ms-3 md:ms-4 font-roboto-mono transform translate-up text-[17px] md:text-[24px] translate-y-[-15px] md:translate-y-[-20px]'>
              ({campaigns.length})
            </span>
          </span>
          <CustomButton
            className={"hidden md:flex"}
            onClick={() => handleRedirect("/campaign/create")}
            withIcon
          >
            <img
              src='/Icons/Campaign.svg'
              className='h-5 w-5 fill-white opacity-70'
            />
            <span>Create Campaign</span>
          </CustomButton>
        </div>
      </div>
      {/* <div
        className={
          "flex flex-col gap-2.5 bg-blur-bottom-menu z-[12] w-screen left-0 h-[198px] px-5 pb-4 md:hidden fixed top-0 justify-end"
        }
      >
        <h1 className='text-center flex justify-start text-white headline-3 z-[10] '>
          Create your own campaign
        </h1>
      </div> */}
      <div className='w-full text-white  z-[10] grid grid-cols-12 lg:grid-cols-12 gap-4 pt-9 md:pt-8'>
        {campaigns.map((campaign, i) => (
          <div
            key={i}
            className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 2xl:col-span-2 w-full min-w-full max-w-full'
          >
            <Card
              handleUpdateCampaigns={handleUpdateCampaigns}
              campaign={campaign}
              className={"!w-full !min-w-full"}
            />
          </div>
        ))}
      </div>
      <div className='z-[20]  text-white fixed bottom-0 left-0 bg-blur-bottom-menu w-full flex  justify-center items-center  md:hidden '>
        <div className='flex flex-col items-center gap-4 w-full relative p-5'>
          <hr
            className={cn(
              "w-9 border-[1px] rounded-sm border-gray1 text-gray1",
              !showButtons && "hidden"
            )}
          />
          <div
            className={cn(
              "border w-full flex flex-col  border-white/10 bg-white/10 rounded-[16px] gap-2 py-2 px-5",
              !showButtons && "hidden"
            )}
          >
            <div>
              <CustomButton variant={"subtle"}>
                <AddUser className='h-5 w-5 fill-white opacity-70' />
                Create Character
              </CustomButton>
            </div>
            <div>
              <CustomButton variant={"subtle"}>
                <CampaignAdd className='h-5 w-5 fill-white opacity-70' />
                Create Campaign
              </CustomButton>
            </div>
          </div>
          <div className='flex justify-between items-center w-full '>
            <div className='flex items-center gap-5'>
              <CustomIconbutton onClick={toggleSound}>
                <img
                  src={isSoundOn ? "/Icons/Sound.svg" : "/Icons/SoundOff.svg"}
                  alt='Sound Toggle'
                  className='h-5 w-5 invert'
                />
              </CustomIconbutton>
              <CustomIconbutton onClick={() => setShowButtons((prev) => !prev)}>
                <Add className='h-5 w-5 fill-white' />
              </CustomIconbutton>
            </div>
            <CustomButton
              variant={"primary"}
              // disabled={!isValid() || loading}
              // onClick={handleCreateCampaign}
            >
              <Play className='h-5 w-5 fill-russianViolet' />
              Play campaign
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}
