import React from "react";
import Card from "./card";

const GemsInfo = [
  {
    imgSrc:
      "https://dndai-images.s3.eu-central-1.amazonaws.com/gems/legendary-gem.webp",
    info: (
      <span>
        <span className='text-sandyOrange'>Legendary gems</span> are your magic
        brushes, perfect for generating stunning images like custom character
        portraits, vivid scenes, fierce enemies, and intricate dungeon maps.
        They also allow you to craft custom campaigns, making your adventures
        truly unique.
      </span>
    ),
    benefits: [
      "Create a custom campaign",
      "Generate a character portrait",
      "Generate an image of your character in action",
      "Generate an image of the enemy",
      "Generate a dungeon map",
    ],
  },
  {
    imgSrc:
      "https://dndai-images.s3.eu-central-1.amazonaws.com/gems/mythic-gem.webp",
    info: (
      <span>
        <span className='text-irisPurpleLight'>Mythic gems</span> are your
        adventure tickets, used for creating characters, playing the game, and
        narrating your epic stories. Dive into thrilling quests and bring your
        heroes to life!
      </span>
    ),
    benefits: [
      "Creating your own custom character",
      "Starting a new game",
      "Taking one turn in the game.",
      "Continuing a game",
    ],
  },
];

export default function Index() {
  return (
    <div className='z-10  w-full h-full flex flex-col md:gap-12 gap-10 md:flex-col text-white justify-center items-center md:mt-16'>
      <span className='text-center w-3/4 block text-white headline-3 z-[10] '>
        Here's how our <span className='text-irisPurpleLight'>gem system</span>{" "}
        works.
      </span>
      <div className=' w-full grid grid-cols-1 lg:grid-cols-2 gap-5'>
        {GemsInfo.map((gem, i) => (
          <Card key={i} benefits={gem.benefits} imgSrc={gem.imgSrc}>
            {gem.info}
          </Card>
        ))}
      </div>
    </div>
  );
}
