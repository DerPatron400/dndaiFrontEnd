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
    plot: "Plot",
    time: "Time",
    hook: "Hook",
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
    return match && (match[1] === "\n" || match[1] === "**")
      ? match[2]?.replaceAll("*", "").trim()
      : match
      ? match[1]?.replaceAll("*", "").trim()
      : "";
  }
  return match ? match[1]?.replaceAll("*", "").trim() : "";
};
