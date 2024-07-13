"use client";
import React, { useEffect, useState } from "react";
import CustomIcontext from "@/components/ui/custom-icontext";
import CustomInputIcon from "@/components/ui/custom-input-icon";
import CustomIconbutton from "@/components/ui/custom-iconbutton";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import CustomMenuItem from "@/components/ui/custom-menu-item";
import { cn } from "@/lib/utils";
import useUserStore from "@/utils/userStore";
import {
  commentOnCampaign,
  deleteComment,
  getComments,
  likeComment,
} from "@/actions/campaigns";
import moment from "moment";
import Delete from "@/components/ui/Icons/Delete";
import Send from "@/components/ui/Icons/Send";
import Like from "@/components/ui/Icons/Like";
import useCustomToast from "@/hooks/useCustomToast";

const Comment = ({ comment, handleUpdateComments, handleRemoveComment }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserStore();
  const { invokeToast } = useCustomToast();

  const handleLikeComment = async () => {
    if (!user?.token || isLoading) return;

    setIsLoading(true);
    try {
      const response = await likeComment(comment._id, user.token);

      handleUpdateComments({
        ...comment,
        analytics: {
          ...comment.analytics,
          likes: response.likes,
        },
      });
    } catch (error) {
      invokeToast("Error liking comment", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComment = async () => {
    if (!user?.token || isLoading) return;

    setIsLoading(true);
    try {
      await deleteComment(comment._id, user?.token);
      handleRemoveComment(comment);
    } catch (error) {
      invokeToast("Error deleting comment", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full flex flex-col gap-[16px] py-4 '>
      <div className=' flex justify-between items-center'>
        <div className='flex  justify-center uppercase items-center !text-sm gap-2 font-roboto-mono'>
          <CustomIconbutton className='bg-white   font-roboto-mono hover:bg-white h-6 w-6'></CustomIconbutton>
          {comment.playerName}
        </div>
        {comment.userId === user._id && (
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
                <CustomMenuItem onClick={handleDeleteComment}>
                  <Delete className='h-4 w-4 fill-errorRed' />
                  <span>DELETE COMMENT</span>
                </CustomMenuItem>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div className=' flex flex-col gap-[16px]'>
        <span className='running-text text-white'>{comment.comment}</span>
        <span className='running-text-mono text-gray2'>
          {moment(comment.createdAt).fromNow()}
        </span>

        <CustomIcontext onClick={handleLikeComment} disabled={isLoading}>
          <Like
            className='h-5 w-5 fill-white opacity-70'
            isfilled={
              comment.analytics.likes.includes(user?._id) ? "true" : null
            }
          />
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
  const { invokeToast } = useCustomToast();

  const handleUpdateComments = (comment) => {
    let _comments = comments.filter((c) => c._id !== comment._id);
    _comments.push(comment);
    _comments = _comments.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setComments(_comments);
  };

  const handleRemoveComment = (comment) => {
    setComments(comments.filter((c) => c._id !== comment._id));
  };
  const handleGetComments = async () => {
    try {
      const response = await getComments(campaign._id, user?.token);

      setComments(response.comments);
    } catch (error) {
      invokeToast("Error getting comments", "error");
      setComments([]);
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
      invokeToast("Error commenting", "error");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetComments();
  }, [campaign]);

  return (
    <div className='flex flex-col gap-[20px] w-full  px-5 md:px-0 comment-section'>
      <div className='w-full'>
        <CustomInputIcon
          value={comment}
          disabled={isLoading}
          onClick={addComment}
          onChange={(e) => setComment(e)}
          className={"w-full "}
          placeholder='Write a comment....'
          icon={<Send fill={"white"} className='h-4 w-4  opacity-70' />}
          isComment={true}
          text={"Send"}
          isSubtle={true}
        />
      </div>
      <div>
        {comments.map((comment, index) => (
          <Comment
            handleUpdateComments={handleUpdateComments}
            handleRemoveComment={handleRemoveComment}
            key={index}
            comment={comment}
          />
        ))}
      </div>
    </div>
  );
}
