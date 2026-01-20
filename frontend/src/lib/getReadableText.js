/**
 * Converts a string like "in-progress" or "in_progress" to "In Progress".
 * @param {string|null} text Input text
 * @param {string} nullText Text to return if input is null (optional)
 * @returns {string} Readable text
 */
const getReadableText = (text, nullText) => {
  if (text === null) return nullText || "";
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
