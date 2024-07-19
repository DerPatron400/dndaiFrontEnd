const wordsToRemove = ["Personality Trait"]; // Replace with your actual words to remove
const wordsToRemoveIfStartingEquipment = [
  "Starting Equipment",
  "Secondary",
  "Weapon",
  "Other",
  "Armor",
];

const wordsToRemoveIfAbilityScores = [
  "Ability Scores",
  "Intelligence",
  "Wisdom",
  "Charisma",
  "Constitution",
  "Strength",
  "Dexterity",
];
function filterTextArray(arr) {
  return arr.filter((item) => {
    if (typeof item !== "string") return false;
    // Trim the item to remove leading and trailing whitespace
    const trimmedItem = item.trim();
    // Return true if the trimmed item is not empty and does not only contain special characters
    return trimmedItem.length > 0 && !/^[\n*]*$/.test(trimmedItem);
  });
}

function processFirstElement(item, headers, showLogs) {
  if (headers[0] === "Starting Equipment") {
    wordsToRemoveIfStartingEquipment.forEach((word) => {
      const wordRegex = new RegExp(`\\b${word}\\b`, "gi");
      item = item.replace(wordRegex, "");
    });

    const splittedArray = item.split("*");

    for (let i = 0; i < splittedArray.length; i++) {
      if (splittedArray[i].length > 10) {
        item = splittedArray[i];
        break;
      }
    }
  } else if (headers[0] === "Ability Scores") {
    wordsToRemoveIfAbilityScores.forEach((word) => {
      const wordRegex = new RegExp(`\\b${word}\\b`, "gi");
      item = item.replace(wordRegex, "");
    });
  }
  // Remove heading from the first element
  headers.forEach((heading) => {
    item = item.replace(heading, "");
  });
  item = item.replaceAll("*", "");
  item = item.replaceAll(":", "");

  item = item.replace(/^.*?:/, "");

  // Trim the item to remove leading and trailing whitespace
  let trimmedItem = item.trim();

  // Remove leading non-alphabetic characters but allow numbers
  item = item.replace(/^[^a-zA-Z0-9]+/, "");

  return trimmedItem;
}

export const extractSection = (text, key, showLogs = false) => {
  text = text.replaceAll("#", "");
  // Define a mapping of keys to their corresponding section headers in the text
  const sectionHeaders = {
    name: ["Name"],
    race: ["Race"],
    class: ["Class"],
    background: ["Background"],
    alignment: ["Alignment"],
    personality: ["Personality Traits"],
    ideal: ["Ideal"],
    bond: ["Bond"],
    flaw: ["Flaw"],
    abilityscores: ["Ability Scores"],
    startingequipment: ["Starting Equipment", "Equipment"],
    appearance: ["Appearance"],
    abilities: ["Abilities"],
    spells: ["Spells"],
    additionalnotes: ["Additional Notes"],
    plot: ["Plot"],
    time: ["Time"],
    hook: ["Hook"],
    level: ["Level"],
    xp: ["XP"],
    hitpoints: ["Hit Points"],
    armorclass: ["Armor Class"],
    level: ["Level"],
    title: ["Title"],
  };

  // Get the section header corresponding to the given key
  const headers = sectionHeaders[key.toLowerCase()];

  // If the header is not found, return an empty string
  if (!headers) return "";

  // Create a regular expression to match the section headers and the text following them
  const headerRegex = headers
    .map((h) => `${h}:\\s*([^\\n]+)([\\s\\S]*?)(?=\\n\\*\\*|$)`)
    .join("|");
  const regex = new RegExp(headerRegex, "i");

  // Execute the regex to find the match
  const match = regex.exec(text);
  let filteredMatch = [];

  if (match) {
    if (showLogs) {
      console.log(match, "filteredMatch");
    }

    filteredMatch = filterTextArray(match);

    filteredMatch[0] = processFirstElement(
      filteredMatch[0],
      headers,

      showLogs
    );
  }
  if (showLogs) {
    console.log(headers, filteredMatch[0], "here");
  }

  // If a match is found, return the captured group (the section content)
  // Otherwise, return an empty string
  if (
    key === "spells" ||
    key === "startingEquipment" ||
    key === "abilityscores"
  ) {
    return filteredMatch[0];
  }

  wordsToRemove.forEach((word) => {
    const wordRegex = new RegExp(`\\b${word}\\b`, "gi");
    if (match) match[1] = match[1].replace(wordRegex, "");
  });

  return match
    ? match[1]
        .replaceAll("*", "")
        .replaceAll(":", "")
        .replaceAll("-", "")

        .trim()
    : "";
};

const FIVE_MINUTES = 5 * 60 * 1000; // 5 minutes in milliseconds

export const isSelectionValid = (item, selectionTime) => {
  if (!item || !selectionTime) {
    return false;
  }
  const now = new Date();
  const timeDifference = now - new Date(selectionTime);
  return timeDifference <= FIVE_MINUTES;
};

export function capitalizeFirstLetterOfEachWord(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
