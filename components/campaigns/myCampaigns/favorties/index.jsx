"use client";
import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Shared/Card/campaign";

export default function index({ campaigns }) {
  return (
    <div className='h-screen w-full flex flex-col pt-[120px] px-5 lg:px-12 pb-10 md:pb-64 '>
      <div className='flex flex-col gap-2.5 '>
        <div className='text-center flex justify-start text-white headline-3 z-[10] '>
          <span className='headline-3 z-[10]  '>
            Favorties
            <span className='text-gray2 ms-3 md:ms-4 font-roboto-mono transform translate-up text-[17px] md:text-[24px] translate-y-[-15px] md:translate-y-[-20px]'>
              ({campaigns.length})
            </span>
          </span>
        </div>
      </div>

      <div className='w-full text-white  z-[10] grid grid-cols-12 lg:grid-cols-12 gap-4 pt-9 md:pt-8'>
        {campaigns.map((campaign, i) => (
          <div
            key={i}
            className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 w-full min-w-full max-w-full'
          >
            <Card campaign={campaign} className={"!w-full !min-w-full"} />
          </div>
        ))}
      </div>
    </div>
  );
}
