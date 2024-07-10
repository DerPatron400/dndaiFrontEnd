"use client";
import { getCredits } from "@/actions/character";
import useUserStore from "@/utils/userStore";
import React, { useEffect } from "react";

export default function page() {
  const { user, setYellowCredits, setBlueCredits } = useUserStore();

  const handleUpdateCredits = async () => {
    try {
      const { credits } = await getCredits(user.token);
      setYellowCredits(credits.yellowCredits);
      setBlueCredits(credits.blueCredits);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (user?.token) handleUpdateCredits();
  }, [user.token]);
  return <div>success</div>;
}
