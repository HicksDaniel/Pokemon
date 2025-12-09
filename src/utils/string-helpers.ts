export const cleanStringAndAbbreviate = (str: string) => {
  const ABBREVIATIONS: Record<string, string> = {
    updated: "Upd.",
    extended: "Ext.",
    original: "",
  };
  const abbreviatedString = str
    .replace(/[\n_\n-]/g, " ")
    .replace(/^(updated|extended|original)\b/, (match) => ABBREVIATIONS[match]);
  return abbreviatedString
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .trim();
};
