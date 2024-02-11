"use client";
import React, { useEffect, useState } from "react";

import SaveGame from "@/components/Game/savegame/SaveGame";

import { fetchSavedGames } from "@/api/user";
import useUserStore from "@/utils/store/userStore";

export default function Page() {
  const [savedGames, setSavedGames] = useState([]);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const getSavedGames = async () => {
      try {
        const data = await fetchSavedGames(user.token);
        setSavedGames(data);
      } catch (error) {
        console.error("Failed to fetch saved games:", error);
        setSavedGames([]);
      }
    };

    getSavedGames();
  }, []); // The empty dependency array ensures this effect runs once on mount

  return <SaveGame data={savedGames} />;
}
