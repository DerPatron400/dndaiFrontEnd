import React from "react";
import CampaignCarousel from "@/components/ui/Shared/Carousel/campaign";
import CustomButton from "../custom-button";
import ArrowRight from "../Icons/ArrowRight";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
export default function row({ text, icon, campaigns, showMore }) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 z-[10]">
      <div className="flex px-5 md:px-12 text-gray2 running-text-mono uppercase gap-2 items-center">
        {icon}
        {text}
      </div>
      <CampaignCarousel campaigns={campaigns} className={"px-5 md:px-12"} />

      {showMore && campaigns.length >= 6 && (
        <CustomButton
          withIcon={true}
          variant={"primary"}
          className={"max-w-fit mx-auto mt-8"}
          onClick={() => router.push("/campaign/public")}
        >
          Show More <ArrowRight className="h-5 w-5 fill-russianViolet" />
        </CustomButton>
      )}
    </div>
  );
}
