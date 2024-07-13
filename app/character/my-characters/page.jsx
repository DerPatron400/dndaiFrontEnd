"use client";
import React, { useEffect, useState } from "react";
import Characters from "@/components/character/myCharacter/characters/index";
import { getCharacters } from "@/actions/character";
import useUserStore from "@/utils/userStore";
import Loader from "@/components/ui/Loader";
import CharacterPlaceholder from "@/components/ui/Shared/Placeholder/character";
import useCustomToast from "@/hooks/useCustomToast";
const dummy = [
  {
    personal: {
      name: "Retenia Snakeleaf",
      level: 0,
      background: "Sailor of the High Seas",
      race: "Plasmoid",
      class: "Blood Hunter",
      backgroundUrl: "",
      portraitUrl:
        "https://dndai-images.s3.eu-central-1.amazonaws.com/portrait/1718882791838.webp",
      gender: "male",
      portraits: [
        "https://dndai-images.s3.eu-central-1.amazonaws.com/portrait/1718882791838.webp",
      ],
    },
    _id: "6669cdbde871880bbe8e2db9",
    userId: "66648e921b131534b4a288ab",
    equipment: {
      weapon: "Battered Dagger",
      secondary: "harp",
      armor: "leather armor",
      misc: "disguise kit",
    },
    abilityScores: {
      strength: 15,
      dexterity: 11,
      constitution: 11,
      intelligence: 13,
      wisdom: 12,
      charisma: 12,
    },
    personality: {
      personalityTrait: "Enigmatic",
      ideal: "unity",
      bond: "family",
      flaw: "recklessness",
    },
    general: {
      alignment: "Lawful Good",
      gold: 5,
    },
    credits: 0,
    value:
      "**Character Sheet**\n\n- **Name:** Retenia Snakeleaf\n- **Gender:** Male\n- **Race:** Plasmoid\n- **Class:** Blood Hunter\n- **Alignment:** Lawful Good\n- **Level:** 1\n- **Hit Points:** 8\n- **XP:** 0\n- **Armor Class:** 11\n\n**Personality Traits:** Enigmatic\n\n**Ideal:** Unity\n\n**Bond:** Family\n\n**Flaw:** Recklessness\n\n**Ability Scores:**\n- Strength: 15\n- Dexterity: 11\n- Constitution: 11\n- Intelligence: 13\n- Wisdom: 12\n- Charisma: 12\n\n**Starting Equipment:**\n- 5 Gold\n- Battered Dagger\n- Harp\n- Leather Armor\n- Disguise Kit\n\n**Appearance:** Retenia Snakeleaf is a tall and lean Plasmoid with shimmering green skin and piercing yellow eyes. He wears tattered leather armor and carries himself with a quiet confidence.\n\n**Background:** Sailor of the High Seas\n\n**Abilities:** \n- Blood Maledict\n- Hunter's Bane\n- Crimson Rite\n\n**Spells:** None\n\n**Additional Notes:** Retenia Snakeleaf is a skilled Blood Hunter who seeks to bring unity and justice to the world. Despite his enigmatic nature, he is fiercely loyal to his family and friends. However, his recklessness can sometimes get him into trouble during his adventures on the high seas.",
    imageUrl: "",
    createdAt: "2024-06-12T16:33:01.665Z",
    updatedAt: "2024-06-20T11:26:33.462Z",
    __v: 1,
  },
];

//merge
export default function page() {
  const [characters, setCharacters] = useState();
  const { user } = useUserStore();
  const { invokeToast } = useCustomToast();

  const getAllCharacters = async () => {
    try {
      const response = await getCharacters(user?.token);
      console.log("response", response);
      setCharacters(response.characters);
    } catch (error) {
      invokeToast(
        error?.response?.data?.error || "Error fetching characters",
        "Error"
      );
      setCharacters([]);
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getAllCharacters();
  }, [user]);

  if (!characters) return <Loader text={"Loading Characters ..."} />;
  if (characters.length <= 0) return <CharacterPlaceholder />;
  return (
    <div className=' text-white'>
      <Characters characters={characters} />
    </div>
  );
}
