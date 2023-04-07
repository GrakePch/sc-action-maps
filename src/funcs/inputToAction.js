import input2ActionDefault from "../assets/maps/input2ActionDefault.json";
import actionsNeedHold from "../assets/maps/actionsNeedHold.json";
/*
  _:      single tap key
  _2tap:  double tap key
  lshift: left  shift + key 
  lctrl:  left  ctrl  + key
  lalt:   left  alt   + key
  rshift: right shift + key 
  rctrl:  right ctrl  + key
  ralt:   right alt   + key
*/

export default function getActionsWithInput(input, device) {
  var actionList = [];
  for (const [_actionMap, inputGroup] of Object.entries(input2ActionDefault[device])) {
    for (const [modifier, inputs] of Object.entries(inputGroup)) {
      let actions = inputs[input];
      if (!actions) continue;
      if (Array.isArray(actions))
        for (const action of actions)
          pushActionModifierToList(actionList, action, modifier);
      else
        pushActionModifierToList(actionList, actions, modifier);
    }
  }
  return actionList;
}

function pushActionModifierToList(actionList, action, modifier) {
  if (modifier === "_" && actionsNeedHold[action]) {
    if (actionsNeedHold[action] === 1) {
      pushUniqueArrToArr(actionList, [action, "_hold"]);
    } else if (Array.isArray(actionsNeedHold[action])) {
      pushUniqueArrToArr(actionList, [actionsNeedHold[action][0], "_"]);
      pushUniqueArrToArr(actionList, [actionsNeedHold[action][1], "_hold"]);
    }
    return;
  }
  pushUniqueArrToArr(actionList, [action, modifier]);
}

function pushUniqueArrToArr(destArr, srcArr) {
  if (!Array.isArray(destArr)) {
    console.log("Destination is not an Array.");
    return;
  }
  if (!Array.isArray(srcArr)) {
    console.log("Source is not an Array.");
    return;
  }

  var srcStr = srcArr.toString();
  for (const item of destArr) {
    if (item.toString() === srcStr.toString()) return;
  }
  destArr.push(srcArr);
}