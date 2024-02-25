import React, { useEffect, useState, useRef } from "react";
import { dropdowns } from "../../../data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import toast from "react-hot-toast";
import useUserStore from "@/utils/store/userStore";
import useGameStore from "@/utils/store/introTextStore";
import { useRouter } from "next/navigation";
import Loader from "@/components/shared/DragonLoader";
import { newGameGreen } from "@/api/game";
import DropDown from "./DropDown";
import Configurations from "./Configurations";

gsap.registerPlugin(ScrollTrigger);

const getRandomName = () => {
  const prefixes = [
    "Dian",
    "Nese",
    "Falledrick",
    "Mae",
    "Valhein",
    "Dol",
    "Earl",
    "Cedria",
    "Azulei",
    "Yun",
    "Cybel",
    "Ina",
    "Foolly",
    "Skili",
    "Juddol",
    "Janver",
    "Viska",
    "Hirschendy",
    "Silka",
    "Hellsturn",
    "Essa",
    "Mykonos",
    "Fenton",
    "Tyrena",
    "Inqoul",
    "Mankov",
    "Derilia",
    "Hexema",
    "Wyton",
    "Kaedum",
    "Gouram",
    "Libertia",
    "Berasailles",
    "Juxta",
    "Tae’hr",
    "Comtol",
    "Gherak",
    "Hest",
    "Qony",
    "Masamka",
    "Twyll",
    "Tenos",
    "Axim",
    "Westrynda",
    "Saphros",
    "Olkham",
    "Handok",
    "Kemetra",
    "Yos",
    "Wentingle",
    "Ames",
    "Molosh",
    "Inkov",
    "Phasasia",
    "Ziedinghal",
    "Bregul",
    "Eishvack",
    "Lora",
    "Krenting",
    "Symbole",
    "Elignoir",
    "Keligkrul",
    "Qwey",
    "Vindinglag",
    "Kusakira",
    "Weme",
    "Fayd",
    "Rushvita",
    "Vulkor",
    "Amers",
    "Ortos",
    "Vanius",
    "Chandellia",
    "Lilikol",
    "Catca",
    "Cormus",
    "Yuela",
    "Ariban",
    "Tryton",
    "Fesscha",
    "Opalul",
    "Zakzos",
    "Hortimer",
    "Anklos",
    "Dushasiez",
    "Polop",
    "Mektal",
    "Orinphus",
    "Denatra",
    "Elkazzi",
    "Dyne",
    "Domos",
    "Letryal",
    "Manniv",
    "Sylestia",
    "Esnol",
    "Fasafuros",
    "Ghanfer",
    "Kahnite",
    "Sweyda",
    "Uylis",
    "Retenia",
    "Bassos",
    "Arkensval",
    "Impelos",
    "Grandius",
    "Fulcrux",
    "Lassahein",
    "Edsveda",
    "Earakun",
    "Fous",
    "Maas",
    "Basenphal",
    "Jubidya",
    "Divya",
    "Kosunten",
    "Ordayius",
    "Dozzer",
    "Gangher",
    "Escha",
    "Manchul",
    "Kempos",
    "Kulo",
    "Urtench",
    "Kesta",
    "Helahona",
    "Ryte",
    "Falcia",
    "Umannos",
    "Urkensvall",
    "Fedra",
    "Bulkensar",
    "Comia",
    "Tyul",
  ];

  const suffixes = [
    "Mintz",
    "Ashbluff",
    "Marblemaw",
    "Bozzelli",
    "Fellowes",
    "Windward",
    "Yarrow",
    "Yearwood",
    "Wixx",
    "Humblecut",
    "Dustfinger",
    "Biddercombe",
    "Kicklighter",
    "Vespertine",
    "October",
    "Gannon",
    "Truthbelly",
    "Woodgrip",
    "Gorestriker",
    "Caskcut",
    "Oatrun",
    "Sagespark",
    "Strongblossom",
    "Hydrafist",
    "Snakeleaf",
    "Barlowe",
    "Caddel",
    "Hart",
    "Katz",
    "Laurier",
    "Madden",
    "Elrod",
    "Whitlock",
    "Ashford",
    "Amos",
    "Fleet",
    "Moses",
    "Singh",
    "Remington",
    "Sharpe",
    "Beam",
    "Spade",
    "Driscoll",
    "Undergrove",
    "Finch",
    "Crawford",
    "Finch",
    "Cyprus",
    "Dagon",
    "Lightfoot",
  ];

  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];

  return `${randomPrefix} ${randomSuffix}`;
};

const getRandomDropdownOption = (options) => {
  if (!options || options.length === 0) {
    return ""; // Return an empty string or handle appropriately if options are empty
  }

  let randomIndex = Math.floor(Math.random() * options.length);

  return options[randomIndex];
};

