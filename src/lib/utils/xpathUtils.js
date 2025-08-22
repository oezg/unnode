export const xpathCount = (tag, attr, value, text) => {
  let doc = xpathDocument(text);
  let result = xpathResult(tag, attr, value, doc);
  return result.snapshotLength;
};

export const xpathRemove = (tag, attr, value, text) => {
  let doc = xpathDocument(text);
  let result = xpathResult(tag, attr, value, doc);
  // Remove nodes (iterate backwards to avoid index issues)
  for (let i = result.snapshotLength - 1; i >= 0; i--) {
    const node = result.snapshotItem(i);
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }

  // Serialize the modified XML back to string
  const serializer = new XMLSerializer();
  return serializer.serializeToString(doc);
};

export const toXpath = (tag, attr, value) => `//${tag}[@${attr}='${value}']`;

export const xpathDocument = (text) => {
  let parser = new DOMParser();
  let doc = parser.parseFromString(text, "text/xml");
  let parseerrors = doc.getElementsByTagName("parsererror");
  if (parseerrors.length == 0) {
    console.log("xml parsed successfully.");
    return doc;
  } else {
    console.error("xml parsing error:", parseerrors[0].textContent);
    return null;
  }
};

export const xpathResult = (tag, attr, value, doc) => {
  let xpath = toXpath(tag, attr, value);
  return doc.evaluate(
    xpath,
    doc,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
};
