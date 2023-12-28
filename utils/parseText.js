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

  // Use a regular expression to extract the line labeled as VISUAL
  const visualMatch = text.match(/VISUAL:.*?(?=\n|$)/);

  // Extracted visual line
  const visualText = visualMatch
    ? visualMatch[0]
        .replace(/[*:|#]/g, "")
        .replace("VISUAL", "")
        .trim()
    : null;

  const pathText = text.replace(visualText, "");
  const resultArray = splitTextIntoArray(pathText, wordsPerElement);

  return { visualText, resultArray };
};
