function jsonToAllAction(json) {
  var actionMaps = {};

  var actionMapRaw = null;
  try {

    actionMapRaw = json._c.ActionMaps[0]._c.ActionProfiles[0]._c.actionmap;
    for (const nodeActionMap of actionMapRaw) {

      if (nodeActionMap._c.action.length === 0) continue;
      for (const nodeAction of nodeActionMap._c.action) {

        actionMaps[nodeAction._a.name] = null;
      }
    }

  } catch (error) {
    console.error(error);
  }

  return actionMaps;
}

export default jsonToAllAction;
