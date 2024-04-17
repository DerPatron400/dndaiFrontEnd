import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThumbsUp, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/iconButton";

export default function card() {
  return (
    <div className="">
      <Card className="w-[25vw] h-[65vh] rounded-xl">
        <CardHeader className="h-[55%] relative">
          <img
            src="/images/Header.png"
            alt=""
            className="h-full w-full rounded-tl-xl rounded-tr-xl object-cover"
          />
          <div className="absolute text-xs text-white p-4 flex w-full justify-between items-center">
            <div className="flex justify-center items-center gap-2 running-text">
              <IconButton className="bg-white hover:bg-white h-6 w-6"></IconButton>
              PLAYERS NAME
            </div>
            <div className="flex justify-center items-center gap-2">
              <IconButton className="bg-blur hover:bg-white border border-iconColor"></IconButton>
              <IconButton className="bg-blur hover:bg-white border border-iconColor"></IconButton>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[35%] running-text-mono flex flex-col justify-around p-4 bg-russianViolet">
          <CardTitle className="running-text-mono text-white">
            CAMPAIGNS NAME
          </CardTitle>
          <CardDescription className="text-iconColor">
            Lorem ipsum dolor sit amet consectetur. Libero morbi facilisi velit
            facilisis ipsum. Lacus suspendisse quam adipiscing risus pr
          </CardDescription>
        </CardContent>
        <CardFooter className="flex w-full justify-between h-[10%] text-white">
          <div className="flex justify-center items-center gap-4">
            <div className="flex justify-between items-center gap-2 ">
              <ThumbsUp size={16} />{" "}
              <span className="running-text-small">1.7K</span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <Play size={16} />{" "}
              <span className="running-text-small">1.7K</span>
            </div>
          </div>
          <Button className="gap-2">
            <Play size={14} /> <span>Play</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
