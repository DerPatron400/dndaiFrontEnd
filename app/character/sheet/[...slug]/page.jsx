"use client";
import React, { useEffect, useState } from "react";
import CharacterSheet from "@/components/character/myCharacter/character-sheet";
import { getCharacter } from "@/actions/character";
import Loader from "@/components/ui/Loader";
const _character = {
  personal: {
    name: "Yuela Ashford",
    level: 0,
    background: "Dungeon Delver",
    race: "Simic Hybrid",
    class: "Ranger",
    backgroundUrl: "",
    portraitUrl:
      "https://dndai-images.s3.eu-central-1.amazonaws.com/portrait/1718881268481.webp",
    gender: "diverse",
    portraits: [
      "https://dndai-images.s3.eu-central-1.amazonaws.com/portrait/1716921718428.png",
      "https://dndai-images.s3.eu-central-1.amazonaws.com/portrait/1716921832110.png",
      "https://dndai-images.s3.eu-central-1.amazonaws.com/portrait/1716921942883.png",
      "https://dndai-images.s3.eu-central-1.amazonaws.com/portrait/1716997880885.png",
      "https://dndai-images.s3.eu-central-1.amazonaws.com/portrait/1716998089943.png",
      "https://dndai-images.s3.eu-central-1.amazonaws.com/portrait/1716998212056.png",
      "https://dndai-images.s3.eu-central-1.amazonaws.com/portrait/1716998486169.png",
      "https://dndai-images.s3.eu-central-1.amazonaws.com/portrait/1718881198908.webp",
      "https://dndai-images.s3.eu-central-1.amazonaws.com/portrait/1718881268481.webp",
    ],
  },
  _id: "665610d33fd5e800e9b6add4",
  userId: "665610cb3fd5e800e9b6add1",
  equipment: {
    weapon: "battered axe",
    secondary: "cleric symbol",
    armor: "plate armor",
    misc: "disguise kit",
  },
  abilityScores: {
    strength: 14,
    dexterity: 12,
    constitution: 11,
    intelligence: 12,
    wisdom: 13,
    charisma: 13,
  },
  personality: {
    personalityTrait: "Equisitive",
    ideal: "victory",
    bond: "redemption",
    flaw: "paranoia",
  },
  general: {
    alignment: "true evil",
    gold: 10,
  },
  credits: 0,
  value:
    "**Character Sheet: Yuela Ashford**\n\n- **Level:** 1\n- **Hit Points:** 10\n- **XP:** 0\n- **Armor Class:** 18\n\n- **Personality Traits:** Inquisitive\n- **Ideal:** Knowledge is power, and I will do whatever it takes to uncover the truth.\n- **Bond:** My loyalty lies with those who can help me achieve my goals.\n- **Flaw:** I trust no one and always expect betrayal.\n\n- **Alignment:** True Evil\n\n- **Ability Scores:**\n  - Strength: 14\n  - Dexterity: 12\n  - Constitution: 11\n  - Intelligence: 12\n  - Wisdom: 13\n  - Charisma: 13\n\n- **Equipment:**\n  - Battered axe\n  - Cleric symbol\n  - Plate armor\n  - Disguise kit\n  - Gold: 10\n\n- **Weapon:** Battered axe\n- **Secondary:** Cleric symbol\n- **Armor:** Plate armor\n\n- **Appearance:** Yuela has green scales covering her body, webbed fingers, and sharp teeth, a testament to her Simic Hybrid heritage.\n\n- **Background:** Dungeon Delver\n\n- **Abilities:** Skilled in tracking, survival, and axe combat\n\n- **Spells:**\n  - Hunter's Mark\n  - Cure Wounds\n\n- **Additional Notes:** Yuela is a ruthless and cunning ranger driven by a desire for victory. Her paranoia fuels her actions, always keeping her on guard against potential threats.",
  imageUrl: "",
  createdAt: "2024-05-28T17:13:55.385Z",
  updatedAt: "2024-06-26T18:51:45.975Z",
  __v: 9,
};
export default function page({ params }) {
  const [character, setCharacter] = useState();

  const handleGetCharacter = async () => {
    try {
      const response = await getCharacter(params.slug);
      setCharacter(response.character);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    handleGetCharacter();
  }, []);

  if (!character) return <Loader text={"loading character..."} />;

  console.log(character);
  return (
    <div className='bg-gradient text-white'>
      <CharacterSheet character={character} setCharacter={setCharacter} />
    </div>
  );
}
