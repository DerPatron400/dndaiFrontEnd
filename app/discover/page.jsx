"use client";
import useUserStore from "@/utils/userStore";
import React, { useState, useEffect } from "react";
import Discover from "@/components/discover";
import { getCharacters } from "@/actions/character";
import {
  getMostLikedCampaigns,
  getPopularCampaigns,
} from "@/actions/campaigns";

export default function page() {
  const { user } = useUserStore();

  const [campaigns, setCampaigns] = useState([]);
  const [popularCampaigns, setPopularCampaigns] = useState([]);

  const handleGetPopularCampaigns = async () => {
    try {
      const response = await getPopularCampaigns();
      setPopularCampaigns(response.campaigns);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGetMostLikedCampaigns = async () => {
    try {
      const response = await getMostLikedCampaigns();
      setCampaigns(response.campaigns);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    handleGetPopularCampaigns();
    handleGetMostLikedCampaigns();
  }, [user]);
  return <Discover mostLiked={campaigns} popular={popularCampaigns} />;
}
