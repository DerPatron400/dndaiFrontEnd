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
  const [characters, setCharacters] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [popularCampaigns, setPopularCampaigns] = useState([]);
  const getAllCharacters = async () => {
    try {
      const response = await getCharacters(user?.token);
      console.log("response", response);
      setCharacters(response.characters);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
    getAllCharacters();
    handleGetPopularCampaigns();
    handleGetMostLikedCampaigns();
  }, [user]);
  return (
    <Discover
      mostLiked={campaigns}
      popular={popularCampaigns}
      characters={characters}
    />
  );
}
