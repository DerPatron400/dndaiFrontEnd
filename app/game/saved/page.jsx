import SaveGame from "@/components/Game/savegame/SaveGame";
import React from "react";
import { cookies } from "next/headers";

import { fetchSavedGames } from "@/api/user";

const getSavedGames = async () => {
  const cookieStore = cookies();

  const token = cookieStore.get("token").value;

  try {
    const response = await fetchSavedGames(token);

    return response.reverse() || [];
  } catch (error) {
    return [];
  }
};

export default async function Page() {
  const savedGames = await getSavedGames();
  return <SaveGame data={savedGames} />;
}
