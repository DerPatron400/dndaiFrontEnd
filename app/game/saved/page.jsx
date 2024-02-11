"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie for client-side cookie handling
import SaveGame from "@/components/Game/savegame/SaveGame";

import { fetchSavedGames } from "@/api/user";

export default function Page() {
  const [savedGames, setSavedGames] = useState([]);

  useEffect(() => {
    const getSavedGames = async () => {
      const uid = Cookies.get("uid"); // Use js-cookie to get the cookie

      try {
        const response = await axios.get(`${BACKEND_URL}/api/savedGames`, {
          params: {
            _id: uid,
          },
        });

        setSavedGames(response.data);
      } catch (error) {
        console.error("Failed to fetch saved games:", error);
        setSavedGames([]);
      }
    };

    getSavedGames();
  }, []); // The empty dependency array ensures this effect runs once on mount

  return <SaveGame data={savedGames} />;
}