const getRandomValueOnce = (options) => {
  if (!options || options.length === 0) {
    return ""; // Return an empty string or handle appropriately if options are empty
  }

  let randomIndex = Math.floor(Math.random() * options.length);
  const randomValue = options[randomIndex];
  //remove this value
  options.splice(randomIndex, 1);

  return randomValue;
};

const InitialState = {
  name: "",
  class: "",
  race: "",
  strength: "",
  dexterity: "",
  constitution: "",
  intelligence: "",
  wisdom: "",
  charisma: "",
};

export default function Form() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState(InitialState);
  const [allowRandom, setAllowRandom] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Set this to true when the form is being submitted
  const [open, setOpen] = useState(false);
  const { setIntroText, setCharacter } = useGameStore((state) => state);

  const [gameType, setGameType] = useState(null);
  const { user, setCredits, setGreenCredits } = useUserStore((state) => state);

  const router = useRouter();

  const smoothScrollTo = (targetPosition, duration) => {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) {
        startTime = currentTime;
      }

      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = (progress) => progress * (2 - progress);

      window.scrollTo(0, startPosition + distance * ease(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  };

  const handleClick = () => {
    // Generate random values and update the form data
    let optionsToChoose = ["15", "14", "13", "12", "10", "8"];

    setFormData({
      name: formData.name || getRandomName(),
      class: getRandomDropdownOption(dropdowns[0].options),
      race: getRandomDropdownOption(dropdowns[1].options),
      strength: getRandomValueOnce(optionsToChoose),
      dexterity: getRandomValueOnce(optionsToChoose),
      intelligence: getRandomValueOnce(optionsToChoose),
      constitution: getRandomValueOnce(optionsToChoose),
      wisdom: getRandomValueOnce(optionsToChoose),
      charisma: getRandomValueOnce(optionsToChoose),
    });

    // Scroll to the form with smooth animation
    const targetPosition = formRef.current.offsetTop;
    const duration = 24000; // Adjust the duration to control the scroll speed
    smoothScrollTo(targetPosition, duration);
  };

  const handleChange = (key, value) => {
    setFormData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const validateData = () => {
    return Object.values(formData).every((val) => val !== "");
  };

  const handleSubmit = async () => {
    if (!validateData()) {
      toast.error("Please fill all the fields");
      return;
    }

    setOpen(true);
    if (isLoading) {
      return;
    }
  };

  useEffect(() => {
    const t1 = gsap.timeline();
    t1.fromTo(
      ".anim-1",
      {
        opacity: 0,
        x: window.innerWidth < 768 ? 0 : 100,
        y: 0,
      },
      {
        opacity: 1,
        x: window.innerWidth < 768 ? 0 : 0,
        y: window.innerWidth < 768 ? 50 : 0,
        delay: 1,
        ease: "power4.inOut",
        duration: 2,
      }
    )
      .fromTo(
        ".anim-2",
        {
          opacity: 0,
          x: window.innerWidth < 768 ? 0 : -100,
        },
        {
          opacity: 1,
          x: window.innerWidth < 768 ? 0 : 0,
          delay: 0.5,
          ease: "power4.inOut",
          duration: 2,
        }
      )
      .fromTo(
        ".anim-3",
        {
          opacity: 0,
          scaleY: window.innerWidth < 768 ? 0 : 0,
        },
        {
          opacity: 1,
          scaleY: 1,
          delay: 0.5,
          ease: "power4.inOut",
          duration: 2,
        }
      )
      .fromTo(
        ".anim-5",
        {
          opacity: 0,
          x: -100,
        },
        {
          opacity: 1,
          x: window.innerWidth < 768 ? 0 : 0,
          delay: 0.5,
          ease: "power4.inOut",
          duration: 2,
        }
      )
      .fromTo(
        ".anim-6",
        {
          opacity: 0,
          x: 100,
        },
        {
          opacity: 1,
          x: window.innerWidth < 768 ? 0 : 0,
          ease: "power4.inOut",
          duration: 2,
        }
      )
      .fromTo(
        ".anim-7",
        {
          opacity: 0,
          x: -300,
          y: 50,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          delay: 0.5,
          ease: "power4.inOut",
          duration: 2,
        }
      )
      .fromTo(
        ".anim-8",
        {
          opacity: 0,
          x: 300,
          y: 50,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          ease: "power4.inOut",
          duration: 2,
        }
      )
      .fromTo(
        ".anim-9",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          x: 0,
          ease: "power4.inOut",
          duration: 3,
        }
      );

    ScrollTrigger.create({
      trigger: ".model-trigger",
      animation: t1,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    });

    //wait for animation to load
    setTimeout(() => {
      setAllowRandom(true);
    }, 3000);
  }, []);

  return (
    <div className='form z-[-1] w-screen h-full bg-transparent '>
      <form className='flex flex-col w-full items-center h-full '>
        <div className='mb-4 h-screen w-full md:me-auto flex flex-col items-center md:ps-10 mx-auto justify-center '>
          <div className='flex flex-col items-center md:items-start j z-[5] w-[20rem] md:w-full'>
            <label className='text-white font-bold text-xl'>
              Character Name
            </label>
            <label className='text-gray-400 text-sm mt-1 text-center md:text-left w-full md:w-1/4'>
              Choose a name that resonates with your imagination, or let fate
              decide with our random character button. Dive into the adventure
              with personalized attributes that shape your unique story.
            </label>
            <input
              type='text'
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder='Enter Name'
              className='bg-transparent border-[1px] border-green-500 my-4 p-3 text-white rounded-md md:w-[30rem]  focus:outline-none focus:ring focus:border-green-500'
              style={{ boxShadow: "0 0 10px rgba(0, 255, 0, 0.5)" }}
            />
            <button
              type='button'
              disabled={!allowRandom}
              onClick={handleClick}
              className='bg-gradient-to-t disabled:bg-green-400 disabled:hover:bg-green-400 disabled:cursor-not-allowed from-green-950 to-green-500 text-white px-4 z-[4] py-2 rounded-md hover:to-green-700 hover:from-green-400 transition-all'
            >
              Random Character
            </button>
          </div>
        </div>
        <DropDown
          data={dropdowns[0]}
          className='w-full md:ms-auto md:w-2/4  '
          animName={"anim-1"}
          value={formData.class}
          formdata={formData}
          onChange={(value) => handleChange("class", value)}
        />
        <DropDown
          data={dropdowns[1]}
          className='w-screen md:w-2/4  md:ms-auto'
          animName={"anim-2"}
          value={formData.race}
          formdata={formData}
          onChange={(value) => handleChange("race", value)}
        />

        <div
          className={
            "mb-4 w-2/4 md:!w-full h-[120vh] flex md:flex-row flex-col items-center justify-around  "
          }
        >
          <DropDown
            data={dropdowns[2]}
            className='h-full '
            animName='anim-3'
            value={formData.strength}
            formdata={formData}
            onChange={(value) => handleChange("strength", value)}
          />
          <DropDown
            data={dropdowns[3]}
            className='h-full'
            animName='anim-3'
            value={formData.dexterity}
            formdata={formData}
            onChange={(value) => handleChange("dexterity", value)}
          />
        </div>
        <DropDown
          data={dropdowns[4]}
          className=' w-full md:w-2/4 md:me-auto md:ms-10'
          animName={"anim-5"}
          value={formData.intelligence}
          formdata={formData}
          onChange={(value) => handleChange("intelligence", value)}
        />
        <DropDown
          data={dropdowns[5]}
          className='w-screen md:w-2/4  md:ms-auto'
          animName={"anim-6"}
          value={formData.constitution}
          formdata={formData}
          onChange={(value) => handleChange("constitution", value)}
        />
        <DropDown
          data={dropdowns[6]}
          className=' w-full md:w-2/4 '
          animName={"anim-7"}
          value={formData.wisdom}
          formdata={formData}
          onChange={(value) => handleChange("wisdom", value)}
        />
        <DropDown
          data={dropdowns[7]}
          className='w-full md:w-2/4 '
          animName={"anim-8"}
          value={formData.charisma}
          formdata={formData}
          onChange={(value) => handleChange("charisma", value)}
        />

        <div className='h-[150vh] z-[4] flex items-end'>
          <div
            className='h-screen flex justify-center flex-col items-center '
            ref={formRef}
          >
            <div className='flex flex-col space-y-4'>
              {/* <Tooltip content='Pressing this button costs a Purple Gem: Access the smartest AI gaming for an exclusive experience.'>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  type='button'
                  style={{ boxShadow: "0 0 10px rgba(238, 130, 238, 0.5)" }}
                  className='bg-gradient-to-t from-purple-950 to-purple-500 text-white px-12 z-[4] py-6 rounded-md hover:to-purple-700 hover:from-purple-400 transition-colors duration-300 ease-in-out anim-9'
                >
                  {isLoading ? "Loading... " : " Start Premium Game"}
                </button>
              </Tooltip> */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                type='button'
                style={{ boxShadow: "0 0 10px rgba(0, 255, 0, 0.5)" }}
                className='bg-gradient-to-t from-green-950 to-green-500 text-white px-12 z-[4] py-6 rounded-md hover:to-green-700 hover:from-green-400 transition-colors duration-300 ease-in-out anim-9'
              >
                {isLoading ? "Loading... " : " Start Game"}
              </button>
            </div>
            {isLoading && (
              <Loader text='it may take a few minutes to generate your character..' />
            )}
            <Configurations
              open={open}
              setOpen={setOpen}
              formData={formData}
              setIsLoading={setIsLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
}