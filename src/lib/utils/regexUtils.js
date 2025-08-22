export const toRegex = (tag, attr, value) => {
  const pattern = String.raw`^[ \t]*<${tag} .*${attr}="${value}"[\s\S]*?(/>|</${tag}>)[ \t]*$\r?\n`;
  return new RegExp(pattern, "mg");
};
