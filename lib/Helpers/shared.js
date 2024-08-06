
export const isSafariMobile = () => {
  const ua = navigator.userAgent;
  return (
    /Safari/.test(ua) &&
    /Apple Computer/.test(navigator.vendor) &&
    (/iPhone/.test(ua) || /iPad/.test(ua) || /iPod/.test(ua))
  );
};

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
