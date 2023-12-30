const splitTextIntoArray = (text, wordsPerElement) => {
  const words = text.split(/\s+/);
  const result = [];
  let currentElement = "";

  for (const word of words) {
    if ((currentElement + " " + word).split(/\s+/).length <= wordsPerElement) {
      currentElement += (currentElement === "" ? "" : " ") + word;
    } else {
      result.push({ heading: null, content: currentElement.trim() });
      currentElement = word;
    }
  }

  if (currentElement !== "") {
    result.push({ heading: null, content: currentElement.trim() });
  }

  return result;
};
function removeEmptyStrings(array) {
  return array.filter((item) => item.trim() !== "");
}
function isWrappedWithDoubleAsterisks(str) {
  // Regular expression to match strings that start and end with **
  const regex = /^\*\*.*\*\*$/;

  // Test if the string matches the pattern
  return regex.test(str);
}

function startsWithDoubleAsterisks(str) {
  // Regular expression to match strings that start and end with **
  const regex = /^\*\*/;
  // Test if the string matches the pattern
  return regex.test(str);
}

function startsWithNumberAndDoubleAsterisks(str) {
  // Regular expression to match strings that start and end with **
  const regex = /^\d+\.\s*\*\*/gm;
  // Test if the string matches the pattern
  return regex.test(str);
}

function extractHeading(str) {
  const regex = /\*\*(.*?)\*\*/;
  const match = str.match(regex);

  if (match) {
    const extractedText = match[1];
    return extractedText;
  } else {
    return "";
  }
}

function parseAdventureText(text) {
  const choices = [];
  const lines = removeEmptyStrings(text.split("\n")); // Split each section into lines

  lines.map((line, index) => {
    // If the line is wrapped with **, then it's a choice
    if (isWrappedWithDoubleAsterisks(line)) {
      choices.push({
        heading: line.replaceAll("*", ""),
        content: lines[index + 1],
      });
    } else if (startsWithDoubleAsterisks(line)) {
      const heading = extractHeading(line);
      const content = line
        .replaceAll("*", "")
        .replace(heading, "")
        .replaceAll(":", "")
        .trim();

      choices.push({
        heading,
        content,
      });
    } else if (startsWithNumberAndDoubleAsterisks(line)) {
      const heading = extractHeading(line);
      const content = line
        .replaceAll("*", "")
        .replace(heading, "")
        .replaceAll(":", "")
        .replace(/^\d+\.\s*/, "")
        .trim();

      choices.push({
        heading,
        content,
      });
    }
  });

  return choices;
}
export const parseGameText = (text) => {
  const wordsPerElement = 10;

  // Use a regular expression to extract the line labeled as VISUAL
  const visualMatch =
    text.match(/VISUAL:.*?(?=\n|$)/) || text.match(/^\*\*VISUAL:/);

  // Extracted visual line
  const visualText = visualMatch
    ? visualMatch[0]
        .replace(/[*:|#]/g, "")
        .replace("VISUAL", "")
        .trim()
    : null;

  const pathText = text.replace(visualText, "");

  //get all text before a choice
  const introText = pathText.split("*")[0];

  let resultArray = splitTextIntoArray(introText, wordsPerElement);

  const paths = parseAdventureText(pathText);

  paths.map((path) => {
    if (path.heading?.toLowerCase() === "visual") {
      resultArray.push({ heading: path.heading, content: path.content });
    } else {
      const textToBeAdded = splitTextIntoArray(path.content, wordsPerElement);

      textToBeAdded.map((text, index) => {
        if (index === 0) {
          resultArray.push({ heading: path.heading, content: text.content });
        } else {
          resultArray.push(text);
        }
      });
    }
  });

  resultArray.push({
    heading: null,
    content: "What would you choose",
  });

  return { visualText, resultArray };
};
