export const reward = (selectedFace) => {
  let message = "";
  let gold = 0;
  if (selectedFace === 1) {
    message = "Critical Failure!";
    gold = 0;
  } else if (selectedFace === 20) {
    message = "Critical Success!";
    gold = 200;
  } else if (selectedFace >= 2 && selectedFace <= 5) {
    gold = 5;
  } else if (selectedFace >= 6 && selectedFace <= 10) {
    gold = 10;
  } else if (selectedFace >= 11 && selectedFace <= 15) {
    gold = 20;
  } else if (selectedFace >= 16 && selectedFace <= 19) {
    gold = 50;
  }

  return { message, gold };
};

export const canMoveForward = (activeStep, character, isMobile) => {
  switch (activeStep) {
    case 0:
      return character.race.name && character.race.gender;
    case 1:
      return character.class;
    case 2:
      return true;
    case 3:
      return character.background;
    case 4:
      return (
        character.personality.ideal &&
        character.personality.bond &&
        character.personality.personality &&
        character.personality.flaw
      );
    case 5:
      return character.alignment;
    case 6:
      return (
        character.equipment.weapon &&
        character.equipment.secondary &&
        character.equipment.armor &&
        character.equipment["tool&ammo"]
      );

    case 7:
      return (
        (character.gold || character.gold === 0) && (isMobile || character.name)
      );
    case 8:
      return character.name;

    default:
      return true;
  }
};

export const getRandomName = () => {
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

export const extractSection = (text, key, showLogs = false) => {
  // Define a mapping of keys to their corresponding section headers in the text
  const sectionHeaders = {
    name: "Name",
    race: "Race",
    class: "Class",
    background: "Background",
    alignment: "Alignment",
    personality: "Personality Traits",
    ideal: "Ideal",
    bond: "Bond",
    flaw: "Flaw",
    abilityscores: "Ability Scores",
    startingequipment: "Starting Equipment",
    appearance: "Appearance",
    abilities: "Abilities",
    spells: "Spells",
    additionalnotes: "Additional Notes",
  };

  // Get the section header corresponding to the given key
  const header = sectionHeaders[key.toLowerCase()];

  // If the header is not found, return an empty string
  if (!header) return "";

  // Create a regular expression to match the section header and the text following it
  const regex = new RegExp(
    `${header}:\\s*([^\\n]+)([\\s\\S]*?)(?=\\n\\*\\*|$)`,
    "i"
  );

  // Execute the regex to find the match
  const match = regex.exec(text);
  if (showLogs) {
    console.log(header, match, "here");
  }
  // If a match is found, return the captured group (the section content)
  // Otherwise, return an empty string
  if (
    key === "spells" ||
    key === "startingEquipment" ||
    key === "abilityscores"
  ) {
    return match && match[1] === "\n"
      ? match[2]?.replaceAll("*", "").trim()
      : match
      ? match[1]?.replaceAll("*", "").trim()
      : "";
  }
  return match ? match[1]?.replaceAll("*", "").trim() : "";
};
