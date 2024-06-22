"use client";
import React, { useEffect, useState } from "react";
import Characters from "@/components/character/myCharacter/characters/index";
import { getCharacters } from "@/actions/character";
import useUserStore from "@/utils/userStore";
import Loader from "@/components/ui/Loader";
import CharacterPlaceholder from "@/components/ui/Shared/Placeholder/character";

export default function page() {
  const [characters, setCharacters] = useState();
  const { user } = useUserStore();

  const getAllCharacters = async () => {
    try {
      const response = await getCharacters(user?.token);
      console.log("response", response);
      setCharacters(response.characters);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getAllCharacters();
  }, [user]);

  if (!characters) return <Loader text={"Fetching Characters..."} />;
  if (characters.length <= 0) return <CharacterPlaceholder />;
  return (
    <div className='bg-gradient text-white'>
      <Characters characters={characters} />
    </div>
  );
}
