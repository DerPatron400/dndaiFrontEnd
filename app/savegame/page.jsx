import SaveGame from "@/components/savegame/SaveGame";
import React from "react";
import { cookies } from "next/headers";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const getSavedGames = async () => {
  const cookieStore = cookies();

  const uid = cookieStore.get("uid").value;

  try {
    const response = await axios.get(BACKEND_URL + "/api/savedGames", {
      params: {
        _id: uid,
      },
    });

    return response.data;
  } catch (error) {
    return [];
  }
};

export default async function Page() {
  const savedGames = await getSavedGames();
  return <SaveGame data={savedGames} />;
}
