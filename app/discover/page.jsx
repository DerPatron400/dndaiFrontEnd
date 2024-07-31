"use client";
import useUserStore from "@/utils/userStore";
import React, { useState, useEffect } from "react";
import Discover from "@/components/discover";
import { getCharacters } from "@/actions/character";
import {
  getMostLikedCampaigns,
  getPopularCampaigns,
} from "@/actions/campaigns";
import useCustomToast from "@/hooks/useCustomToast";

export default function page() {
  const { user } = useUserStore();
  const { invokeToast } = useCustomToast();

  const [campaigns, setCampaigns] = useState([]);
  const [popularCampaigns, setPopularCampaigns] = useState([]);
  const [characters, setCharacters] = useState([]);

  const handleGetPopularCampaigns = async () => {
    try {
      const response = await getPopularCampaigns();
      console.log(response, "Public Campaigns");
      setPopularCampaigns(response.campaigns);
    } catch (error) {
      invokeToast(
        error?.response?.data?.error || "Error fetching Public campaigns",
        "Error"
      );
      setPopularCampaigns([]);
      console.error("Error:", error);
    }
  };

  const handleGetMostLikedCampaigns = async () => {
    try {
      const response = await getMostLikedCampaigns();
      setCampaigns(response.campaigns);
    } catch (error) {
      invokeToast(
        error?.response?.data?.error || "Error fetching Community Favorites",
        "Error"
      );
      setCampaigns([]);
      console.error("Error:", error);
    }
  };

  const getAllCharacters = async () => {
    try {
      const response = await getCharacters(user?.token);
      console.log("response", response);
      setCharacters(response.characters);
    } catch (error) {
      invokeToast(
        error?.response?.data?.error || "Error fetching Characters",
        "Error"
      );
      setCharacters([]);
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    handleGetPopularCampaigns();
    handleGetMostLikedCampaigns();
    getAllCharacters();
  }, [user]);
  return (
    <Discover
      characters={characters}
      mostLiked={campaigns}
      popular={popularCampaigns}
    />
  );
}
