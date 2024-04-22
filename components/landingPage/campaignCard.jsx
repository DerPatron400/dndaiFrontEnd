import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function campaignCard() {
  return (
    <div className="rounded-xl h-auto w-[300px] border border-russianViolet">
      <Card className="w-full h-full shadow-md shadow-[#6E6DFF26]/10 rounded-2xl border-none bg-russianViolet">
        <CardHeader className="h-full relative">
          <img
            src="/images/Header.png"
            alt=""
            className="h-full w-full rounded-tl-xl rounded-tr-xl object-cover"
          />
        </CardHeader>
        <CardContent className="h-full rounded-bl-2xl rounded-br-2xl running-text-mono flex flex-col justify-around p-5 bg-blur-2">
          <CardTitle className="font-roboto-mono mb-4 text-white text-xl font-light">
            CAMPAIGNS NAME
          </CardTitle>
          <CardDescription className="text-iconColor truncate  text-wrap !text-sm !tracking-[0.01em] max-h-16">
            Lorem ipsum dolor sit amet consectetur. Libero morbi facilisi velit
            facilisis ipsum. Lacus suspendisse quam adipiscing risus pr
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
