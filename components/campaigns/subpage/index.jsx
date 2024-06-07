"use client";
import React from "react";
import Button from "@/components/ui/custom-button";
import CustomIcontext from "@/components/ui/custom-icontext";
import { Play } from "lucide-react";

export default function index() {
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
            <span className="headline-3 z-[10] headline-3">Campaign Name</span>
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
              <span>1.7K</span>
            </CustomIcontext>
            <CustomIcontext>
              <img
                src="/Icons/Play.svg"
                alt=""
                className="h-5 w-5 opacity-70"
              />{" "}
              <span>4.7K</span>
            </CustomIcontext>
            <CustomIcontext>
              <img
                src="/Icons/Star.svg"
                alt=""
                className="h-5 w-5 opacity-70 invert"
              />
              <span>940</span>
            </CustomIcontext>
            <CustomIcontext>
              <img
                src="/Icons/Share.svg"
                alt=""
                className="h-5 w-5 opacity-70 invert"
              />{" "}
              <span>4.7K</span>
            </CustomIcontext>
          </div>
          <div className="w-1/4 flex justify-end items-end">
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
            <div className="flex flex-col gap-[20px] p-[20px]">
              <div className="flex justify-start items-center gap-4 ">
                <Button withIcon className={"bg-transparent"}>
                  <img
                    src="/Icons/Download.svg"
                    className="h-5 w-5 opacity-75 invert"
                    alt=""
                  />{" "}
                  <span>Details</span>
                </Button>
                <Button withIcon className={"bg-transparent"}>
                  <img
                    src="/Icons/Download.svg"
                    className="h-5 w-5 opacity-75 invert"
                    alt=""
                  />{" "}
                  <span>Comments</span>
                </Button>
                <Button withIcon className={"bg-transparent"}>
                  <img
                    src="/Icons/Download.svg"
                    className="h-5 w-5 opacity-75 invert"
                    alt=""
                  />{" "}
                  <span>Adventures</span>
                </Button>
              </div>
              <div className="flex gap-[20px] w-full">
                <div className="w-1/2 flex flex-col gap-[16px]">
                  {Array.from({ length: 3 }, (_, i) => (
                    <div className=" flex flex-col gap-[16px]">
                      <span className="running-text-mono text-gray2">TIME</span>
                      <p className="running-text-small">
                        Lorem ipsum dolor sit amet consectetur. Libero morbi
                        facilisi velit facilisis. Lacus suspendisse quam
                        adipiscing vestibulum risus proin ut eu. Proin diam in
                        morbi sed integer et feugiat quam turpis.
                      </p>
                    </div>
                  ))}
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
              </div>
            </div>
          </div>
          <div className="w-1/4 h-1/4 bg-white/[8%] border border-white/10 rounded-[16px] p-[20px]">
            <div className="running-text-mono border-b border-gray-600 p-2">
              <span className="running-text-mono text-gray2">CREATED:</span>
              <span className="ml-2">24 DAYS AGO</span>
            </div>
            <div className="running-text-mono border-b border-gray-600 p-2">
              <span className="running-text-mono text-gray2">CREATED BY:</span>
              <span className="ml-2">24 DAYS AGO</span>
            </div>
            <div className="running-text-mono border-b border-gray-600 p-2">
              <span className="running-text-mono text-gray2">UPDATED:</span>
              <span className="ml-2">24 DAYS AGO</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
