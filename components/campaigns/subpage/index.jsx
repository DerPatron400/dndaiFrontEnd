"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/ui/custom-button";
import CustomIcontext from "@/components/ui/custom-icontext";
import Play from "@/components/ui/Icons/Play";
import { extractSection } from "@/lib/Helpers/shared";
import TimeStamps from "./Timestamps";
import Comments from "./Comments";
import Details from "./Details";
import Delete from "@/components/ui/Icons/Delete";
import World from "@/components/ui/Icons/World";
import useUserStore from "@/utils/userStore";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  deleteCampaign,
  publishCampaign,
  unPublishCampaign,
  likeCampaign,
} from "@/actions/campaigns";

const TopButtons = ({ campaign, setCampaign }) => {
  const { user } = useUserStore();
  const isCreator = campaign.userId === user._id;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      if (user?._id !== campaign.userId) {
        return;
      }

      await deleteCampaign(campaign._id, user?.token);

      router.push("/campaign/my-campaigns");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    setIsLoading(true);
    try {
      const response = await publishCampaign(campaign._id, user?.token);

      setCampaign((prev) => ({
        ...prev,
        isPublished: response.isPublished,
      }));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnpublish = async () => {
    setIsLoading(true);
    try {
      const response = await unPublishCampaign(campaign._id, user?.token);
      console.log(response);
      setCampaign((prev) => ({
        ...prev,
        isPublished: response.isPublished,
      }));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const downloadWorldMap = async () => {
    const url = campaign?.worldMapUrl || "/campaignheader.png";
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const a = document.createElement("a");
      const urlObject = URL.createObjectURL(blob);

      a.href = urlObject;
      a.download = "worldmap.png";
      document.body.appendChild(a);
      a.click();

      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(urlObject);
    } catch (error) {
      console.error("Error downloading the world map:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    setIsLoading(true);
    try {
      const response = await likeCampaign(campaign._id, user?.token);
      setCampaign((prev) => ({
        ...prev,
        analytics: {
          ...prev.analytics,
          likes: response.likes,
        },
      }));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='flex flex-col md:flex-row justify-between w-full'>
      <div className='flex justify-start items-start md:items-center gap-8 w-full md:w-3/4 flex-col md:flex-row'>
        <div className='flex items-start justify-start'>
          <Button withIcon variant={"primary"}>
            <Play size={14} /> <span>Play campaign</span>
          </Button>
        </div>
        <div className='flex gap-8 justify-start items-start'>
          <CustomIcontext disabled={isLoading} onClick={handleLike}>
            <img src='/Icons/Like.svg' alt='' className='h-5 w-5 opacity-70' />
            <span>{campaign.analytics.likes.length}</span>
          </CustomIcontext>
          <CustomIcontext>
            <Play className='h-5 w-5 fill-white opacity-70' />
            <span>{campaign.analytics.plays.length}</span>
          </CustomIcontext>
          <CustomIcontext>
            <img
              src='/Icons/Star.svg'
              alt=''
              className='h-5 w-5 opacity-70 invert'
            />
            <span>{campaign.analytics.stars.length}</span>
          </CustomIcontext>
          <CustomIcontext>
            <img
              src='/Icons/Share.svg'
              alt=''
              className='h-5 w-5 opacity-70 invert'
            />{" "}
            <span>Share</span>
          </CustomIcontext>
        </div>
      </div>
      <div className='flex gap-2 md:gap-6 items-start md:justify-end md:items-end flex-col md:flex-row'>
        <Button
          disabled={isLoading}
          onClick={campaign.isPublished ? handleUnpublish : handlePublish}
          withIcon
          variant={"subtle"}
          className={cn(!isCreator && "hidden")}
        >
          <World className='h-5 w-5 fill-white' />{" "}
          <span>{campaign.isPublished ? "Unpublish" : "Publish"}</span>
        </Button>
        <Button
          disabled={isLoading}
          onClick={handleDelete}
          withIcon
          variant={"subtle"}
          className={cn(!isCreator && "hidden")}
        >
          <Delete className='h-5 w-5 fill-errorRed' /> <span>Delete</span>
        </Button>
        <Button disabled={isLoading} onClick={downloadWorldMap} withIcon>
          <img
            src='/Icons/Download.svg'
            className='h-5 w-5 opacity-75 invert'
            alt=''
          />{" "}
          <span>Download world map</span>
        </Button>
      </div>
    </div>
  );
};

const TabButtons = ({ activeTab, onClick, icon, text }) => {
  return (
    <Button onClick={onClick} withIcon className={"bg-transparent"}>
      <img src={icon} className='h-5 w-5 opacity-75 invert' alt='' />{" "}
      <span>{text}</span>
    </Button>
  );
};

export default function index({ campaign, setCampaign }) {
  const [activeTab, setActiveTab] = useState("comments");
  const [hook, setHook] = useState("");
  const [plot, setPlot] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const _hook = extractSection(campaign.adventure, "hook");
    const _plot = extractSection(campaign.adventure, "plot");
    const _time = extractSection(campaign.adventure, "time");
    setHook(_hook);
    setPlot(_plot);
    setTime(_time);
  }, [campaign]);
  return (
    <div className='min-h-screen h-full w-full flex flex-col border bg-gradient pt-[172px] md:pt-[0px]  lg:px-0 md:pb-64 '>
      <div className='h-[400px] w-full z-[10] relative'>
        <img
          src={campaign?.worldMapUrl || "/campaignheader.png"}
          alt=''
          className='h-full w-full object-cover'
        />
        <div className=' absolute bottom-10 px-10 flex flex-col gap-2.5  '>
          <div className='text-center flex justify-start text-white headline-3 z-[10] '>
            <span className='headline-3 z-[10] headline-3'>
              {campaign.title}
            </span>
          </div>
        </div>
      </div>

      <div className='w-full flex flex-col gap-[20px] text-white z-[10] pt-9 md:pt-8 px-4 lg:px-12'>
        <TopButtons campaign={campaign} setCampaign={setCampaign} />
        <div className='w-full  h-full flex flex-col-reverse md:flex-row justify-between gap-[20px]'>
          <div className='w-full md:w-3/4 flex flex-col gap-[20px] bg-white/[8%]  border-white/10 rounded-[16px]'>
            <div className='flex flex-col gap-6 p-[20px]'>
              <div className='flex justify-start items-center flex-wrap gap-4 '>
                <TabButtons
                  onClick={() => setActiveTab("details")}
                  icon={"/Icons/Eye.svg"}
                  text={"Details"}
                />
                <TabButtons
                  onClick={() => setActiveTab("comments")}
                  icon={"/Icons/Comment.svg"}
                  text={"Comments"}
                />
                <TabButtons icon={"/Icons/Adventure.svg"} text={"Adventures"} />
              </div>
              {/**Details section */}

              {activeTab === "details" && (
                <Details
                  details={{
                    time,
                    plot,
                    hook,
                  }}
                  setting={campaign.setting}
                />
              )}
              {activeTab === "comments" && <Comments campaign={campaign} />}

              {/**Comment section */}
            </div>
          </div>
          <TimeStamps campaign={campaign} />
        </div>
      </div>
    </div>
  );
}
