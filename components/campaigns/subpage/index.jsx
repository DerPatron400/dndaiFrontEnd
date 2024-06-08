"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/ui/custom-button";
import CustomIcontext from "@/components/ui/custom-icontext";
import CustomInputIcon from "@/components/ui/custom-input-icon";
import Play from "@/components/ui/icons/Play";
import { extractSection } from "@/lib/Helpers/shared";
import TimeStamps from "./TimeStamps";
import Comments from "./Comments";
import Details from "./Details";

const TopButtons = ({ campaign }) => {
  return (
    <div className='flex justify-between w-full'>
      <div className='flex justify-start items-center gap-8 w-3/4'>
        <Button withIcon variant={"primary"}>
          <Play size={14} /> <span>Play campaign</span>
        </Button>
        <CustomIcontext>
          <img src='/Icons/Like.svg' alt='' className='h-5 w-5 opacity-70' />
          <span>{campaign.analytics.likes.length}</span>
        </CustomIcontext>
        <CustomIcontext>
          <Play className='h-5 w-5 fill-white opacity-70' />
          <span>{campaign.analytics.plays.length}</span>
        </CustomIcontext>
        <CustomIcontext>
          <img
            src='/Icons/Star.svg'
            alt=''
            className='h-5 w-5 opacity-70 invert'
          />
          <span>{campaign.analytics.stars.length}</span>
        </CustomIcontext>
        <CustomIcontext>
          <img
            src='/Icons/Share.svg'
            alt=''
            className='h-5 w-5 opacity-70 invert'
          />{" "}
          <span>Share</span>
        </CustomIcontext>
      </div>
      <div className='w-1/4 flex gap-4 justify-end items-end'>
        <Button withIcon className={"border-none bg-transparent"}>
          <img src='/Icons/Globe.png' className='h-5 w-5 opacity-75 ' alt='' />{" "}
          <span>Publish</span>
        </Button>
        <Button withIcon className={"border-none bg-transparent"}>
          <img
            src='/Icons/Delete.png'
            className='h-4 w-4 opacity-75 inver-red-500'
            alt=''
          />{" "}
          <span>Delete</span>
        </Button>
        <Button withIcon>
          <img
            src='/Icons/Download.svg'
            className='h-5 w-5 opacity-75 invert'
            alt=''
          />{" "}
          <span>Download world map</span>
        </Button>
      </div>
    </div>
  );
};

const TabButtons = ({ activeTab, setActiveTab, icon, text }) => {
  return (
    <Button withIcon className={"bg-transparent"}>
      <img src={icon} className='h-5 w-5 opacity-75 invert' alt='' />{" "}
      <span>{text}</span>
    </Button>
  );
};

export default function index({ campaign }) {
  const [activeTab, setActiveTab] = useState("comments");
  const [hook, setHook] = useState("");
  const [plot, setPlot] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    console.log(campaign, "campaign");
    const _hook = extractSection(campaign.adventure, "hook");
    const _plot = extractSection(campaign.adventure, "plot");
    const _time = extractSection(campaign.adventure, "time");
    setHook(_hook);
    setPlot(_plot);
    setTime(_time);
  }, [campaign]);
  return (
    <div className='min-h-screen h-full w-full flex flex-col border bg-gradient pt-[172px] md:pt-[0px] px-6 lg:px-0 md:pb-64 '>
      <div className='h-[400px] w-full z-[10] relative'>
        <img
          src='/campaignheader.png'
          alt=''
          className='h-full w-full object-cover'
        />
        <div className='hidden absolute bottom-10 px-10 md:flex flex-col gap-2.5  '>
          <div className='text-center flex justify-start text-white headline-3 z-[10] '>
            <span className='headline-3 z-[10] headline-3'>
              {campaign.title}
            </span>
          </div>
        </div>
      </div>

      <div className='w-full flex flex-col gap-[20px] text-white z-[10] pt-9 md:pt-8 px-6 lg:px-12'>
        <TopButtons campaign={campaign} />
        <div className='w-full h-full flex justify-between gap-[20px]'>
          <div className='w-3/4 flex flex-col gap-[20px] bg-white/[8%] border border-white/10 rounded-[16px]'>
            <div className='flex flex-col gap-6 p-[20px]'>
              <div className='flex justify-start items-center gap-4 '>
                <TabButtons icon={"/Icons/Eye.svg"} text={"Details"} />
                <TabButtons icon={"/Icons/Comment.svg"} text={"Comments"} />
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
                />
              )}
              {activeTab === "comments" && <Comments />}

              {/**Comment section */}
            </div>
          </div>
          <TimeStamps campaign={campaign} />
        </div>
      </div>
    </div>
  );
}
