"use client";
import { getFavoriteCampaigns } from "@/actions/campaigns";
import Loader from "@/components/ui/Loader";
import useUserStore from "@/utils/userStore";
import React, { useState, useEffect } from "react";
import Favorties from "@/components/campaigns/myCampaigns/favorties/index";
import useCustomToast from "@/hooks/useCustomToast";
export default function page() {
  const [campaigns, setCampaigns] = useState();
  const { invokeToast } = useCustomToast();
  const { user } = useUserStore();

  const fetchCampaigns = async () => {
    try {
      const response = await getFavoriteCampaigns(user?.token);
      setCampaigns(response.campaigns || []);
    } catch (error) {
      console.log(error);
      invokeToast("Error fetching favorites", "error");
      setCampaigns([]);
    }
  };
  useEffect(() => {
    if (!user?.token) {
      setCampaigns([]);
      return;
    }

    fetchCampaigns();
  }, [user]);

  if (!campaigns) return <Loader text='Loading Favorites ...' />;
  return <Favorties campaigns={campaigns} />;
}
