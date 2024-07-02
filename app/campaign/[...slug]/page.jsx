"use client";
import React, { useState, useEffect } from "react";
import Subpage from "@/components/campaigns/subpage/index";
import { getCampaignBySlug } from "@/actions/campaigns";
import Loader from "@/components/ui/Loader";

export default function page({ params }) {
  const [campaign, setCampaign] = useState();

  const handleGetyCampaign = async () => {
    try {
      const _campaign = await getCampaignBySlug(params.slug);

      setCampaign(_campaign.campaign);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleGetyCampaign();
  }, []);

  if (!campaign) return <Loader text={"Loading Campaign..."} />;
  return <Subpage campaign={campaign} setCampaign={setCampaign} />;
}
