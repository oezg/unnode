import { toRegex } from "$lib/utils/regexUtils";

export const toNode = (tag, attr, value) =>
  `<${tag} ${attr}="${value}">...</${tag}>`;

export const countNode = (tag, attr, value, text) => {
  const regex = toRegex(tag, attr, value);
  const matches = text.match(regex);
  return matches ? matches.length : 0;
};

export const removeNodes = (tag, attr, value, text) => {
  const regex = toRegex(tag, attr, value);
  return text.replace(regex, "");
};
