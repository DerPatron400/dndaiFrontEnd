"use client";
import { getFavoriteCampaigns } from "@/actions/campaigns";
import Loader from "@/components/ui/Loader";
import useUserStore from "@/utils/userStore";
import React, { useState, useEffect } from "react";
import Favorties from "@/components/campaigns/myCampaigns/favorties/index";

export default function page() {
  const [campaigns, setCampaigns] = useState();
  const { user } = useUserStore();

  const fetchCampaigns = async () => {
    try {
      const response = await getFavoriteCampaigns(user?.token);
      setCampaigns(response.campaigns);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!user?.token) {
      setCampaigns([]);
      return;
    }

    fetchCampaigns();
  }, [user]);

  if (!campaigns) return <Loader text='Fetching campaigns...' />;
  return <Favorties campaigns={campaigns} />;
}
