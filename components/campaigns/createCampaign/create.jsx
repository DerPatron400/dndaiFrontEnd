import React from "react";
import CampaignDetails from "./campaignDetails";
import Settings from "@/components/campaigns/createCampaign/Settings/index";

export default function create() {
  return (
    <div className="w-full flex flex-col md:flex-row pt-9 md:pt-8 border">
      {/* Outer div with background color */}
      <div className="text-white w-2/5 border-white/10 rounded-[16px] bg-white/[8%] p-[20px] flex flex-col gap-[20px]">
        <h1 className="headline-4">Campaign Details</h1>
        <CampaignDetails />
      </div>

      {/* Inner div with overflow */}
      <div className="md:ms-10 min-h-auto w-3/5 bg-white/[8%] text-white ">
        <Settings />
      </div>
    </div>
  );
}
