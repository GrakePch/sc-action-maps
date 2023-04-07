function xmlToJson(xml) {
  const children = xml.children;
  var jsonData = {};

  var attributes = xmlNodeAttrToJson(xml);
  if (attributes)
    jsonData._a = attributes;

  if (children.length === 0) return jsonData;

  jsonData._c = {};
  for (const child of children) {
    const nodeName = child.nodeName;

    if (child.nodeType === Node.TEXT_NODE) {
      jsonData._t = child.nodeValue;
      continue;
    }

    if (!jsonData._c[nodeName])
      jsonData._c[nodeName] = [];

    jsonData._c[nodeName].push(xmlToJson(child));
  }

  return jsonData;
}

function xmlNodeAttrToJson(node) {
  if (!node.attributes) return;
  if (node.attributes.length === 0) return;

  var jsonData = {};
  for (const attr of node.attributes)
    jsonData[attr.nodeName] = attr.nodeValue;

  return jsonData;
}

export default xmlToJson;
