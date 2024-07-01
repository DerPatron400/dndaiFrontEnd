"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/ui/custom-button";

import { extractSection } from "@/lib/Helpers/shared";
import TimeStamps from "./Timestamps";
import Comments from "./Comments";
import Details from "./Details";
import TopButtons from "./TopButtons";
import CampaignTabBar from "@/components/ui/Shared/TabBar/campaign";
const TabButtons = ({ activeTab, onClick, icon, text }) => {
  return (
    <Button
      onClick={onClick}
      withIcon
      className={"bg-transparent"}
      active={activeTab === text.toLowerCase()}
    >
      <img src={icon} className='h-5 w-5 opacity-75 invert' alt='' />{" "}
      <span>{text}</span>
    </Button>
  );
};

export default function index({ campaign, setCampaign }) {
  const [activeTab, setActiveTab] = useState("details");
  const [hook, setHook] = useState("");
  const [plot, setPlot] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const _hook = extractSection(campaign.adventure, "hook");
    const _plot = extractSection(campaign.adventure, "plot");
    const _time = extractSection(campaign.adventure, "time");
    setHook(_hook || campaign.hook);
    setPlot(_plot || campaign.plot);
    setTime(_time || campaign.time);
  }, [campaign]);
  return (
    <div className='min-h-screen h-full w-full flex flex-col border  pt-[112px] md:pt-[128px]  lg:px-12 md:pb-20 '>
      <div className='flex flex-col gap-5 z-[10]  px-5 md:px-0'>
        <span className='headline-3  headline-3 text-white capitalize'>
          {campaign.title}
        </span>

        <img
          src={campaign?.worldMapUrl || "/campaignheader.png"}
          className=' md:hidden object-contain w-full rounded-[16px]'
        />
        <TopButtons
          campaign={campaign}
          setCampaign={setCampaign}
          className={" md:hidden"}
        />
      </div>

      <div className='w-full   flex flex-col gap-[20px] text-white z-[10] pt-9 md:pt-8 pb-32 md:pb-0 '>
        <TopButtons
          campaign={campaign}
          setCampaign={setCampaign}
          className={"hidden md:flex"}
        />
        <div className='w-full  h-full flex flex-col-reverse md:flex-row justify-between gap-[20px]'>
          <div className='px-5 md:px-0 w-full md:w-1/3'>
            <TimeStamps campaign={campaign} />
          </div>
          <div className='w-full md:w-2/3 flex flex-col gap-[20px] md:bg-white/[8%] md:border  border-white/10 rounded-[16px] px-0 md:px-5'>
            <div className='flex flex-col gap-6 py-[20px]'>
              <div className='px-5 md:px-0 flex justify-start items-center overflow-x-scroll hide-scrollbar gap-4 '>
                <TabButtons
                  onClick={() => setActiveTab("details")}
                  activeTab={activeTab}
                  icon={"/Icons/Eye.svg"}
                  text={"Details"}
                />
                <TabButtons
                  onClick={() => setActiveTab("comments")}
                  activeTab={activeTab}
                  icon={"/Icons/Comment.svg"}
                  text={"Comments"}
                />
                <TabButtons icon={"/Icons/Adventure.svg"} text={"Adventures"} />
              </div>
              {/**Details section */}

              {activeTab === "details" && (
                <Details
                  details={{
                    time,
                    plot,
                    hook,
                  }}
                  setting={campaign?.setting}
                />
              )}
              {activeTab === "comments" && <Comments campaign={campaign} />}

              {/**Comment section */}
            </div>
          </div>
        </div>
      </div>
      <CampaignTabBar campaign={campaign} />
    </div>
  );
}
