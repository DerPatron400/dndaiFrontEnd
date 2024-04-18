import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThumbsUp, Play, SquareArrowOutUpRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/iconButton";

export default function CommentBox() {
  return (
    <div className='rounded-2xl h-auto w-[600px] '>
      <Card className='w-full h-full shadow-md shadow-[#6E6DFF26]/10 rounded-2xl border-none bg-russianViolet p-5 px-4'>
        <CardHeader className='h-1/3 relative mb-14'>
          <div className='absolute text-xs text-white  flex w-full justify-between items-center'>
            <div className='flex justify-center items-center !text-sm gap-2 font-roboto-mono'>
              <IconButton className='bg-white  font-roboto-mono hover:bg-white h-6 w-6'></IconButton>
              PLAYERS NAME
            </div>
            <div className='flex justify-center items-center gap-2'>
              <Star size={15} className='group-hover:text-iconColor' />
            </div>
          </div>
        </CardHeader>
        <CardContent className='h-2/3 rounded-bl-2xl rounded-br-2xl font-helvetica-now-display flex flex-col justify-around '>
          <CardDescription className='text-white  text-base text-wrap !tracking-[0.01em] '>
            I forced the industrial revolution.
          </CardDescription>
          <CardDescription className='text-gray2   text-wrap text-sm !tracking-[0.01em] '>
            2 days ago
          </CardDescription>
          <div className='flex justify-between items-center gap-5 mt-4 text-white'>
            <div className='flex items-center gap-x-3 '>
              <div className='flex justify-between items-center gap-2 '>
                <ThumbsUp size={16} opacity={0.5} />{" "}
                <span className='running-text-small'>24</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
