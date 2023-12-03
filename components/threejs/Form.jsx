import React, { useEffect, useState, useRef } from "react";
import { dropdowns } from "../data";
import { twMerge } from "tailwind-merge";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import toast from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger);

const DropDown = ({ data, className, animName = "", value, onChange }) => {
  return (
    <div
      className={twMerge(
        "mb-4 h-[100vh] flex items-center justify-center ",
        className
      )}
    >
      <div className={`flex flex-col items-start z-[4] ${animName} `}>
        <label className="text-white mb-1 font-bold text-3xl">
          {data.label}
        </label>

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent border-[1px] cursor-pointer border-green-500 my-4 p-3  text-white rounded-md md:w-[40vw] w-[70vw] focus:outline-none focus:ring focus:border-green-500 dropdown-custom"
          style={{ boxShadow: "0 0 10px rgba(0, 255, 0, 0.5)" }}
        >
          <option value="" disabled selected>
            {data.placeholder}
          </option>
          {data.options.map((option) => (
            <option className="cursor-pointer" key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
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

  const getRandomName = () => {
    const prefixes = ["Thorn", "Shadow", "Dragon", "Mystic", "Storm"];
    const suffixes = ["blade", "fire", "whisper", "bane", "soul"];

    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    return `${randomPrefix} ${randomSuffix}`;
  };

  const getRandomDropdownOption = (options) => {
    if (!options || options.length === 0) {
      return ""; // Return an empty string or handle appropriately if options are empty
    }

    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  };

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
    setFormData((prev) => ({
      ...prev,
      name: getRandomName(),
      class: getRandomDropdownOption(dropdowns[0].options),
      race: getRandomDropdownOption(dropdowns[1].options),
      strength: getRandomDropdownOption(dropdowns[2].options),
      dexterity: getRandomDropdownOption(dropdowns[3].options),
      intelligence: getRandomDropdownOption(dropdowns[4].options),
      constitution: getRandomDropdownOption(dropdowns[5].options),
      wisdom: getRandomDropdownOption(dropdowns[6].options),
      charisma: getRandomDropdownOption(dropdowns[7].options),
    }));

    // Scroll to the form with smooth animation
    const targetPosition = formRef.current.offsetTop;
    const duration = 8000; // Adjust the duration to control the scroll speed
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

  const handleSubmit = () => {
    if (!validateData()) {
      toast.error("Please fill all the fields");
      return;
    }
    console.log(formData);
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
          x: 200,
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
    <div className="form  z-[-1] w-screen h-full bg-transparent ">
      <form className="flex flex-col w-full items-center h-full ">
        <div className="mb-4 h-screen md:w-2/4 md:me-auto flex flex-col items-center md:ps-10 ps-[25%] justify-center ">
          <div className="flex flex-col items-start j z-[4] w-[20rem] md:w-full">
            <label className="text-white font-bold text-xl">
              Main Protagonist
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter Name"
              className="bg-transparent border-[1px] border-green-500 my-4 p-3 text-white rounded-md md:w-[30rem]  focus:outline-none focus:ring focus:border-green-500"
              style={{ boxShadow: "0 0 10px rgba(0, 255, 0, 0.5)" }}
            />
            <button
              type="button"
              onClick={handleClick}
              className="bg-green-500 z-[4] text-white py-2 px-4 border-none cursor-pointer rounded-md"
            >
              Random Character
            </button>
          </div>
        </div>
        <DropDown
          data={dropdowns[0]}
          className="ms-auto md:w-2/4"
          animName={"anim-1"}
          value={formData.class}
          onChange={(value) => handleChange("class", value)}
        />
        <DropDown
          data={dropdowns[1]}
          className="me-auto w-2/4"
          animName={"anim-2"}
          value={formData.race}
          onChange={(value) => handleChange("race", value)}
        />

        <div
          className={
            "mb-4 w-full h-[120vh] flex md:flex-row flex-col items-center justify-around "
          }
        >
          <DropDown
            data={dropdowns[2]}
            className="h-full"
            animName="anim-3"
            value={formData.strength}
            onChange={(value) => handleChange("strength", value)}
          />
          <DropDown
            data={dropdowns[3]}
            className="h-full"
            animName="anim-3"
            value={formData.dexterity}
            onChange={(value) => handleChange("dexterity", value)}
          />
        </div>
        <DropDown
          data={dropdowns[4]}
          className=" w-2/4 me-auto"
          animName={"anim-5"}
          value={formData.intelligence}
          onChange={(value) => handleChange("intelligence", value)}
        />
        <DropDown
          data={dropdowns[5]}
          className="w-2/4 ms-auto"
          animName={"anim-6"}
          value={formData.constitution}
          onChange={(value) => handleChange("constitution", value)}
        />
        <DropDown
          data={dropdowns[6]}
          className=" w-full"
          animName={"anim-7"}
          value={formData.wisdom}
          onChange={(value) => handleChange("wisdom", value)}
        />
        <DropDown
          data={dropdowns[7]}
          className=" w-full"
          animName={"anim-8"}
          value={formData.charisma}
          onChange={(value) => handleChange("charisma", value)}
        />

        <div className="h-[150vh]  z-[4] flex items-end ">
          <div className="h-screen flex items-center " ref={formRef}>
            <button
              onClick={handleSubmit}
              type="button"
              style={{ boxShadow: "0 0 10px rgba(0, 255, 0, 0.5)" }}
              className="bg-green-500 z-[4] text-xl text-white py-6 px-12 border-none cursor-pointer rounded-md anim-9"
            >
              Start Game
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
