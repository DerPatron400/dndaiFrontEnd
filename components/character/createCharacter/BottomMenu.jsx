import React, { useEffect, useState } from "react";
import CustomInput from "@/components/ui/custom-input";
import CustomButton from "@/components/ui/custom-button";
import { cn } from "@/lib/utils";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import useCharacterStore from "@/utils/characterStore";
import { canMoveForward, reward, getRandomName } from "@/lib/Helpers/character";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import { createCharacter, getCredits } from "@/actions/character";
import {
  RACE,
  RACE_GENDER,
  ALIGNMENT,
  BACKGROUND,
  CLASSES,
  EQUIPMENTS,
  PERSONALITIES,
} from "./constants";
import useUserStore from "@/utils/userStore";
import SearchInput from "@/components/ui/search-input";
import Check from "@/components/ui/Icons/Check";
import ArrowRight from "@/components/ui/Icons/ArrowRight";

const BackButton = ({ activeStep, isChoosingRandom, handleBack }) => {
  return (
    <CustomButton
      variant={"subtle"}
      className={cn(
        "opacity-0 pointer-events-none ease-animate",
        activeStep !== 0 && "opacity-100 pointer-events-auto"
      )}
      disabled={isChoosingRandom}
      onClick={handleBack}
      withIcon={true}
    >
      <img
        src='/Icons/ArrowLeft.svg'
        alt='logo'
        className='h-5 w-5 invert opacity-70'
      />
      Back
    </CustomButton>
  );
};

