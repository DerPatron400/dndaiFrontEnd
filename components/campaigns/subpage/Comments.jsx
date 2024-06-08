import React from "react";
import CustomIcontext from "@/components/ui/custom-icontext";
import CustomInputIcon from "@/components/ui/custom-input-icon";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import { Check } from "lucide-react";

const Comment = ({ comment }) => {
  return (
    <div className='w-full flex flex-col gap-[16px] py-4 '>
      <div className=' flex justify-between items-center'>
        <div className='flex capitalize justify-center items-center !text-sm gap-2 font-roboto-mono'>
          <CustomIconbutton className='bg-white  font-roboto-mono hover:bg-white h-6 w-6'></CustomIconbutton>
          Player name
        </div>
        <CustomIconbutton className='font-roboto-mono'>
          <img src='/Icons/Dots.png' alt='' />
        </CustomIconbutton>
      </div>
      <div className=' flex flex-col gap-[16px]'>
        <span className='running-text text-white'>
          I forced the industrial revolution.
        </span>
        <span className='running-text-mono text-gray2'>2 days ago</span>

        <CustomIcontext>
          <img src='/Icons/Like.svg' alt='' className='h-5 w-5 opacity-70' />
          <span>10</span>
        </CustomIcontext>
      </div>
    </div>
  );
};

export default function Comments() {
  return (
    <div className='flex flex-col gap-[20px] w-full  comment-section'>
      <div className='w-full'>
        <CustomInputIcon
          className={"w-full "}
          placeholder='Write a comment....'
          icon={<Check fill={"white"} className='h-4 w-4  opacity-70' />}
          isComment={true}
          text={"Send"}
          isSubtle={true}
        />
      </div>
      <div>
        <Comment />
        <Comment />
      </div>
    </div>
  );
}
