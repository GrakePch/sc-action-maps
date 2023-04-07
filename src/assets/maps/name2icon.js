// const icons = function (r) {
//   let k = r.keys()
//   let l = r.keys().map(r);
//   let d = {}
//   for (let i = 0; i < l.length; i++) {
//     d[k[i].replace(/^.*[\\/]/, '').replace(/\.svg$/, '')] = l[i].default
//   }
//   return d
// }(require.context('../icons/', false, /\.svg$/));

import TextIcon from "./TextIcon";

const reqIcons = require.context('../icons/', true, /\.(png|jpe?g|svg|JPE?G)$/)

const icons = reqIcons.keys().map(p => ({ 
  fName: p.replace(/^.*[\\/]/, '').replace(/\.(png|jpe?g|svg|JPE?G)$/, ''), 
  fPath: reqIcons(p) 
}));

// console.log(icons)

export const name2icon = {
  "F1": "mobiglas",
  "F2": "starmap",
  "F4": "cycle_camera_view",
  "F5": "power_incr_engine",
  "F6": "power_incr_shield",
  "F7": "power_incr_weapon",
  "F8": "power_reset",
  "F9": "power_decr",
  "F10": "power_incr",
  "F11": "account-multiple",
  "F12": "comment-eye-outline",

  "`": "console",
  "1": "lock_pin_1",
  "2": "lock_pin_2",
  "3": "lock_pin_3",
  "4": "lock_cycle_attacker",
  "5": "lock_cycle_hostile",
  "6": "lock_cycle_friendly",
  "7": "lock_cycle_all",
  "8": "lock_cycle_sub_targets",
  "9": "hail",
  "0": "lock_pin_clear",

  "Tab": "radar_ping",
  "Q": "roll_left",
  "W": "strafe_forward",
  "E": "roll_right",
  "R": "flight_ready",
  "T": "lock_reticle",
  "Y": "exit_seat",
  "U": "power_plants",
  "I": "engines_on_off",
  "O": "shields_on_off",
  "P": "weapons_on_off",
  "[": "check",
  "]": "cancel",
  "Backspace": "self_destruct",

  "S": "strafe_backward",
  "A": "strafe_left",
  "D": "strafe_right",
  "F": "cursor-pointer",
  "G": "gimbal_cycle",
  "H": "cm_decoy",
  "J": "cm_noise",
  "K": "vtol_toggle",
  "L": "car-light-high",
  "Enter": "comment-processing-outline",

  "LShift": "afterburner",
  "Z": "eye-outline",
  "X": "brake",
  "C": "cruise_control",
  "V": "scan_mode",
  "B": "quantum_marker",
  "N": "landing_gear",
  "M": "utility_items",
  ",": "radar_ping_angle_incr",
  ".": "radar_ping_angle_decr",
  "/": "turrets",
  "RShift": "mouse_aim_mode_cycle",

  "LCtrl": "strafe_down",
  "Space": "strafe_up",

  "Num7": "shield_raise_level_top",
  "Num8": "shield_raise_level_front",
  "Num9": "shield_raise_level_bottom",
  "Num4": "shield_raise_level_left",
  "Num5": "shield_reset",
  "Num6": "shield_raise_level_right",
  "Num2": "shield_raise_level_back",
}

export default function getIconWithName(name) {
  for (let i = 0; i < icons.length; i++) {
    if (icons[i].fName == name2icon[name])
      return <img src={icons[i].fPath} />;
  }
  return <TextIcon name={name} />;
}