import input2ActionDefault from "../assets/maps/input2ActionDefault.json";

/**
 * Convert input to action -> action to input
 */

export default function convertI2AToA2I() {
  let result = {};
  for (const [device, actionMaps] of Object.entries(input2ActionDefault)) {
    result[device] = {};
    for (const [actionCategory, modMaps] of Object.entries(actionMaps)) {
      result[device][actionCategory] = {};
      for (const [modifier, inputMap] of Object.entries(modMaps)) {
        for (const [input, actions] of Object.entries(inputMap)) {
          if (Array.isArray(actions)) {
            for (const a of actions) {
              result[device][actionCategory][a] = [modifier, input];
            }
          } else {
            result[device][actionCategory][actions] = [modifier, input];
          }
        }
      }
    }
  }
  console.log(result);
}