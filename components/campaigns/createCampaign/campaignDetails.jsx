import React from "react";
import CustomInput from "@/components/ui/custom-input";
import CustomDropdown from "@/components/ui/custom-dropdown";
import CustomTextArea from "@/components/ui/custom-textArea";
import { TIMES } from "./constants";

export default function campaignDetails({ campaign, handleSetCampaign }) {
  return (
    <div className='flex   flex-col gap-[20px] '>
      <CustomInput
        value={campaign.title}
        onChange={(e) => {
          if (e.length <= 50) handleSetCampaign("title", e);
        }}
        placeholder='Title (50 characters max.)'
      />
      <CustomDropdown
        className={"min-w-full !w-full !m-0"}
        placeholder={"dropdown"}
        options={TIMES}
        selectedOption={campaign.time}
        setSelectedOption={(e) => handleSetCampaign("time", e)}
      />
      <CustomTextArea
        value={campaign.plot}
        onChange={(e) => {
          handleSetCampaign("plot", e);
        }}
        className={"h-[200px] "}
        placeholder='PLOT'
        maxLength={2500}
      />
      <CustomTextArea
        value={campaign.hook}
        onChange={(e) => {
          handleSetCampaign("hook", e);
        }}
        className={"h-[180px] "}
        placeholder='HOOK'
        maxLength={1500}
      />
    </div>
  );
}
