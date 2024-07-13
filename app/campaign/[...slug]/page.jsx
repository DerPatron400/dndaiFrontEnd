"use client";
import React, { useState, useEffect } from "react";
import Subpage from "@/components/campaigns/subpage/index";
import { getCampaignBySlug } from "@/actions/campaigns";
import Loader from "@/components/ui/Loader";
import useCustomToast from "@/hooks/useCustomToast";
import { useRouter } from "next/navigation";
export default function page({ params }) {
  const [campaign, setCampaign] = useState();
  const { invokeToast } = useCustomToast();
  const router = useRouter();
  const handleGetyCampaign = async () => {
    try {
      const _campaign = await getCampaignBySlug(params.slug);

      setCampaign(_campaign.campaign);
    } catch (error) {
      invokeToast(
        error?.response?.data?.error || "Error fetching campaign",
        "Error"
      );
      router.push("/campaign/my-campaigns");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleGetyCampaign();
  }, []);

  if (!campaign) return <Loader text={"Loading Campaign..."} />;
  return <Subpage campaign={campaign} setCampaign={setCampaign} />;
}
