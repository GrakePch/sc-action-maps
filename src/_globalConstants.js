/**
 * Hold is actually not a real modifier, but is a preset individual action. 
 * It was manually tagged in the maps/actionsNeedHold.json. Tagged 1 means 
 * it need hold to be activated, tagged with a two-action array means it 
 * can be treated as a combination of a short press action and long press 
 * action.
 */

const globalConstants = {
  modifierColorMap: {
    _: "#afe5f4",
    _hold: "#61c6ff",
    _2tap: "#4b8fe2",
    lalt: "#f79723",
    ralt: "#e6077e",
    lshift: "#ee3b3c",
    rshift: "#ff8ba0",
    lctrl: "#3fbc3f",
    rctrl: "#3fbc9c",
    f: "#9c4bdc"
  },
  modCombinedMap: {
    "_1tap": ["_", "_hold", "f"],
    "_2tap": ["_2tap"],
    "lalt": ["lalt"],
    "ralt": ["ralt"],
    "lshift": ["lshift"],
    "rshift": ["rshift"],
    "lctrl": ["lctrl"],
    "rctrl": ["rctrl"]
  },
  actionCateDefaultVisible: {
    flight_basic: 1,
    v_targeting_radar: 1,
    v_weapon_defense: 1,
    p_general_social: 1
  }
}

export default globalConstants;
