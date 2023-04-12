import action2InputDefault from "../assets/maps/action2InputDefault.json";

/**
 * Convert raw xml json -> action to input map.
 * @param {Map} json raw json from xml
 * @param {Boolean} includeDefault use default map as a base to create the A2I map.
 * @returns {Map} Formatted ActionMaps. Format:
 * device / action_category / action: [modifier, key]
 */

export default function jsonToA2I(json, includeDefault = false) {
  let result;
  if (includeDefault) {
    result = action2InputDefault;
  } else {
    result = {}
  }

  try {

    const actionMapRaw = json._c.ActionMaps[0]._c.ActionProfiles[0]._c.actionmap;
    for (const nodeActionMap of actionMapRaw) {
      const actionCategory = nodeActionMap._a.name;
      for (const nodeAction of nodeActionMap._c.action) {
        const action = nodeAction._a.name;
        for (const nodeRebind of nodeAction._c.rebind) {
          const inputUnparsed = nodeRebind._a.input;

          let idxToSplitDeviceAndId = inputUnparsed.indexOf("_");
          let deviceRaw = inputUnparsed.substring(0, idxToSplitDeviceAndId);
          let inputIdWithMod = inputUnparsed.substring(idxToSplitDeviceAndId + 1);

          // // if input is empty
          // if (!inputIdWithMod || inputIdWithMod == " ")
          //   continue;

          let device = inputIdWithMod.includes("mouse") ? "mo1" : deviceRaw;

          // Parse modifier.
          let modifier = "_";
          let inputKey;
          let inputIdSplitted = inputIdWithMod.split("+");
          if (inputIdSplitted.length > 1) {
            modifier = inputIdSplitted[0];
            inputKey = inputIdSplitted[1];
          } else {
            inputKey = inputIdSplitted[0];
          }
          if (modifier === "_" && (nodeRebind._a.multiTap === "2" || nodeRebind._a.activationMode === "double_tap"))
            modifier = "_2tap";

          // Create upper {}s if not existed.
          if (!result[device]) result[device] = {};
          if (!result[device][actionCategory]) result[device][actionCategory] = {};

          result[device][actionCategory][action] = (!inputIdWithMod || inputIdWithMod == " ")
            ? null
            : [modifier, inputKey];
        }
      }
    }

  } catch (error) {
    console.error(error);
  }

  return result;
}