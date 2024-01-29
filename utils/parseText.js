const splitTextIntoArray = (text, wordsPerElement) => {
  if (!text) return [];
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

function startsWithSpecialCharacter(str) {
  // Regular expression to match strings that start and end with **
  const regex = /^\^.*/;

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
function startsWithNumber(str) {
  // Regular expression to match strings that start and end with **
  const regex = /^[1-9]\..*/gm;
  // Test if the string matches the pattern
  return regex.test(str);
}
function startsWithDashAndDoubleAsterisks(str) {
  // Regular expression to match strings that start and end with **
  const regex = /- \*\*.*?\*\*/g;
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
  const paths = [];
  let lines = removeEmptyStrings(text.split("\n")); // Split each section into lines
  lines = lines.map((line) => line.trim()).filter((line) => line !== "");
  console.log(lines);

  lines.map((line, index) => {
    if (line === "") return;

    if (isWrappedWithDoubleAsterisks(line.replace("^", ""))) {
      // If the line is wrapped with **, then it's a choice
      if (startsWithSpecialCharacter(line.replaceAll("*", ""))) {
        line = line.replaceAll("*", "").replaceAll("^", "");
        paths.push({
          heading:
            line.replace(/Path\s*\d+/g, "") || "Path " + paths.length + 1,
          content: lines[index + 1],
        });
      }
      choices.push({
        heading: line.replace(/Path\s*\d+/g, ""),
        content: lines[index + 1],
      });
      //make sure lines[index+1] doenst appear again
      lines[index + 1] = "";
    } else if (startsWithDoubleAsterisks(line)) {
      //or if the line starts with **
      let heading = extractHeading(line).replace(/Path\s*\d+/g, "");

      const content = line
        .replaceAll("*", "")
        .replace(heading, "")
        .replaceAll(":", "")
        .trim();

      if (startsWithSpecialCharacter(heading)) {
        heading = heading.replaceAll("^", "");
        paths.push({
          heading: heading || "Path " + paths.length + 1,
          content,
        });
      }

      choices.push({
        heading: heading,
        content,
      });
    } else if (startsWithSpecialCharacter(line)) {
      line = line.replaceAll("^", "").replace(/Path\s*\d+/g, "");
      if (line.length < 40) {
        paths.push({
          heading:
            line.replace(/Path\s*\d+/g, "") || "Path " + paths.length + 1,
          content: lines[index + 1],
        });

        choices.push({
          heading: line.replace(/Path\s*\d+/g, ""),
          content: lines[index + 1],
        });
      } else {
        const heading = extractHeading(line);

        const content = line
          .replaceAll("*", "")
          .replace(heading, "")
          .replaceAll(":", "")
          .trim();

        paths.push({
          heading: heading || "Path " + paths.length + 1,
          content,
        });
        choices.push({
          heading,
          content,
        });
      }
    } else if (startsWithNumberAndDoubleAsterisks(line)) {
      // or if the line starts as 1. **choice:**
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
    } else if (startsWithDashAndDoubleAsterisks(line)) {
      line = line.replaceAll(":", "");
      const heading = extractHeading(line);
      const content = line
        .replaceAll("*", "")
        .replace(heading, "")
        .replace(/-/, "")
        .trim();

      choices.push({
        heading,
        content,
      });
    } else if (startsWithNumber(line)) {
      const heading = line.replace(/^\d+\.\s*/, "");
      const content = line.replace(/^\d+\.\s*/, "");

      choices.push({
        heading,
        content,
      });
    } else {
      //else its just some normal content
      choices.push({
        heading: null,
        content: line,
      });
    }
  });

  return { choices, paths };
}
export const parseGameText = (text) => {
  const wordsPerElement = 17;

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

  let pathText = text
    .replace(visualText, "")
    .replaceAll(":", "")
    .replaceAll("VISUAL", "");

  const { paths, choices } = parseAdventureText(pathText);

  let resultArray = [];

  choices.map((path) => {
    if (path.heading?.toLowerCase() === "visual") {
      resultArray.push({ heading: path.heading, content: path.content });
    } else {
      const textToBeAdded = splitTextIntoArray(path.content, wordsPerElement);

      textToBeAdded.map((text, index) => {
        if (index === 0) {
          resultArray.push({ heading: path?.heading, content: text.content });
        } else {
          resultArray.push(text);
        }
      });
    }
  });

  return { visualText, resultArray, paths };
};
