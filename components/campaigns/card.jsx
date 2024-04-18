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

export default function card() {
  return (
    <div className='rounded-xl h-auto w-[345px] border border-russianViolet'>
      <Card className='w-full h-full shadow-md shadow-[#6E6DFF26]/10 rounded-2xl border-none bg-russianViolet'>
        <CardHeader className='h-full relative'>
          <img
            src='/images/Header.png'
            alt=''
            className='h-full w-full rounded-tl-xl rounded-tr-xl object-cover'
          />
          <div className='absolute text-xs text-white p-4 flex w-full justify-between items-center'>
            <div className='flex justify-center items-center !text-sm gap-2 font-roboto-mono'>
              <IconButton className='bg-white  font-roboto-mono hover:bg-white h-6 w-6'></IconButton>
              PLAYERS NAME
            </div>
            <div className='flex justify-center items-center gap-2'>
              <IconButton className='bg-blur transition-all duration-300 ease-in-out group hover:bg-white border border-iconColor'>
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
        <CardContent className='h-full rounded-bl-2xl rounded-br-2xl running-text-mono flex flex-col justify-around p-5 '>
          <CardTitle className='font-roboto-mono mb-4 text-white text-xl font-light'>
            CAMPAIGNS NAME
          </CardTitle>
          <CardDescription className='text-iconColor truncate  text-wrap !text-sm !tracking-[0.01em] max-h-16'>
            Lorem ipsum dolor sit amet consectetur. Libero morbi facilisi velit
            facilisis ipsum. Lacus suspendisse quam adipiscing risus pr
          </CardDescription>
          <div className='flex justify-between items-center gap-5 mt-4 text-white'>
            <div className='flex items-center gap-x-3 '>
              <div className='flex justify-between items-center gap-2 '>
                <ThumbsUp size={16} opacity={0.5} />{" "}
                <span className='running-text-small'>1.7K</span>
              </div>
              <div className='flex justify-between items-center gap-2'>
                <Play size={16} opacity={0.5} />{" "}
                <span className='running-text-small'>1.7K</span>
              </div>
            </div>
            <Button className='gap-2 bg-white/10 hover:bg-white/[12%] w-auto'>
              <Play size={14} /> <span>Play</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
