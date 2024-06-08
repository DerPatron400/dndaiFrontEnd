"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/ui/custom-button";
import CustomIcontext from "@/components/ui/custom-icontext";
import CustomInputIcon from "@/components/ui/custom-input-icon";
import Play from "@/components/ui/icons/Play";
import { extractSection } from "@/lib/Helpers/shared";
import moment from "moment";
import { Check } from "lucide-react";
import IconButton from "@/components/ui/custom-iconbutton";

export default function index({ campaign }) {
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
    <div className="h-screen w-full flex flex-col border bg-gradient pt-[172px] md:pt-[0px] px-6 lg:px-0 md:pb-64 ">
      <div className="h-[400px] w-full z-[10] relative">
        <img
          src="/campaignheader.png"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="hidden absolute bottom-10 px-10 md:flex flex-col gap-2.5  ">
          <div className="text-center flex justify-start text-white headline-3 z-[10] ">
            <span className="headline-3 z-[10] headline-3">
              {campaign.title}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-[20px] text-white z-[10] pt-9 md:pt-8 px-6 lg:px-12">
        <div className="flex justify-between w-full">
          <div className="flex justify-start items-center gap-8 w-3/4">
            <Button withIcon variant={"primary"}>
              <Play size={14} /> <span>Play campaign</span>
            </Button>
            <CustomIcontext>
              <img
                src="/Icons/Like.svg"
                alt=""
                className="h-5 w-5 opacity-70"
              />
              <span>{campaign.analytics.likes.length}</span>
            </CustomIcontext>
            <CustomIcontext>
              <Play className="h-5 w-5 fill-white opacity-70" />
              <span>{campaign.analytics.plays.length}</span>
            </CustomIcontext>
            <CustomIcontext>
              <img
                src="/Icons/Star.svg"
                alt=""
                className="h-5 w-5 opacity-70 invert"
              />
              <span>{campaign.analytics.stars.length}</span>
            </CustomIcontext>
            <CustomIcontext>
              <img
                src="/Icons/Share.svg"
                alt=""
                className="h-5 w-5 opacity-70 invert"
              />{" "}
              <span>Share</span>
            </CustomIcontext>
          </div>
          <div className="w-1/4 flex gap-4 justify-end items-end">
            <Button withIcon className={"border-none bg-transparent"}>
              <img
                src="/Icons/Globe.png"
                className="h-5 w-5 opacity-75 "
                alt=""
              />{" "}
              <span>Publish</span>
            </Button>
            <Button withIcon className={"border-none bg-transparent"}>
              <img
                src="/Icons/Delete.png"
                className="h-4 w-4 opacity-75 inver-red-500"
                alt=""
              />{" "}
              <span>Delete</span>
            </Button>
            <Button withIcon>
              <img
                src="/Icons/Download.svg"
                className="h-5 w-5 opacity-75 invert"
                alt=""
              />{" "}
              <span>Download world map</span>
            </Button>
          </div>
        </div>
        <div className="w-full h-full flex justify-between gap-[20px]">
          <div className="w-3/4 flex flex-col gap-[20px] bg-white/[8%] border border-white/10 rounded-[16px]">
            <div className="flex flex-col gap-6 p-[20px]">
              <div className="flex justify-start items-center gap-4 ">
                <Button withIcon className={"bg-transparent"}>
                  <img
                    src="/Icons/Eye.svg"
                    className="h-5 w-5 opacity-75 invert"
                    alt=""
                  />{" "}
                  <span>Details</span>
                </Button>
                <Button withIcon className={"bg-transparent"}>
                  <img
                    src="/Icons/Comment.svg"
                    className="h-5 w-5 opacity-75 invert"
                    alt=""
                  />{" "}
                  <span>
                    Comments
                    <span className="text-white ms-3 md:ms-2 font-roboto-mono transform translate-up text-[17px] md:text-[14px] translate-y-[-15px] md:translate-y-[-5px]">
                      (3)
                    </span>
                  </span>
                </Button>
                <Button withIcon className={"bg-transparent"}>
                  <img
                    src="/Icons/Adventure.svg"
                    className="h-5 w-5 opacity-75 invert"
                    alt=""
                  />{" "}
                  <span>Adventures</span>
                </Button>
              </div>
              {/**Details section */}
              {/* <div className="flex gap-[20px] w-full border details-section">
                <div className="w-1/2 flex flex-col gap-[16px]">
                  <div className=" flex flex-col gap-[16px]">
                    <span className="running-text-mono text-gray2">TIME</span>
                    <p className="running-text">{time}</p>
                  </div>
                  <div className=" flex flex-col gap-[16px]">
                    <span className="running-text-mono text-gray2">PLOT</span>
                    <p className="running-text">{plot}</p>
                  </div>
                  <div className=" flex flex-col gap-[16px]">
                    <span className="running-text-mono text-gray2">HOOK</span>
                    <p className="running-text">{hook}</p>
                  </div>
                </div>
                <div className="w-1/2">
                  {" "}
                  <div className="flex flex-col gap-[16px]">
                    <span className="running-text-mono text-gray2">
                      SETTING
                    </span>
                    <div className="bg-white/[8%] rounded-[16px] w-full h-[446px]"></div>
                  </div>
                </div>
              </div> */}
              {/**Comment section */}
              <div className="flex flex-col gap-[20px] w-full  comment-section">
                <div className="w-full">
                  <CustomInputIcon
                    className={"w-full "}
                    placeholder="Write a comment...."
                    icon={
                      <Check fill={"white"} className="h-4 w-4  opacity-70" />
                    }
                    isComment={true}
                    text={"Send"}
                    isSubtle={true}
                  />
                </div>
                <div className="w-full flex flex-col gap-[16px] ">
                  <div className=" flex justify-between items-center">
                    <div className="flex capitalize justify-center items-center !text-sm gap-2 font-roboto-mono">
                      <IconButton className="bg-white  font-roboto-mono hover:bg-white h-6 w-6"></IconButton>
                      Player name
                    </div>
                    <IconButton className="font-roboto-mono">
                      <img src="/Icons/Dots.png" alt="" />
                    </IconButton>
                  </div>
                  <div className=" flex flex-col gap-[16px]">
                    <span className="running-text text-white">
                      I forced the industrial revolution.
                    </span>
                    <span className="running-text-mono text-gray2">
                      2 days ago
                    </span>

                    <CustomIcontext>
                      <img
                        src="/Icons/Like.svg"
                        alt=""
                        className="h-5 w-5 opacity-70"
                      />
                      <span>10</span>
                    </CustomIcontext>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/4 h-fit flex running-text-mono uppercase  flex-col max-h-auto bg-white/[8%] border border-white/10 rounded-[16px] p-5">
            <div className=" border-b border-white/10 pb-5">
              <span className=" text-gray2">CREATED:</span>
              <span className="ml-2">
                {moment(campaign.createdAt).fromNow()}
              </span>
            </div>
            <div className=" border-b border-white/10 py-5 ">
              <span className=" text-gray2 ">CREATED BY:</span>
              <span className="ml-2">{campaign.playerName}</span>
            </div>
            <div className="  border-white/10 pt-5 ">
              <span className=" text-gray2">UPDATED:</span>
              <span className="ml-2">
                {" "}
                {moment(campaign.updatedAt).fromNow()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
