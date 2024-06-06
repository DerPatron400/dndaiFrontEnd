import React from "react";
import CustomInput from "@/components/ui/custom-input";
import CustomDropdown from "@/components/ui/custom-dropdown";
import CustomTextArea from "@/components/ui/custom-textArea";

export default function campaignDetails() {
  return (
    <div className='flex flex-col gap-[20px] h-full !mb-10'>
      <CustomInput
        //   value={value}
        //   onChange={(e) => setValue(e)}
        placeholder='Title (50 characters max.)'
      />
      <CustomDropdown
        className={"min-w-full !w-full !m-0"}
        placeholder={"dropdown"}
        options={["option1", "option2", "option3"]}
      />
      <CustomTextArea
        //   value={value}
        //   onChange={(e) => setValue(e)}
        className={"h-[200px] running-text-mono"}
        placeholder='PLOT'
      />
      <CustomTextArea
        //   value={value}
        //   onChange={(e) => setValue(e)}
        className={"h-[180px] running-text-mono"}
        placeholder='HOOK'
      />
    </div>
  );
}
