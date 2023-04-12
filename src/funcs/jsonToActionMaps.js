import input2ActionDefault from "../assets/maps/input2ActionDefault.json";

/**
 * Translate raw xml json to action map in a usable format:
 * device / action_category / modifier / key: action
 * @param {Map} json raw json from xml
 * @returns {Map} Formatted ActionMaps
 */

function jsonToActionMaps(json) {
  var actionMaps = input2ActionDefault;

  var actionMapRaw = null;
  try {

    actionMapRaw = json._c.ActionMaps[0]._c.ActionProfiles[0]._c.actionmap;
    for (const nodeActionMap of actionMapRaw) {

      if (nodeActionMap._c.action.length === 0) continue;
      for (const nodeAction of nodeActionMap._c.action) {

        if (nodeAction._c.rebind.length === 0) continue;
        for (const nodeRebind of nodeAction._c.rebind) {

          let inputRaw = nodeRebind._a.input;
          let idxToSplitDeviceAndId = inputRaw.indexOf("_");
          let deviceRaw = inputRaw.substring(0, idxToSplitDeviceAndId)
          let inputIdWithMod = inputRaw.substring(idxToSplitDeviceAndId + 1);

          // if input is empty
          if (!inputIdWithMod || inputIdWithMod == " ")
            continue;

          let device = inputIdWithMod.includes("mouse") ? "mo1" : deviceRaw;

          // Create upper {}s if not existed.
          if (!actionMaps[device])
            actionMaps[device] = {};
          if (!actionMaps[device][nodeActionMap._a.name])
            actionMaps[device][nodeActionMap._a.name] = {};


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
          if (!actionMaps[device][nodeActionMap._a.name][modifier])
            actionMaps[device][nodeActionMap._a.name][modifier] = {};

          actionMaps[device][nodeActionMap._a.name][modifier][inputKey] = nodeAction._a.name;
        }
      }
    }

  } catch (error) {
    console.error(error);
  }

  return actionMaps;
}

export default jsonToActionMaps;
