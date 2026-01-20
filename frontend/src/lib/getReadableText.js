const getReadableText = (text) => {
  if (typeof text !== "string") return "";
  // form in-progress to In Progress
  return text
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const revertReadableText = (readableText) => {
  if (typeof readableText !== "string") return "";

  return readableText.replace(/\s+/g, "-").toLowerCase();
};

export default getReadableText;
