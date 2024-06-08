import React from "react";
import CampaignDetails from "./campaignDetails";
import Settings from "@/components/campaigns/createCampaign/Settings/index";

export default function create({ campaign, handleSetCampaign }) {
  return (
    <div className='w-full h-full  flex flex-col md:flex-row pt-9 md:pt-8 '>
      {/* Outer div with background color */}
      <div className=' h-full overflow-y-scroll hide-scrollbar  text-white w-2/5 border-white/10 rounded-[16px] bg-white/[8%] p-[20px] flex flex-col gap-[20px] '>
        <h1 className='headline-4'>Campaign Details</h1>
        <CampaignDetails
          campaign={campaign}
          handleSetCampaign={handleSetCampaign}
        />
      </div>

      {/* Inner div with overflow */}
      <div className='md:ms-10  h-full overflow-y-scroll rounded-[16px] hide-scrollbar w-3/5 bg-white/[8%]  text-white '>
        <Settings campaign={campaign} handleSetCampaign={handleSetCampaign} />
      </div>
    </div>
  );
}
