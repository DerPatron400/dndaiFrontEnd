import React from "react";
import CreateCampaign from "@/components/campaigns/createCampaign/index";

export default function page() {
  return (
    <div className='h-full md:h-screen w-full relative z-[10] pt-[130px] md:pt-[120px] md:pb-[188px]'>
      <CreateCampaign />
    </div>
  );
}
