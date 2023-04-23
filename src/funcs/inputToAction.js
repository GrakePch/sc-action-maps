import actionsNeedHold from "../assets/maps/actionsNeedHold.json";
import actionMergeSet from "../assets/maps/actionMergeSet.json";
import actionCategories from "../assets/maps/actionCategories.json";
import globalConstants from "../_globalConstants";
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

export default function getActionsWithInput(input, device, actionMapI2A, actionCatePriority, modifierPriority, limit) {
  const modCombinedMap = globalConstants.modCombinedMap;

  // actionListObj = {numVisible: 0, actionList: [[actionId, modifier, visibility], ...]}
  var actionListObj = { numVisible: 0, actionList: [] };

  // toBeMergedActionBuffer = {modifier: [actionId, ...], ...}
  var toBeMergedActionBuffer = {};

  for (const cateTuple of actionCatePriority) {
    if (!cateTuple[1]) continue;
    let cateName = cateTuple[0];
    if (!actionCategories[cateName]) continue;
    for (const actionMap of actionCategories[cateName]) {
      const inputGroup = actionMapI2A[device][actionMap];
      if (!inputGroup) continue;

      for (const modTuple of modifierPriority) {
        if (!modTuple[1]) continue;
        let modName = modTuple[0];
        if (!modCombinedMap[modName]) continue;
        for (const modifier of modCombinedMap[modName]) {
          const inputs = inputGroup[modifier];
          if (!inputs) continue;
          let actions = inputs[input];
          if (!actions) continue;
          if (Array.isArray(actions))
            for (const action of actions)
              checkIfHold_pushActionModifierToList(actionListObj, action, modifier, actionMap, toBeMergedActionBuffer, limit);
          else
            checkIfHold_pushActionModifierToList(actionListObj, actions, modifier, actionMap, toBeMergedActionBuffer, limit);
        }
      }
    }
  }

  return actionListObj;
}

function checkIfHold_pushActionModifierToList(actionListObj, action, modifier, category, toBeMergedActionBuffer, limit) {
  if (modifier === "_" && actionsNeedHold[action]) {
    if (actionsNeedHold[action] === 1) {
      checkMerge_pushActionModifierToList(actionListObj, [action, "_hold", category], toBeMergedActionBuffer, limit);
    } else if (Array.isArray(actionsNeedHold[action])) {
      checkMerge_pushActionModifierToList(actionListObj, [actionsNeedHold[action][0], "_", category], toBeMergedActionBuffer, limit);
      checkMerge_pushActionModifierToList(actionListObj, [actionsNeedHold[action][1], "_hold", category], toBeMergedActionBuffer, limit);
    }
    return;
  }
  checkMerge_pushActionModifierToList(actionListObj, [action, modifier, category], toBeMergedActionBuffer, limit);
}

function checkMerge_pushActionModifierToList(actionListObj, [action, modifier, category], toBeMergedActionBuffer, limit) {
  // If action is included by the mergeSet of the same modifier. T: skip it; F: continue
  const mergeSet = toBeMergedActionBuffer[modifier];
  if (mergeSet?.includes(action)) pushUniqueActionInfoToArr(actionListObj, [action, modifier, category, false], limit);

  // If the action to be pushed is in the pre-set MergeSet, update toBeMergedActionBuffer (for future merging)
  for (const set of actionMergeSet.mergeSets) {
    if (set.includes(action)) {
      if (!toBeMergedActionBuffer[modifier])
        toBeMergedActionBuffer[modifier] = []
      toBeMergedActionBuffer[modifier] = toBeMergedActionBuffer[modifier].concat(set);
    }
  }
  pushUniqueActionInfoToArr(actionListObj, [action, modifier, category, true], limit);
}

function pushUniqueActionInfoToArr(actionListObj, srcArr, limit = 9) {
  if (!Array.isArray(srcArr)) {
    console.log("Source is not an Array.");
    return;
  }

  // Check unique
  for (const item of actionListObj.actionList) {
    if (item[0] === srcArr[0] && item[1] === srcArr[1]) {
      // if action, modifier, and category duplicates, skip.
      if (item[2] === srcArr[2]) return;
      // if action, modifier duplicates, but category differs, push as invisible
      actionListObj.actionList.push([srcArr[0], srcArr[1], srcArr[2], false]);
      return;
    }
  }

  // Check limit
  if (actionListObj.numVisible >= limit) {
    actionListObj.actionList.push([srcArr[0], srcArr[1], srcArr[2], false]);
    return;
  }

  if (srcArr[3]) actionListObj.numVisible++;
  actionListObj.actionList.push(srcArr);
}