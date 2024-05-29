"use client";
import React, { useEffect, useState } from "react";
import CharacterSheet from "@/components/character/myCharacter/character-sheet";
import { getCharacter } from "@/actions/character";
import Loader from "@/components/ui/Loader";

export default function page({ params }) {
  const [character, setCharacter] = useState();

  const _getCharacter = async () => {
    try {
      const response = await getCharacter(params.slug);
      setCharacter(response.character);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    _getCharacter();
  }, []);

  if (!character) return <Loader text={"fetching details..."} />;

  console.log(character);
  return (
    <div className='bg-gradient text-white'>
      <CharacterSheet character={character} setCharacter={setCharacter} />
    </div>
  );
}
