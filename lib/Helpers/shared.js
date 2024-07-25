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
  const sections = text.split("\n\n");
  let extractedText;
  sections.map((section, index) => {
    if (section.toLowerCase().includes(key)) {
      extractedText = section
        .split("\n")
        .pop()
        .replaceAll("*", "")
        .replaceAll("#", "");

      if (extractedText.length > 100) {
        return;
      }
      if (section.split("\n").length <= 1) {
        console.log("here");
        extractedText = sections[index + 1];
      }
    }
  });

  console.log(extractedText);

  return extractedText?.replaceAll("*", "").replaceAll("#", "");
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
