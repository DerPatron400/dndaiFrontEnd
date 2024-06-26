"use client";
import React, { useState } from "react";

import Choose from "./Choose";

export default function Index({ campaign, handleSetCampaign }) {
  return (
    <div className=' text-white rounded-[16px]  flex justify-start  items-start gap-5 h-full md:h-full  w-full pb-40 md:pb-0'>
      <Choose campaign={campaign} handleSetCampaign={handleSetCampaign} />
    </div>
  );
}
