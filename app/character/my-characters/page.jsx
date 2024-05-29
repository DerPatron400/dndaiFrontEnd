"use client";
import React, { useEffect, useState } from "react";
import Characters from "@/components/character/myCharacter/characters/index";
import { getCharacters } from "@/actions/character";
import useUserStore from "@/utils/userStore";
import Loader from "@/components/ui/Loader";

export default function page() {
  const [characters, setCharacters] = useState();
  const { user } = useUserStore();

  const getAllCharacters = async () => {
    try {
      const token = user?.token || "";
      const response = await getCharacters(token);
      setCharacters(response.characters);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getAllCharacters();
  }, []);

  if (!characters) return <Loader text={"Fetching Characters..."} />;

  return (
    <div className='bg-gradient text-white'>
      <Characters characters={characters} />
    </div>
  );
}
