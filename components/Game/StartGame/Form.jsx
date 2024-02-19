import React, { useEffect, useState, useRef } from "react";
import { dropdowns } from "../../data";
import { twMerge } from "tailwind-merge";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import toast from "react-hot-toast";
import axios from "axios";
import useUserStore from "@/utils/store/userStore";
import useIntroTextStore from "@/utils/store/introTextStore";
import { useRouter } from "next/navigation";
import Loader from "@/components/shared/DragonLoader";
import { newGame, newGameGreen } from "@/api/game";
import { Tooltip } from "@radix-ui/themes";

gsap.registerPlugin(ScrollTrigger);

const DropDown = ({
  data,
  className,
  animName = "",
  value,
  onChange,
  formdata,
}) => {
  return (
    <div
      className={twMerge(
        "mb-4 h-[100vh] flex items-center justify-center bg-black",
        className
      )}
    >
      <div className={`flex flex-col items-start z-[4] ${animName} `}>
        <label className='text-white mb-1 font-bold text-3xl'>
          {data.label}
        </label>

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className='bg-transparent border-[1px] cursor-pointer border-green-500 my-4 p-3  text-white rounded-md md:w-[40vw] w-[70vw] focus:outline-none focus:ring focus:border-green-500 dropdown-custom'
          style={{ boxShadow: "0 0 10px rgba(0, 255, 0, 0.5)" }}
        >
          <option
            value=''
            disabled
            hidden
            className='disabled:bg-black disabled:text-white'
          >
            {data.placeholder}
          </option>
          {data.options.map((option, index) => (
            <option
              className='cursor-pointer bg-black'
              key={index}
              value={option}
              disabled={Object.values(formdata).includes(option)}
            >
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

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
  const [isLoading, setIsLoading] = useState(false);// Set this to true when the form is being submitted
  const [gameType, setGameType] = useState(null); 
  const { user, setCredits, setGreenCredits } = useUserStore((state) => state);
  const setIntroText = useIntroTextStore((state) => state.setIntroText);
  const router = useRouter();

  const smoothScrollTo = (targetPosition, duration) => {
    const startPosition = window.pageYOffset;
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
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setGameType('premium');

    let currentPrompt = `${formData.name}${formData.class}${formData.race} ${formData.strength}${formData.dexterity}${formData.constitution}${formData.intelligence}${formData.wisdom}${formData.charisma}`;

    const bodyData = {
      strength: formData.strength,
      who: formData.name,
      constitution: formData.constitution,
      intelligence: formData.intelligence,
      wisdom: formData.wisdom,
      charisma: formData.charisma,
      dexterity: formData.dexterity,
      styleArt: "dnd",
      dndClasses: formData.class,
      dndRace: formData.race,
    };

    if (user.credits <= 0) {
      toast.error("You don't have enough credits to play");
      router.push("/shop");
      return;
    }

    try {
      const data = await newGame(bodyData, user.token);
      setIntroText(data.responseText);
      setCredits(data.credits);
      router.push("/game/play?conversationIndex=" + data.conversationIndex);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleSubmitGreen = async () => {
    if (!validateData()) {
      toast.error("Please fill all the fields");
      return;
    }
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setGameType('standard');

    let currentPrompt = `${formData.name}${formData.class}${formData.race} ${formData.strength}${formData.dexterity}${formData.constitution}${formData.intelligence}${formData.wisdom}${formData.charisma}`;

    const bodyData = {
      strength: formData.strength,
      who: formData.name,
      constitution: formData.constitution,
      intelligence: formData.intelligence,
      wisdom: formData.wisdom,
      charisma: formData.charisma,
      dexterity: formData.dexterity,
      styleArt: "dnd",
      dndClasses: formData.class,
      dndRace: formData.race,
    };

    if (user.greenCredits <= 0) {
      toast.error("You don't have enough credits to play");
      router.push("/shop");
      return;
    }

    try {
      const data = await newGameGreen(bodyData, user.token);
      setIntroText(data.responseText);
      setGreenCredits(data.greenCredits);
      router.push("/game/play?conversationIndex=" + data.conversationIndex);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
        x: window.innerWidth < 768 ? -60 : 0,
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
          x: window.innerWidth < 768 ? 90 : 0,
          delay: 0.5,
          ease: "power4.inOut",
          duration: 2,
        }
      )
      .fromTo(
        ".anim-3",
        {
          opacity: 0,
          scaleY: window.innerWidth < 768 ? 1 : 0,
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
          x: window.innerWidth < 768 ? 90 : 0,
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
          x: window.innerWidth < 768 ? -90 : 0,
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
  }, []);

  return (
    <div className='form z-[-1] w-screen h-full bg-transparent '>
      <form className='flex flex-col w-full items-center h-full '>
        <div className='mb-4 h-screen md:w-2/4 md:me-auto flex flex-col items-center md:ps-10 ps-[25%] justify-center '>
          <div className='flex flex-col items-start j z-[5] w-[20rem] md:w-full'>
            <label className='text-white font-bold text-xl'>
              Character Name
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
              onClick={handleClick}
              className='bg-gradient-to-t from-green-950 to-green-500 text-white px-4 z-[4] py-2 rounded-md hover:to-green-700 hover:from-green-400 transition-all'
            >
              Random Character
            </button>
          </div>
        </div>
        <DropDown
          data={dropdowns[0]}
          className='ms-auto md:w-2/4'
          animName={"anim-1"}
          value={formData.class}
          formdata={formData}
          onChange={(value) => handleChange("class", value)}
        />
        <DropDown
          data={dropdowns[1]}
          className='me-auto w-2/4'
          animName={"anim-2"}
          value={formData.race}
          formdata={formData}
          onChange={(value) => handleChange("race", value)}
        />

        <div
          className={
            "mb-4 w-full h-[120vh] flex md:flex-row flex-col items-center justify-around "
          }
        >
          <DropDown
            data={dropdowns[2]}
            className='h-full'
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
          className=' w-2/4 me-auto'
          animName={"anim-5"}
          value={formData.intelligence}
          formdata={formData}
          onChange={(value) => handleChange("intelligence", value)}
        />
        <DropDown
          data={dropdowns[5]}
          className='w-2/4 ms-auto'
          animName={"anim-6"}
          value={formData.constitution}
          formdata={formData}
          onChange={(value) => handleChange("constitution", value)}
        />
        <DropDown
          data={dropdowns[6]}
          className=' w-full'
          animName={"anim-7"}
          value={formData.wisdom}
          formdata={formData}
          onChange={(value) => handleChange("wisdom", value)}
        />
        <DropDown
          data={dropdowns[7]}
          className=' w-full'
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
        <div className="flex flex-col space-y-4">
            <Tooltip content='Pressing this button costs a Purple Gem: Access the smartest AI gaming for an exclusive experience.'>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                type="button"
                style={{ boxShadow: "0 0 10px rgba(238, 130, 238, 0.5)" }}
                className="bg-gradient-to-t from-purple-950 to-purple-500 text-white px-12 z-[4] py-6 rounded-md hover:to-purple-700 hover:from-purple-400 transition-colors duration-300 ease-in-out anim-9"
              >
                {isLoading ? "Loading... " : " Start Premium Game"}
              </button>
            </Tooltip>
            <Tooltip content='Pressing this button costs a Green Gem: Dive into instant play with standard AI, budget-friendly and ready for action.'>
              <button
                onClick={handleSubmitGreen}
                disabled={isLoading}
                type="button"
                style={{ boxShadow: "0 0 10px rgba(0, 255, 0, 0.5)" }}
                className="bg-gradient-to-t from-green-950 to-green-500 text-white px-12 z-[4] py-6 rounded-md hover:to-green-700 hover:from-green-400 transition-colors duration-300 ease-in-out anim-9"
              >
                {isLoading ? "Loading... " : " Start Game"}
              </button>
            </Tooltip>
          </div>
            {isLoading && (
              <Loader text='it may take a few minutes to generate your character..' />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
