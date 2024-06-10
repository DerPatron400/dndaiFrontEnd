"use client";
import React, { useState, useEffect } from "react";
import Card from "@/components/campaigns/shared/card";
import Button from "@/components/ui/custom-button";
import { useRouter } from "next/navigation";
import _ from "lodash";

export default function index({ campaigns, setCampaigns }) {
  const router = useRouter();
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
    <div className='h-screen w-full flex flex-col pt-[120px] px-5 lg:px-12 pb-10 md:pb-64 '>
      <div className='flex flex-col gap-2.5 '>
        <div className='text-center flex justify-between text-white headline-3 z-[10] '>
          <span className='headline-3 z-[10]  '>
            My campaigns
            <span className='text-gray2 ms-3 md:ms-4 font-roboto-mono transform translate-up text-[17px] md:text-[24px] translate-y-[-15px] md:translate-y-[-20px]'>
              ({campaigns.length})
            </span>
          </span>
          <Button onClick={() => handleRedirect("/campaign/create")} withIcon>
            <img
              src='/Icons/Campaign.svg'
              className='h-5 w-5 fill-white opacity-70'
            />
            <span>Create Campaign</span>
          </Button>
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
            className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 w-full min-w-full max-w-full'
          >
            <Card
              handleUpdateCampaigns={handleUpdateCampaigns}
              campaign={campaign}
              className={"!w-full !min-w-full"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
