import React from "react";
import CampaignDetails from "./campaignDetails";
import Settings from "@/components/campaigns/createCampaign/Settings/index";

export default function create({ campaign, handleSetCampaign }) {
  return (
    <div className='w-full h-full flex flex-col md:gap-5 gap-10 md:flex-row pt-4 md:pt-8 '>
      {/* Outer div with background color */}
      <div className='  h-full !max-h-[652px]  overflow-y-scroll hide-scrollbar text-white md:w-2/5 w-full md:border border-white/10 md:rounded-[16px] md:bg-white/[8%]  md:p-5 flex flex-col gap-5 '>
        <h1 className='headline-4'>Campaign Details</h1>
        <CampaignDetails
          campaign={campaign}
          handleSetCampaign={handleSetCampaign}
        />
      </div>

      {/* Inner div with overflow */}
      <div className='  h-full overflow-y-scroll rounded-[16px] hide-scrollbar md:w-3/5 w-full md:bg-white/[8%] bg-transparent  text-white '>
        <Settings campaign={campaign} handleSetCampaign={handleSetCampaign} />
      </div>
    </div>
  );
}
