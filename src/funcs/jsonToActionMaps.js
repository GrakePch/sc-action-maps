function jsonToActionMaps(json) {
  var actionMaps = {};

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
          let inputId = inputRaw.substring(idxToSplitDeviceAndId + 1);

          // if input is empty
          if (!inputId || inputId == " ")
            continue;

          let device = inputId.includes("mouse") ? "mo1" : deviceRaw;

          if (!actionMaps[device])
            actionMaps[device] = {};

          if (!actionMaps[device][nodeActionMap._a.name])
            actionMaps[device][nodeActionMap._a.name] = {};

          if (!actionMaps[device][nodeActionMap._a.name][inputId])
            actionMaps[device][nodeActionMap._a.name][inputId] = {};

          actionMaps[device][nodeActionMap._a.name][inputId][nodeAction._a.name] = {};
          if (nodeRebind._a.activationMode)
            actionMaps[device][nodeActionMap._a.name][inputId][nodeAction._a.name].activationMode = nodeRebind._a.activationMode;
          if (nodeRebind._a.multiTap)
            actionMaps[device][nodeActionMap._a.name][inputId][nodeAction._a.name].multiTap = nodeRebind._a.multiTap;
          if (nodeRebind._a.defaultInput)
            actionMaps[device][nodeActionMap._a.name][inputId][nodeAction._a.name].defaultInput = nodeRebind._a.defaultInput;
        }
      }
    }

  } catch (error) {
    console.error(error);
  }

  return actionMaps;
}

export default jsonToActionMaps;
