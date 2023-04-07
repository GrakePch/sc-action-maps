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
    lshift: "#ee3b3c",
    lctrl: "#3fbc3f",
    ralt: "#e6077e",
    rshift: "#ff8ba0",
    rctrl: "#3fbc9c",
    f: "#9c4bdc"
  },
  modifierOrder: ["_", "_hold", "_2tap", "f", "lalt", "ralt", "lshift", "rshift", "lctrl", "rctrl"]
}

export default globalConstants;
