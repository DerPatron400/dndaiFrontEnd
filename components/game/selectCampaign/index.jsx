import React, { useState, useEffect } from "react";
import Row from "@/components/ui/Shared/DiscoverRow";
import Star from "@/components/ui/Icons/Star";
import World from "@/components/ui/Icons/World";
import CustomButton from "@/components/ui/custom-button";
import CampaignAdd from "@/components/ui/Icons/CampaignAdd";
import SearchInput from "@/components/ui/search-input";
import { useDebounce } from "@/hooks/useDebounce";
import { searchCampaigns } from "@/actions/campaigns";
import useGameStore from "@/utils/gameStore";
import GeneralGameTabbar from "@/components/ui/Shared/TabBar/generalGame";

export default function index({ popular, mostLiked }) {
  const [query, setQuery] = useState("");
  const [searchedCampaign, setSearchedCampaign] = useState(null); // [campaign1, campaign2, ...
  const debouncedQuery = useDebounce(query, 500);
  const { currentCharacter } = useGameStore();
  console.log("currentCharacter", currentCharacter);
  const handleSearchCampaign = async () => {
    // search campaign
    try {
      console.log("debouncedQuery", debouncedQuery);
      const { campaigns } = await searchCampaigns(debouncedQuery);
      console.log("campaigns", campaigns);
      setSearchedCampaign(campaigns);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (debouncedQuery) {
      handleSearchCampaign();
    } else {
      setSearchedCampaign(null);
    }
  }, [debouncedQuery]);
  return (
    <div className='!z-[10] text-white relative w-full h-full   pb-12 pt-[86px] md:pt-[128px] '>
      <div className='  flex justify-center items-center relative flex-col mx-12 '>
        <h1 className='headline-3 text-center '>
          Forge your destiny <br />
          and choose{" "}
          <span className='text-irisPurpleLight'>your campaign!</span>
        </h1>

        <CustomButton
          withIcon={true}
          className={
            "hidden md:flex absolute top-1/2 -translate-y-1/2 right-0 "
          }
        >
          <CampaignAdd className='h-5 w-5 fill-white' />
          Create Campaign
        </CustomButton>
      </div>
      <SearchInput
        query={query}
        setQuery={setQuery}
        placeholder='Search campaign'
        className={"mt-8 w-[92%] md:w-4/5 md:max-w-[465px] mx-auto"}
      />
      <div className='flex flex-col gap-16 w-full mt-9'>
        {searchedCampaign && (
          <Row
            text={"Search results"}
            campaigns={searchedCampaign}
            icon={<World className='h-5 w-5 fill-gray2' />}
          />
        )}

        <Row
          text={"Community Favorites"}
          campaigns={mostLiked}
          icon={<Star isfilled={"true"} className='h-5 w-5 fill-gray2' />}
        />
        <Row
          text={"Public games"}
          campaigns={popular}
          icon={<World className='h-5 w-5 fill-gray2' />}
          showMore={true}
        />
      </div>
      <GeneralGameTabbar />
    </div>
  );
}
