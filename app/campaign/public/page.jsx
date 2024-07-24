"use client";
import React, { useEffect, useState, Suspense } from "react";
import { getPublicImages } from "@/actions/user";
import Loader from "@/components/ui/Loader";
import useUserStore from "@/utils/userStore";
import { useRouter } from "next/navigation";
import useCustomToast from "@/hooks/useCustomToast";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import PublicCampaigns from "@/components/campaigns/public";
import { getPublicCampaigns } from "@/actions/campaigns";

function PublicCampaignsContainer() {
  const [campaigns, setCampaigns] = useState();
  const { user, setTotalPublicCampaigns } = useUserStore();
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const router = useRouter();
  const { invokeToast } = useCustomToast();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = parseInt(searchParams.get("page")) || 1;

  const handleGetCampaigns = async () => {
    try {
      const response = await getPublicCampaigns(page);
      setCampaigns(response.campaigns);
      setTotalPages(response.totalPages);
      setTotalRecords(response.totalRecords);
      setTotalPublicCampaigns(response.totalRecords);
    } catch (error) {
      invokeToast(error?.response?.data || "Error fetching Campaigns", "Error");
      setCampaigns([]);
      setTotalPages(1);
      setTotalPublicCampaigns(0);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleGetCampaigns();
  }, [page]);

  if (!searchParams.get("page")) {
    router.push(pathname + "?page=1");
  }
  if (!campaigns) return <Loader text='Loading Campaigns...' />;

  return (
    <PublicCampaigns
      campaigns={campaigns}
      totalPages={totalPages}
      totalRecords={totalRecords}
    />
  );
}

export default function page() {
  return (
    <Suspense>
      <PublicCampaignsContainer />
    </Suspense>
  );
}
