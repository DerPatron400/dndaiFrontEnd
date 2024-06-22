import React from "react";
import CampaignCarousel from "@/components/ui/Shared/Carousel/campaign";
export default function row({ text, icon, campaigns }) {
  return (
    <div className="flex flex-col gap-4 z-[10]">
      <div className="flex px-5 md:px-12 text-gray2 running-text-mono uppercase gap-2 items-center">
        {icon}
        {text}
      </div>
      <CampaignCarousel campaigns={campaigns} className={"px-5 md:px-12"} />
    </div>
  );
}
