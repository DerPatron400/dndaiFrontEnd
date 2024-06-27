"use client";
import React, { useEffect, useState } from "react";
import Play from "@/components/ui/Icons/Play";
import Button from "@/components/ui/custom-button";
import IconButton from "@/components/ui/custom-iconbutton";
import { cn } from "@/lib/utils";
import CustomIcontext from "@/components/ui/custom-icontext";
import { useRouter } from "next/navigation";
import { likeCampaign, starCampaign } from "@/actions/campaigns";
import useUserStore from "@/utils/userStore";
import Star from "@/components/ui/Icons/Star";
import useGameStore from "@/utils/gameStore";
import { extractSection } from "@/lib/Helpers/shared";

export default function card({
  campaign,

  className,
  handleUpdateCampaigns,
}) {
  const router = useRouter();
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentCampaign } = useGameStore();
  const [plot, setPlot] = useState(campaign?.plot);

  useEffect(() => {
    const _plot = extractSection(campaign.adventure, "plot");

    setPlot(_plot || campaign.plot);
  }, []);

  const handleRedirect = (event) => {
    const classNames =
      event?.target?.className?.baseVal || event?.target?.className;

    if (!classNames?.includes("prevent-redirect")) {
      router.push(`/campaign/${campaign._id}`);
    }
  };

  const handleStar = async () => {
    try {
      setIsLoading(true);

      const response = await starCampaign(campaign._id, user?.token);
      console.log(response);
      handleUpdateCampaigns({
        ...campaign,
        analytics: {
          ...campaign.analytics,
          stars: response.stars,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      setIsLoading(true);
      const response = await likeCampaign(campaign._id, user?.token);
      handleUpdateCampaigns({
        ...campaign,
        analytics: {
          ...campaign.analytics,
          likes: response.likes,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlay = () => {
    setCurrentCampaign(campaign);
    router.push("/game/play");
  };

  return (
    <div
      className={cn(
        "rounded-[16px] cursor-pointer bg-russianViolet h-full group hover:!shadow-custom-1 min-w-[90vw] w-[90vw] my-0 max-w-[90vw] ease-animate  overflow-hidden md:min-w-[345px] md:w-[345px]  border-white/[8%] border hover:border-white/20 running-text-mono   ",
        className
      )}
    >
      <div className='w-full h-full flex flex-col  bg-white/[8%] hover:bg-white/10   ease-animate '>
        <div className='relative '>
          <img
            onClick={handleRedirect}
            src={campaign?.worldMapUrl || "/images/Header.png"}
            alt=''
            className='h-[248px] w-full  object-cover'
          />
          <div
            className={cn(
              "absolute top-0 text-xs text-white p-4 flex w-full justify-between items-center"
            )}
          >
            <div
              onClick={handleRedirect}
              className='flex capitalize justify-center items-center !text-sm gap-2 font-roboto-mono'
            >
              <IconButton className='bg-white  font-roboto-mono hover:bg-white h-6 w-6'></IconButton>
              {campaign?.playerName}
            </div>
            <div className='flex justify-center items-center gap-2  prevent-redirect'>
              <IconButton className='bg-blur group  border border-iconColor opacity-0 group-hover:opacity-100   prevent-redirect'>
                <img
                  src='/Icons/Share.svg'
                  alt=''
                  className='h-5 w-5 group-hover:opacity-100 invert  prevent-redirect'
                />
              </IconButton>
              <IconButton
                disabled={isLoading || !user?.token}
                onClick={handleStar}
                className='bg-blur group  border border-iconColor opacity-0 group-hover:opacity-100   prevent-redirect'
              >
                <Star
                  isfilled={
                    campaign?.analytics?.stars?.includes(user?._id)
                      ? "true"
                      : undefined
                  }
                  className='h-5 w-5 fill-white  group-hover:opacity-100  prevent-redirect'
                />
              </IconButton>
            </div>
          </div>
        </div>
        <div
          onClick={handleRedirect}
          className='  flex flex-col h-full justify-between flex-1  p-5  '
        >
          <div className='  flex flex-col justify-around '>
            <span className='mb-4 h-12  headline-4 text-white '>
              {campaign?.title}
            </span>
            <span className='text-gray2 capitalize running-text-small truncate  text-wrap  max-h-16'>
              {plot}
            </span>
          </div>
          <div
            className={cn(
              "flex justify-between items-center gap-5 mt-auto text-white"
            )}
          >
            <div className='flex items-center gap-x-3 running-text-mono '>
              <CustomIcontext
                disabled={isLoading}
                onClick={handleLike}
                className={"prevent-redirect"}
              >
                <img
                  src='/Icons/Like.svg'
                  alt=''
                  className='h-5 w-5 opacity-70 prevent-redirect'
                />
                <span>{campaign?.analytics.likes.length}</span>
              </CustomIcontext>
              <CustomIcontext>
                <Play className='h-5 w-5 fill-white opacity-70' />
                <span>{campaign?.analytics.plays.length}</span>
              </CustomIcontext>
            </div>
            <Button onClick={handlePlay} withIcon className='prevent-redirect'>
              <Play className='h-5 w-5 fill-white opacity-70 prevent-redirect' />
              <span className='prevent-redirect'>Play</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
