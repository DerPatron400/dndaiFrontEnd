import React from "react";
import moment from "moment";
export default function Timestamps({ campaign }) {
  return (
    <div className='w-1/4 h-fit flex running-text-mono uppercase  flex-col max-h-auto bg-white/[8%] border border-white/10 rounded-[16px] p-5'>
      <div className=' border-b border-white/10 pb-5'>
        <span className=' text-gray2'>CREATED:</span>
        <span className='ml-2'>{moment(campaign.createdAt).fromNow()}</span>
      </div>
      <div className=' border-b border-white/10 py-5 '>
        <span className=' text-gray2 '>CREATED BY:</span>
        <span className='ml-2'>{campaign.playerName}</span>
      </div>
      <div className='  border-white/10 pt-5 '>
        <span className=' text-gray2'>UPDATED:</span>
        <span className='ml-2'> {moment(campaign.updatedAt).fromNow()}</span>
      </div>
    </div>
  );
}
