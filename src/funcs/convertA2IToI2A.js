/**
 * Convert action to input map -> input to action map, which can be used for visualization.
 * @param {Map} mapA2I action to input map to be converted. Format:
 * device / action_category / action: [modifier, key]
 * @returns {Map} input to action map. Format:
 * device / action_category / modifier / key: action or [actions...]
 */

export default function convertA2IToI2A(mapA2I) {
  let result = {};
  for (const [device, mapActionCategory] of Object.entries(mapA2I)) {
    result[device] = {};
    for (const [actionCategory, mapAction] of Object.entries(mapActionCategory)) {
      result[device][actionCategory] = {};
      for (const [action, input] of Object.entries(mapAction)) {
        if (input == null) continue;
        let [modifier, key] = input;

        // Create {} if doesn't have one
        if (!result[device][actionCategory][modifier])
          result[device][actionCategory][modifier] = {};

        // the first action of the input
        if (!result[device][actionCategory][modifier][key])
          result[device][actionCategory][modifier][key] = action;
        // if the input is occupied by other action(s)
        else {
          if (!Array.isArray(result[device][actionCategory][modifier][key]))
            result[device][actionCategory][modifier][key] = [result[device][actionCategory][modifier][key]];

          result[device][actionCategory][modifier][key].push(action);
        }

      }
    }
  }
  return result;
}