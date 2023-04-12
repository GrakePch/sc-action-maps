import actionsNeedHold from "../assets/maps/actionsNeedHold.json";
import actionMergeSet from "../assets/maps/actionMergeSet.json";
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

export default function getActionsWithInput(input, device, actionMapI2A) {

  // actionList = [[actionId, modifier], ...]
  var actionList = [];

  // toBeMergedActionBuffer = {modifier: [actionId, ...], ...}
  var toBeMergedActionBuffer = {};

  for (const [_actionMap, inputGroup] of Object.entries(actionMapI2A[device])) {
    for (const [modifier, inputs] of Object.entries(inputGroup)) {
      let actions = inputs[input];
      if (!actions) continue;
      if (Array.isArray(actions))
        for (const action of actions)
          checkIfHold_pushActionModifierToList(actionList, action, modifier, toBeMergedActionBuffer);
      else
        checkIfHold_pushActionModifierToList(actionList, actions, modifier, toBeMergedActionBuffer);
    }
  }
  return actionList;
}

function checkIfHold_pushActionModifierToList(actionList, action, modifier, toBeMergedActionBuffer) {
  if (modifier === "_" && actionsNeedHold[action]) {
    if (actionsNeedHold[action] === 1) {
      checkMerge_pushActionModifierToList(actionList, [action, "_hold"], toBeMergedActionBuffer);
    } else if (Array.isArray(actionsNeedHold[action])) {
      checkMerge_pushActionModifierToList(actionList, [actionsNeedHold[action][0], "_"], toBeMergedActionBuffer);
      checkMerge_pushActionModifierToList(actionList, [actionsNeedHold[action][1], "_hold"], toBeMergedActionBuffer);
    }
    return;
  }
  checkMerge_pushActionModifierToList(actionList, [action, modifier], toBeMergedActionBuffer);
}

function checkMerge_pushActionModifierToList(actionList, [action, modifier], toBeMergedActionBuffer) {
  // If action is included by the mergeSet of the same modifier. T: skip it; F: continue
  const mergeSet = toBeMergedActionBuffer[modifier];
  if (mergeSet?.includes(action)) return;

  // If the action to be pushed is in the pre-set MergeSet, update toBeMergedActionBuffer (for future merging)
  for (const set of actionMergeSet.mergeSets) {
    if (set.includes(action)) {
      if (!toBeMergedActionBuffer[modifier])
        toBeMergedActionBuffer[modifier] = []
      toBeMergedActionBuffer[modifier] = toBeMergedActionBuffer[modifier].concat(set);
    }
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