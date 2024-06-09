"use client";
import React, { useEffect, useState } from "react";
import CustomIcontext from "@/components/ui/custom-icontext";
import CustomInputIcon from "@/components/ui/custom-input-icon";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import { Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import CustomMenuItem from "@/components/ui/custom-menu-item";
import { cn } from "@/lib/utils";
import useUserStore from "@/utils/userStore";
import { commentOnCampaign, getComments } from "@/actions/campaigns";
import moment from "moment";

const Comment = ({ comment }) => {
  console.log(comment);
  const [open, setOpen] = useState(false);
  return (
    <div className='w-full flex flex-col gap-[16px] py-4 '>
      <div className=' flex justify-between items-center'>
        <div className='flex capitalize justify-center items-center !text-sm gap-2 font-roboto-mono'>
          <CustomIconbutton className='bg-white  font-roboto-mono hover:bg-white h-6 w-6'></CustomIconbutton>
          {comment.playerName}
        </div>
        <DropdownMenu onOpenChange={(e) => setOpen(e)} open={open} asChild>
          <DropdownMenuTrigger
            className={cn(
              "outline-none bg-white/10 h-9 w-9 border border-white/10 hover:border-white/20 active:border-white/40  transition-all duration-300  flex items-center justify-center rounded-full",
              open && "border-white/40"
            )}
          >
            <CustomIconbutton
              className={cn(
                "outline-none bg-white/10 h-9 w-9 border border-white/10 hover:border-white/20 active:border-white/40  transition-all duration-300  flex items-center justify-center rounded-full",
                open && "border-white/40"
              )}
            >
              <img src='/Icons/Dots.png' alt='' />
            </CustomIconbutton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-transparent uppercase flex flex-col mt-4 p-2 !px-[9px]  border border-white/10 z-[10] bg-blur menu-shadow text-white running-text-mono rounded-[16px] !gap-y-2'>
            <DropdownMenuItem className='flex !p-0  !my-0 w-full focus:bg-transparent focus:text-white  transition-all duration-300 ease-linear cursor-pointer'>
              <CustomMenuItem>
                <img
                  src='/Icons/Report.svg'
                  alt=''
                  className='h-5 w-5  opacity-70'
                />
                <span>REPORT COMMENT</span>
              </CustomMenuItem>
            </DropdownMenuItem>
            <DropdownMenuItem className='flex !p-0  !my-0 w-full focus:bg-transparent focus:text-white  transition-all duration-300 ease-linear cursor-pointer'>
              <CustomMenuItem>
                <img
                  src='/Icons/Block.svg'
                  alt=''
                  className='h-5 w-5 invert opacity-70'
                />
                <span>BLOCK USER</span>
              </CustomMenuItem>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className=' flex flex-col gap-[16px]'>
        <span className='running-text text-white'>{comment.comment}</span>
        <span className='running-text-mono text-gray2'>
          {moment(comment.createdAt).fromNow()}
        </span>

        <CustomIcontext>
          <img src='/Icons/Like.svg' alt='' className='h-5 w-5 opacity-70' />
          <span>{comment.analytics.likes.length}</span>
        </CustomIcontext>
      </div>
    </div>
  );
};

export default function Comments({ campaign }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserStore();

  const handleGetComments = async () => {
    try {
      const response = await getComments(campaign._id, user?.token);

      setComments(response.comments);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addComment = async () => {
    setIsLoading(true);
    try {
      const response = await commentOnCampaign(
        campaign._id,
        comment,
        user?.token
      );
      setComment("");
      console.log(response.comment);
      setComments([...comments, response.comment]);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetComments();
  }, [campaign]);

  return (
    <div className='flex flex-col gap-[20px] w-full  comment-section'>
      <div className='w-full'>
        <CustomInputIcon
          value={comment}
          disabled={isLoading}
          onClick={addComment}
          onChange={(e) => setComment(e)}
          className={"w-full "}
          placeholder='Write a comment....'
          icon={<Check fill={"white"} className='h-4 w-4  opacity-70' />}
          isComment={true}
          text={"Send"}
          isSubtle={true}
        />
      </div>
      <div>
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
}
