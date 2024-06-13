"use client";
import React, { useState, useEffect } from "react";
import MyCampaigns from "@/components/campaigns/myCampaigns/index";
import useUserStore from "@/utils/userStore";
import { getCampaignsByUser } from "@/actions/campaigns";
import Loader from "@/components/ui/Loader";

export default function page() {
  const [campaigns, setCampaigns] = useState();

  const { user } = useUserStore();

  const handleGetCampaigns = async () => {
    try {
      const _campaigns = await getCampaignsByUser(user?.token);

      setCampaigns(_campaigns.campaigns);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (!user?.token) {
      setCampaigns([]);
      return;
    }
    handleGetCampaigns();
  }, [user]);

  if (!campaigns) {
    return <Loader text={"Fetching Campaigns..."} />;
  }
  return <MyCampaigns campaigns={campaigns} setCampaigns={setCampaigns} />;
}
