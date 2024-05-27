import React, { useState } from "react";
import CustomButton from "@/components/ui/custom-button";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const _ABILITIES = [
  {
    name: "Strength",
    description:
      "Strength measures physical power and the ability to exert force.",
  },
  {
    name: "Dexterity",
    description: "Dexterity gauges agility, reflexes, and coordination.",
  },
  {
    name: "Constitution",
    description: "Constitution represents health, stamina, and vital force.",
  },
  {
    name: "Intelligence",
    description:
      "Intelligence assesses mental acuity, learning ability, and memory.",
  },
  {
    name: "Wisdom",
    description: "Wisdom evaluates perceptiveness, intuition, and insight.",
  },
  {
    name: "Charisma",
    description:
      "Charisma quantifies charm, social influence, and leadership capability.",
  },
];

const INITIAL_ABILITIES = {
  strength: 8,
  dexterity: 8,
  constitution: 8,
  intelligence: 8,
  wisdom: 8,
  charisma: 8,
};
const INITIAL_POINTS = 27;
export default function Choose({
  abilities,
  handleChangeAbilities,
  _pointsToSpend,
}) {
  const [pointsToSpend, setPointsToSpend] = useState(_pointsToSpend);
  const handleChangeAbilityScore = (ability, value, type) => {
    if (
      value < 8 ||
      value > 15 ||
      (pointsToSpend <= 0 && type === "increasing")
    )
      return;

    //On top of that, you have 27 points to spend however you like to increase these scores. The cost to increase a score by 1 point is 1 point itself, except when the score reaches 14; from there, it costs 2 points to increase it further to a maximum of 15
    if (type === "increasing") {
      if (value > 14) {
        setPointsToSpend((prev) => prev - 2);
      } else {
        setPointsToSpend((prev) => prev - 1);
      }
    } else {
      if (value >= 14) {
        setPointsToSpend((prev) => prev + 2);
      } else {
        setPointsToSpend((prev) => prev + 1);
      }
    }
    handleChangeAbilities({ ...abilities, [ability]: value });
  };

  const resetAbilities = () => {
    handleChangeAbilities(INITIAL_ABILITIES);
    setPointsToSpend(INITIAL_POINTS);
  };

  return (
    <div className="md:rounded-[16px] flex flex-col gap-6 w-full md:w-3/5 lg:w-2/5 h-full mb-auto md:p-5 md:pt-6 md:border border-white/10 md:bg-white/[8%]  overflow-auto hide-scrollbar">
      <h1 className="headline-4 hidden md:block">Abilities</h1>

      <div className="flex flex-col justify-start gap-5  w-full">
        {_ABILITIES.map((ability, index) => {
          const abilityName = ability.name.toLowerCase();
          const score = abilities[abilityName];
          return (
            <div
              className="flex items-center justify-between w-full"
              key={index}
            >
              <div
                key={index}
                className={`flex cursor-pointer running-text-mono uppercase justify-start items-center gap-3  `}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <img
                        src={`https://dndai-images.s3.eu-central-1.amazonaws.com/abilities/${abilityName}.webp`}
                        className={`w-12 h-12 ease-animate object-cover rounded-[10px] `}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <span className="!running-text-small ">
                        {ability.description}
                      </span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <span>{ability.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <CustomIconbutton
                    onClick={() =>
                      handleChangeAbilityScore(
                        abilityName,
                        score - 1,
                        "descreasing"
                      )
                    }
                    disabled={score === 8}
                    variant={"primary"}
                    className={"h-6 w-6"}
                  >
                    <img
                      src="/Icons/Minus.svg"
                      alt="logo"
                      className="h-2 w-2"
                    />
                  </CustomIconbutton>
                  <span className="running-text-mono">{score}</span>
                  <CustomIconbutton
                    onClick={() =>
                      handleChangeAbilityScore(
                        abilityName,
                        score + 1,
                        "increasing"
                      )
                    }
                    disabled={
                      score === 15 ||
                      pointsToSpend <= 0 ||
                      (score === 14 && pointsToSpend <= 1)
                    }
                    variant={"primary"}
                    className={"h-6 w-6"}
                  >
                    <img src="/Icons/Add.svg" alt="logo" className="h-2 w-2" />
                  </CustomIconbutton>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center">
        <CustomButton onClick={resetAbilities} withIcon={true}>
          <img
            src="/Icons/Reset.svg"
            alt="logo"
            className="h-5 w-5 invert opacity-70"
          />
          Reset Points
        </CustomButton>
        <span className="running-text-mono text-gray2 uppercase">
          Points Total: {pointsToSpend}
        </span>
      </div>
    </div>
  );
}
