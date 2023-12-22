const splitTextIntoArray = (text, wordsPerElement) => {
  const words = text.split(/\s+/);
  const result = [];
  let currentElement = "";

  for (const word of words) {
    if ((currentElement + " " + word).split(/\s+/).length <= wordsPerElement) {
      currentElement += (currentElement === "" ? "" : " ") + word;
    } else {
      result.push(currentElement.trim());
      currentElement = word;
    }
  }

  if (currentElement !== "") {
    result.push(currentElement.trim());
  }

  return result;
};

export const parseGameText = (text) => {
  const wordsPerElement = 20;

  var paragraphs = text.split("\n");
  var visualText = paragraphs
    .map((line) => line.replace(/^[\*]*\s*/, "").trim()) // Remove leading asterisks and whitespace
    .filter((line) => line.startsWith("VISUAL")) // Filter lines starting with VISUAL
    .find((line) => line); // Find the first one

  const pathText = text.replace(visualText, "");
  const resultArray = splitTextIntoArray(pathText, wordsPerElement);

  return { visualText, resultArray };
};
