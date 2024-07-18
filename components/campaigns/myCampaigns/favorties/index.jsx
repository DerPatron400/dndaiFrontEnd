"use client";
import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Shared/Card/campaign";
import GeneralTabbar from "@/components/ui/Shared/TabBar/general";

export default function index({ campaigns }) {
  return (
    <div className='h-screen w-full flex flex-col pt-[118px] px-5 lg:px-12  pb-10 md:pt-[128px] '>
      <div className='hidden md:flex flex-col  gap-x-2.5 '>
        <div className='text-center flex justify-start text-white headline-3 z-[10] '>
          <span className='headline-3 z-[10] relative '>
            Favorties
            <span className='absolute text-gray2 ms-3 md:ms-4 font-roboto-mono transform translate-up text-[17px] md:text-[24px] translate-y-[-10px]'>
              ({campaigns.length})
            </span>
          </span>
        </div>
      </div>
      <div className='w-full text-white  z-[9] grid grid-cols-12 lg:grid-cols-12 gap-4 pt-9 md:pt-8 pb-28 md:pb-o'>
        {campaigns.map((campaign, i) => (
          <div
            key={i}
            className='col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 2xl:col-span-2 w-full min-w-full max-w-full'
          >
            <Card
              favorite={true}
              campaign={campaign}
              className={"!w-full !min-w-full"}
            />
          </div>
        ))}
      </div>
      <GeneralTabbar showSearch={false} />
    </div>
  );
}
