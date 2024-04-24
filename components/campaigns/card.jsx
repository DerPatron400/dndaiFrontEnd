"use client";
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
import Button from "@/components/ui/custom-button";
import IconButton from "@/components/ui/custom-iconbutton";
import { cn } from "@/lib/utils";

// Card component
export default function card({ carousel }) {
  return (
    <div className='rounded-xl h-full  min-w-[345px] w-[345px]  border-white/10 border running-text-mono '>
      <Card className='w-full h-full hover:shadow-custom-1 rounded-2xl border-none bg-russianViolet transition-all duration-200 ease-in-out '>
        <CardHeader className='relative '>
          <img
            src='/images/Header.png'
            alt=''
            className='h-[248px] w-full rounded-tl-xl rounded-tr-xl object-cover'
          />
          <div
            className={cn(
              "absolute text-xs text-white p-4 flex w-full justify-between items-center",
              carousel && "hidden"
            )}
          >
            <div className='flex justify-center items-center !text-sm gap-2 font-roboto-mono'>
              <IconButton className='bg-white  font-roboto-mono hover:bg-white h-6 w-6'></IconButton>
              PLAYERS NAME
            </div>
            <div className='flex justify-center items-center gap-2'>
              <IconButton className='bg-blur ease-animate group hover:bg-white border border-iconColor'>
                <SquareArrowOutUpRight
                  size={15}
                  className='group-hover:text-iconColor'
                />
              </IconButton>
              <IconButton className='bg-blur group hover:bg-white border border-iconColor'>
                <Star size={15} className='group-hover:text-iconColor' />
              </IconButton>
            </div>
          </div>
        </CardHeader>
        <CardContent className=' rounded-bl-2xl rounded-br-2xl flex flex-col justify-around p-5 '>
          <CardTitle className='mb-4 headline-4 text-white '>
            CAMPAIGNS NAME
          </CardTitle>
          <CardDescription className='text-iconColor running-text-small truncate  text-wrap  max-h-16'>
            Lorem ipsum dolor sit amet consectetur. Libero morbi facilisi velit
            facilisis ipsum. Lacus suspendisse quam adipiscing risus pr
          </CardDescription>
          <div
            className={cn(
              "flex justify-between items-center gap-5 mt-4 text-white",
              carousel && "hidden"
            )}
          >
            <div className='flex items-center gap-x-3 running-text-mono '>
              <div className='flex justify-between items-center gap-2 '>
                <ThumbsUp size={16} opacity={0.5} /> <span>1.7K</span>
              </div>
              <div className='flex justify-between items-center gap-2'>
                <Play size={16} opacity={0.5} /> <span>4.7K</span>
              </div>
            </div>
            <Button withIcon>
              <Play size={14} /> <span>Play</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