const NextButton = ({
  formComplete,
  activeStep,
  character,
  handleSubmit,
  handleNext,
  isLoading,
  isChoosingRandom,
}) => {
  const { isMobile } = useDeviceDetect();
  return (
    <CustomButton
      variant={formComplete ? "success" : "primary"}
      withIcon={true}
      disabled={
        !canMoveForward(activeStep, character, isMobile) ||
        isLoading ||
        isChoosingRandom
      }
      onClick={() => {
        if (formComplete) {
          handleSubmit();
        } else handleNext();
      }}
      className={"ps-5 pe-3.5"}
    >
      {formComplete ? "Finish And Start" : "Next step"}
      {formComplete ? (
        <Check className='h-5 w-5 fill-black' />
      ) : (
        <ArrowRight className='h-5 w-5 fill-black' />
      )}
    </CustomButton>
  );
};
export default function BottomMenu({ character, setCharacter }) {
  const {
    activeStep,
    setActiveStep,
    raceQuery,
    setRaceQuery,
    backgroundQuery,
    setBackgroundQuery,
  } = useCharacterStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [searchMode, setSearchMode] = useState(false);
  const { isMobile } = useDeviceDetect();
  const { user, setBlueCredits, setYellowCredits } = useUserStore();
  const [isChoosingRandom, setIsChoosingRandom] = useState(false);
  const MAX_STEPS = isMobile ? 8 : 7;
  const formComplete = activeStep === MAX_STEPS;
  function toggleSound() {
    setIsSoundOn(!isSoundOn);
  }
  const handleBack = () => {
    if (activeStep === 0) return;
    setActiveStep(activeStep - 1);
  };
  const handleNext = () => {
    if (activeStep === MAX_STEPS) return;
    setActiveStep(activeStep + 1);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const payload = {
        who: character.name,
        race: character.race.name,
        gender: character.race.gender,
        background: character.background.name,
        _class: character.class.name,
        alignment: character.alignment.name,
        toolammo: character.equipment["tool&ammo"],
        isGreen: true,
        gold: character.gold,
        ...character.abilities,
        ...character.personality,
        ...character.equipment,
      };

      const response = await createCharacter(payload, user?.token || null);
      const { credits } = await getCredits(user?.token || null);
      console.log(response);
      setYellowCredits(credits.yellowCredits);

      setBlueCredits(credits.blueCredits);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  function getRandomValue(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  const handleRandomCharacter = async () => {
    setIsChoosingRandom(true);
    for (let i = activeStep; i <= MAX_STEPS; i++) {
      setActiveStep(i);
      switch (i) {
        case 0:
          //select random race and gender
          //random number between 0 and array length
          const gender = getRandomValue(RACE_GENDER);
          var { name, description } = getRandomValue(RACE);

          setCharacter((prev) => ({
            ...prev,
            race: {
              name,
              gender,
              description,
            },
          }));
          break;

        case 1:
          //select random class
          var { name, description } = getRandomValue(CLASSES);
          setCharacter((prev) => ({
            ...prev,
            class: { name, description },
          }));
          break;

        case 2:
          let scores = {
            strength: 8,
            dexterity: 8,
            constitution: 8,
            intelligence: 8,
            wisdom: 8,
            charisma: 8,
          };
          let points = character.pointsToSpend;

          const abilities = Object.keys(scores);

          // Function to get the cost of increasing a score by 1
          function getCost(score) {
            return score >= 14 ? 2 : 1;
          }

          while (points > 0) {
            // Pick a random ability
            const ability =
              abilities[Math.floor(Math.random() * abilities.length)];

            // Calculate the cost to increase this ability
            const cost = getCost(scores[ability]);

            // If we have enough points and the score is less than 15, increase it
            if (points >= cost && scores[ability] < 15) {
              scores[ability]++;
              points -= cost;
            }
          }

          setCharacter((prev) => ({
            ...prev,
            abilities: scores,
            pointsToSpend: 0,
          }));

          break;
        case 3:
          //select random background
          var { name, description } = getRandomValue(BACKGROUND);
          setCharacter((prev) => ({
            ...prev,
            background: { name, description },
          }));
          break;
        case 4:
          //select random personality
          var personality = getRandomValue(PERSONALITIES.personality);
          var ideal = getRandomValue(PERSONALITIES.ideal);
          var bond = getRandomValue(PERSONALITIES.bond);
          var flaw = getRandomValue(PERSONALITIES.flaw);
          setCharacter((prev) => ({
            ...prev,
            personality: {
              ideal,
              bond,
              personality,
              flaw,
            },
          }));

          break;
        case 5:
          //select random alignment
          var { name, description } = getRandomValue(ALIGNMENT);
          console.log(name, description);

          setCharacter((prev) => ({
            ...prev,
            alignment: { name, description },
          }));
          break;
        case 6:
          //select random equipment
          var weapon = getRandomValue(EQUIPMENTS.weapon);
          var secondary = getRandomValue(EQUIPMENTS.secondaryweapon);
          var armor = getRandomValue(EQUIPMENTS.armour);
          var toolammo = getRandomValue(EQUIPMENTS["tool&ammo"]);
          setCharacter((prev) => ({
            ...prev,
            equipment: {
              weapon,
              secondary,
              armor,
              "tool&ammo": toolammo,
            },
          }));

          break;
        case 7:
          //select random gold
          var selectedFace = Math.floor(Math.random() * 20) + 1;
          setCharacter((prev) => ({
            ...prev,
            gold: reward(selectedFace).gold,
            selectedFace,
          }));
          break;
        case 8:
          //select random name
          var name = getRandomName();
          setCharacter((prev) => ({
            ...prev,
            name,
          }));

        default:
          break;
      }
      await new Promise((resolve) => setTimeout(resolve, 2500));
    }
    if (!character.name) {
      const name = getRandomName();
      setCharacter((prev) => ({
        ...prev,
        name,
      }));
    }
    setIsChoosingRandom(false);
  };

  useEffect(() => {
    // Add event listener
    document.addEventListener("click", detectClickOutside);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("click", detectClickOutside);
    };
  }, [searchMode]); // Depend on searchMode to properly handle changes in its state

  const detectClickOutside = (e) => {
    if (searchMode && !e.target.closest(".search")) {
      console.log("here");
      setSearchMode(false);
    }
  };

  return (
    <>
      {/* For Desktop */}
      <div className='text-white hidden   md:flex justify-between items-center w-full p-12 fixed bottom-0 left-0 z-[20]  '>
        <CustomButton
          disabled={isChoosingRandom}
          withIcon
          onClick={handleRandomCharacter}
        >
          <img src='/Icons/Random.svg' alt='logo' className='h-5 w-5 ' />
          RANDOM CHARACTER
        </CustomButton>
        <CustomInput
          value={character.name}
          disabled={isChoosingRandom}
          icon={
            character.name && (
              <img
                src='/Icons/Success.svg'
                alt='Success'
                className=' h-4 w-4'
              />
            )
          }
          onChange={(value) =>
            setCharacter((prev) => ({ ...prev, name: value }))
          }
          placeholder='CHARACTER NAME'
          className={"w-1/4"}
        />
        <div className='flex items-center gap-x-6'>
          <BackButton
            activeStep={activeStep}
            isChoosingRandom={isChoosingRandom}
            handleBack={handleBack}
          />
          <NextButton
            formComplete={formComplete}
            activeStep={activeStep}
            character={character}
            handleSubmit={handleSubmit}
            handleNext={handleNext}
            isChoosingRandom={isChoosingRandom}
            isLoading={isLoading}
          />
        </div>
      </div>
      {/* For Mobile */}
      <div className='w-full md:hidden left-0 bg-blur-bottom-menu z-[20]  fixed bottom-0'>
        <div className=' flex items-center justify-between p-5  '>
          {searchMode ? (
            <SearchInput
              className={"w-full search text-white"}
              query={activeStep === 0 ? raceQuery : backgroundQuery}
              setQuery={activeStep === 0 ? setRaceQuery : setBackgroundQuery}
            />
          ) : (
            <>
              <div className='flex items-center gap-5'>
                <CustomIconbutton onClick={toggleSound}>
                  <img
                    src={isSoundOn ? "/Icons/Sound.svg" : "/Icons/SoundOff.svg"}
                    alt='Sound Toggle'
                    className='h-5 w-5 invert'
                  />
                </CustomIconbutton>
                <CustomIconbutton
                  className={cn(
                    "hidden search",
                    (activeStep === 0 || activeStep === 3) && "flex"
                  )}
                  onClick={() => setSearchMode(true)}
                >
                  <img
                    src={"/Icons/Search.svg"}
                    alt='Search Toggle'
                    className='h-5 w-5 opacity-70 '
                  />
                </CustomIconbutton>
              </div>
              <div className='flex items-center gap-x-6'>
                <BackButton
                  activeStep={activeStep}
                  isChoosingRandom={isChoosingRandom}
                  handleBack={handleBack}
                />
                <NextButton
                  formComplete={formComplete}
                  activeStep={activeStep}
                  character={character}
                  handleSubmit={handleSubmit}
                  handleNext={handleNext}
                  isLoading={isLoading}
                  isChoosingRandom={isChoosingRandom}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
