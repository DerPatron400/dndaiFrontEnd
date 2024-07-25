"use client";
import React, { Suspense, useEffect, useState } from "react";
import Game from "@/components/game/gamepage/index";
import useGameStore from "@/utils/gameStore";
import Loader from "@/components/ui/Loader";
import { getGame, initiateGame } from "@/actions/game";
import useUserStore from "@/utils/userStore";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import useCustomToast from "@/hooks/useCustomToast";
import useControlsStore from "@/utils/controlsStore";
import { getCredits } from "@/actions/character";
const dummyGame = {
  _id: "66a001fae0fa71648219e164",
  campaignId: "666af01056751cbcba5cbf23",
  characterId: "6696f23daf8e3f587425bd1b",
  conversations: [
    {
      role: "system",
      content:
        "Be the Dungeonmaster for a turn-based DnD Campaign about “Title: Find the Furry Boss and Feed Him a Carrot\n\nSetting: Hidden Valley during Renaissance Time\n\nPlot:\nIn the enchanted realm of Hidden Valley, a curse transforms the wise ruler into a furry creature, and the only way to break the spell is by feeding him a magical carrot yet to be grown. As a young prince seeking to prove your valor, you set out on a quest to locate the elusive furry boss, but first must master farming and alchemy to cultivate the special carrot.\n\nHook:\nEmbark on a journey of farming and alchemy to grow the magical carrot, essential for breaking the curse and saving Hidden Valley - will you succeed in mastering both arts and fulfill your kingdom's destiny?” For: “Dushasiez Amos, a male Arakocra Artificer at Level 1 with 6 HP, AC 13, 0 XP, an Arcane Scholar background, and true good alignment, has ability scores of 8 in all stats, personality traits of being adventurous, valuing harmony, seeking revenge, and being impulsive, 20 gold, and equipment including a wooden club, tarot deck, wooden armor, and thieves tools, with an appearance of sleek black feathers, amber eyes, confident demeanor, wooden armor, and a tool belt filled with gadgets, specializing in crafting mechanical wonders, driven by a desire for harmony, loyalty, and revenge, and often embarking on adventures.” Every response provided always make sure to mention the race and class of the main protagonist and offer engaging choices, including a free-choice. The free-choice should allow the user to dictate their own adventure, fostering a sense of player-led initiative and creativity. Award XP upon completing challenges and level up character following D&D rules. In combat, reveal enemy stats and ensure compliance with D&D guidelines. Ensure that every action or decision in the game, where a dice roll is required, uses only a D20 dice roll. Always awaits Users input",
    },
    {
      role: "assistant",
      content:
        "**Dungeonmaster:** \n\nAs the sun rises over Hidden Valley, the vibrant colors of dawn paint the sky in shades of gold and orange. You, Dushasiez Amos, the male Arakocra Artificer, stretch your sleek black feathers and prepare for the day ahead. Your heart beats with the thrill of adventure, and the weight of your quest to find the furry boss and feed him a magical carrot rests heavily on your mind.\n\nWith your wooden armor snug around you and your tool belt jingling with gadgets, you stand at the edge of your village, the scent of earth and fresh grass wafting through the air. The villagers speak of a hidden grove where the magical carrot seeds are said to grow, but the path is fraught with challenges. You recall tales of mischievous creatures, treacherous terrain, and the art of farming that might be necessary to cultivate the carrot.\n\n**What would you like to do?**\n\n1. **Head to the hidden grove directly** to search for the magical carrot seeds.\n2. **Visit the village elder** to gather more information about the curse and the furry boss.\n3. **Practice your farming skills** in a nearby field to learn how to grow the magical carrot.\n4. **Explore your surroundings** for any hidden treasures or clues.\n\n**Free-Choice:** Describe a unique approach or action you would like to take in this adventure, and I will adapt the story accordingly! \n\nWhat’s your choice, Dushasiez?",
    },
    {
      role: "user",
      content: "hey, Roll: 16",
    },
    {
      role: "assistant",
      content:
        '**Dungeonmaster:**\n\nWith a roll of 16, your adventurous spirit ignites as you decide to **visit the village elder**. You take to the skies, your wings catching the morning breeze, and soar over the village until you reach a quaint hut adorned with vibrant flowers and colorful tapestries. The elder, a wise and kindly figure with a long white beard, sits outside on a wooden stool, sipping herbal tea.\n\nAs you approach, he looks up, his amber eyes twinkling with intrigue. "Ah, young Dushasiez! I sensed you would come. What knowledge do you seek today?" \n\nYou feel the weight of your quest on your shoulders and share your goal of finding the furry boss and the magical carrot. The elder nods thoughtfully and offers you some valuable information.\n\n"The furry boss resides in the enchanted glade, but it is said he is guarded by creatures of mischief. To break the curse, you must gather three ingredients for the magical carrot: Moonlight Dew, Sunflower Pollen, and Whispers of the Wind. Each ingredient is found in a different location, and you will need to overcome challenges to obtain them."\n\n**You now have three quests to choose from:**\n\n1. **Seek the Moonlight Dew** at the Crystal Lake, known for its shimmering waters.\n2. **Collect Sunflower Pollen** from the Sunflower Fields, where playful sprites flit about.\n3. **Gather Whispers of the Wind** from the Whispering Woods, where the trees are said to speak secrets.\n\n**Free-Choice:** Or, if you have a different idea or plan in mind, feel free to describe it!\n\nWhat will you do next, Dushasiez?',
    },
  ],
  state:
    '**Dungeonmaster:**\n\nWith a roll of 16, your adventurous spirit ignites as you decide to **visit the village elder**. You take to the skies, your wings catching the morning breeze, and soar over the village until you reach a quaint hut adorned with vibrant flowers and colorful tapestries. The elder, a wise and kindly figure with a long white beard, sits outside on a wooden stool, sipping herbal tea.\n\nAs you approach, he looks up, his amber eyes twinkling with intrigue. "Ah, young Dushasiez! I sensed you would come. What knowledge do you seek today?" \n\nYou feel the weight of your quest on your shoulders and share your goal of finding the furry boss and the magical carrot. The elder nods thoughtfully and offers you some valuable information.\n\n"The furry boss resides in the enchanted glade, but it is said he is guarded by creatures of mischief. To break the curse, you must gather three ingredients for the magical carrot: Moonlight Dew, Sunflower Pollen, and Whispers of the Wind. Each ingredient is found in a different location, and you will need to overcome challenges to obtain them."\n\n**You now have three quests to choose from:**\n\n1. **Seek the Moonlight Dew** at the Crystal Lake, known for its shimmering waters.\n2. **Collect Sunflower Pollen** from the Sunflower Fields, where playful sprites flit about.\n3. **Gather Whispers of the Wind** from the Whispering Woods, where the trees are said to speak secrets.\n\n**Free-Choice:** Or, if you have a different idea or plan in mind, feel free to describe it!\n\nWhat will you do next, Dushasiez?',
  createdAt: "2024-07-23T19:18:18.413Z",
  updatedAt: "2024-07-23T19:25:47.517Z",
  __v: 1,
};
function GameHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const { invokeToast } = useCustomToast();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [gameCampaign, setGameCampaign] = useState();
  const [gameCharacter, setGameCharacter] = useState();

  const {
    currentCampaign,
    currentCharacter,
    setGame,
    game,
    setCurrentCharacter,
    setCurrentCampaign,
  } = useGameStore();
  const { user, setBlueCredits, setYellowCredits } = useUserStore();
  const { setShowCreditsDialogue } = useControlsStore();
  const [response, setResponse] = useState();

  const handleInitiateGame = async () => {
    console.log(user, "user");
    if (user.blueCredits < 1) {
      console.log("here");
      setShowCreditsDialogue(true);

      return;
    }
    console.log("currentCampaign", currentCampaign);
    console.log("currentCharacter", currentCharacter);
    try {
      const { game, character } = await initiateGame(
        {
          campaignId: currentCampaign._id,
          characterId: currentCharacter._id,
        },
        user?.token
      );

      setResponse(game.state);

      setGame(game);
      setCurrentCharacter(null);
      setCurrentCampaign(null);
      setGameCharacter(character);

      //push to the game page with the game id
      router.push(`${pathname}?id=${game._id}`);
    } catch (error) {
      invokeToast(error?.response?.data || "Error Initiating Game", "Error");
      router.push("/discover");
      console.log(error);
    } finally {
      const { credits } = await getCredits(user?.token);
      setBlueCredits(credits.blueCredits);
      setYellowCredits(credits.yellowCredits);
    }
  };

  const handleGetGame = async () => {
    try {
      const { game, character, campaign } = await getGame(id, user?.token);
      setGame(game);
      setResponse(game?.state);
      setCurrentCharacter(null);
      setCurrentCampaign(null);
      setGameCharacter(character);
      setGameCampaign(campaign);
    } catch (error) {
      invokeToast(error?.response?.data || "Error Fetching Game", "Error");
      router.push("/discover");

      console.log(error);
    }
  };
  useEffect(() => {
    if (id) {
      handleGetGame();
    } else {
      // setGame(dummyGame);
      // setResponse(dummyGame.state);
      // setGameCharacter({
      //   value: {},
      //   personal: {
      //     race: "",
      //     class: "",
      //   },
      // });

      handleInitiateGame();
    }
  }, [user?.token]);

  if (!response) {
    return <Loader text='Loading Game ...' />;
  }
  return (
    <Game
      response={response}
      gameCharacter={gameCharacter}
      setGameCharacter={setGameCharacter}
      gameCampaign={gameCampaign}
    />
  );
}

export default function page() {
  return (
    <Suspense fallback={null}>
      <GameHandler />
    </Suspense>
  );
}
