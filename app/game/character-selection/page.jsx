"use client";
import React, { useEffect, useState } from "react";
import { getCharacters } from "@/actions/character";
import useUserStore from "@/utils/userStore";
import Loader from "@/components/ui/Loader";
import CharacterPlaceholder from "@/components/ui/Shared/Placeholder/character";

import SelectCharacter from "@/components/game/selectCharacter/index";
import useCustomToast from "@/hooks/useCustomToast";
export default function page() {
  const [characters, setCharacters] = useState();
  const { user } = useUserStore();
  const { invokeToast } = useCustomToast;

  const getAllCharacters = async () => {
    try {
      const response = await getCharacters(user?.token);
      console.log("response", response);
      setCharacters(response.characters);
    } catch (error) {
      invokeToast(
        error?.response?.data?.error || "Error fetching Characters",
        "Error"
      );
      setCharacters([]);
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getAllCharacters();
  }, [user?.token]);

  if (!characters) return <Loader text={"Loading Characters..."} />;
  if (characters.length <= 0) return <CharacterPlaceholder />;
  return <SelectCharacter characters={characters} />;
}
