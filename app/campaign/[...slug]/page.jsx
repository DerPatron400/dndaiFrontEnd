"use client";
import React, { useState, useEffect } from "react";
import Subpage from "@/components/campaigns/subpage/index";
import { getCampaignBySlug } from "@/actions/campaigns";
import Loader from "@/components/ui/Loader";
import useCustomToast from "@/hooks/useCustomToast";
import { useRouter } from "next/navigation";
const dummy = {
  analytics: {
    likes: [],
    plays: [
      "66680e88336d28219dfc93bc",
      "66680e88336d28219dfc93bc",
      "66680e88336d28219dfc93bc",
      "66680e88336d28219dfc93bc",
      "66680e88336d28219dfc93bc",
    ],
    stars: ["66680e88336d28219dfc93bc"],
    comments: [],
  },
  _id: "669671cae47442f55baaae46",
  userId: "66680e88336d28219dfc93bc",
  worldMapUrl:
    "https://dndai-images.s3.eu-central-1.amazonaws.com/portrait/1721135561330.webp",
  isPublished: false,
  title: "Hey",
  time: "Paleolithic Time",
  plot: "hey",
  hook: "hey",
  setting: "Celestial Realm",
  adventure: {
    title: "Hey",
    setting: "Celestial Realm",
    time: "Paleolithic Time",
    plot: "In the Celestial Realm during the Paleolithic Time, the balance between light and darkness is threatened by a mysterious force. The celestial beings, who have always lived in harmony, are now facing a crisis as their realm is plunged into chaos. In the midst of this turmoil, a group of unlikely heroes is brought together by fate. The group, consisting of a brave warrior, a wise healer, a cunning rogue, and a powerful mage, must embark on a perilous journey to restore balance to the Celestial Realm. Along the way, they will face dangerous challenges, uncover ancient secrets, and forge unlikely alliances. As they delve deeper into the heart of the conflict, the heroes will discover that the true power to save their realm lies within themselves. Can they overcome their differences and work together to defeat the darkness threatening to consume their world? Or will they succumb to the forces of chaos and despair?",
    hook: "Hey, the fate of the Celestial Realm is in your hands. Will you rise to the challenge and become the heroes that the realm needs?",
  },
  createdAt: "2024-07-16T13:12:42.595Z",
  updatedAt: "2024-07-30T17:59:31.525Z",
  __v: 6,
  playerName: "aimen",
};
export default function page({ params }) {
  const [campaign, setCampaign] = useState();
  const { invokeToast } = useCustomToast();
  const router = useRouter();
  const handleGetyCampaign = async () => {
    try {
      const _campaign = await getCampaignBySlug(params.slug);

      setCampaign(_campaign.campaign);
      console.log(_campaign.campaign);
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
