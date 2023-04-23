import globalConstants from "../../_globalConstants";

const i18n = {
  en_US: {
    this_lang: "English",
    btn_menu: "Menu ≡",
    btn_upload: "Upload actionmaps.xml",
    btn_debug: "Debug Toggle: Displaying Action Id",

    txt_maxIconsOnAKey_title: "Number of Icons",
    txt_maxIconsOnAKey_info: "Set the max number of icons shown on a key.",

    txt_actionPrior_title: "Action Priorities",
    txt_actionPrior_info: "Action categories near the top will be displayed on the key with higher priority. Click on the eye icons to change the visibilities.",
    btn_actionPrior_visibleToTop: "⮝ Move Visible Actions to Top",
    txt_modPrior_title: "Modifier Priorities",
    txt_modPrior_info: "Modifiers near the top will be displayed on the key with higher priority within the same action category. Click on the eye icons to change the visibilities.",
    btn_modPrior_visibleToTop: "⮝ Move Visible Modifiers to Top",

    txt_action_flight_basic: "Flight - Basic",
    txt_action_v_targeting_radar: "Vehicle - Targeting & Radar",
    txt_action_v_mining_salvaging: "Vehicle - Mining & Salvaging",
    txt_action_v_weapon_defense: "Vehicle - Weapons & Defense",
    txt_action_turret_all: "Turret - All",
    txt_action_groundV_basic: "Ground Vehicle - Basic",
    txt_action_onFoot_eva_all: "On Foot & E.V.A - All",
    txt_action_p_general_social: "Player - General & Social",
    txt_action_p_interactions: "Player - Interactions",
    txt_action_p_emotes: "Player - Emotes",
    txt_action_voipFoipHeadTracking: "VOIP/FOIP/Head Tracking",
    txt_action_ea_spectator: "Electronic Access - Spectator",
    txt_action_camera: "Camera",

    txt_mod__1tap: <>Single Press (Short/<span style={{ color: globalConstants.modifierColorMap._hold }}>Long</span>)</>,
    txt_mod__2tap: "Double Tap",
    txt_mod_lalt: "Left Alt",
    txt_mod_ralt: "Right Alt",
    txt_mod_lshift: "Left Shift",
    txt_mod_rshift: "Right Shift",
    txt_mod_lctrl: "Left Ctrl",
    txt_mod_rctrl: "Right Ctrl",
  },
  zh_CN: {
    this_lang: "简体中文",
    btn_menu: "菜单 ≡",
    btn_upload: "上传 actionmaps.xml",
    btn_debug: "调试切换：显示操作 Id",

    txt_maxIconsOnAKey_title: "图标数量",
    txt_maxIconsOnAKey_info: "设置单个按键上显示图标的数量上限。",

    txt_actionPrior_title: "操作项优先级",
    txt_actionPrior_info: "靠近顶端的操作类别将会在按键上优先显示。点击眼睛图标以更改可见性。",
    btn_actionPrior_visibleToTop: "⮝ 置顶可见操作项",
    txt_modPrior_title: "修饰键优先级",
    txt_modPrior_info: "同一个操作类别中，靠近顶端的修饰键将会在按键上优先显示。点击眼睛图标以更改可见性。",
    btn_modPrior_visibleToTop: "⮝ 置顶可见修饰键",

    txt_action_flight_basic: "飞行 - 基础",
    txt_action_v_targeting_radar: "载具 - 目标与雷达",
    txt_action_v_mining_salvaging: "载具 - 采矿与打捞",
    txt_action_v_weapon_defense: "载具 - 武器与防御",
    txt_action_turret_all: "炮塔 - 全部",
    txt_action_groundV_basic: "地面载具 - 基础",
    txt_action_onFoot_eva_all: "步行与舱外活动 - 全部",
    txt_action_p_general_social: "玩家 - 常规与社交",
    txt_action_p_interactions: "玩家 - 交互",
    txt_action_p_emotes: "玩家 - 动作表情",
    txt_action_voipFoipHeadTracking: "语音/面部捕捉/头部追踪",
    txt_action_ea_spectator: "Electronic Access - 旁观者",
    txt_action_camera: "相机",

    txt_mod__1tap: <>单击 (短按/<span style={{ color: globalConstants.modifierColorMap._hold }}>长按</span>)</>,
    txt_mod__2tap: "双击",
    txt_mod_lalt: "左 Alt",
    txt_mod_ralt: "右 Alt",
    txt_mod_lshift: "左 Shift",
    txt_mod_rshift: "右 Shift",
    txt_mod_lctrl: "左 Ctrl",
    txt_mod_rctrl: "右 Ctrl",
  }
}

export default i18n;