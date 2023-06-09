import globalConstants from "../../_globalConstants";
import TextIcon from "../../funcs/TextIcon";

const i18n = {
  en_US: {
    this_lang: "English",
    btn_menu: "Menu ≡",

    txt_readme: <>
      <p>This is a community-made visual representation of the keybindings of the game Star Citizen (Alpha 3.18 and above).</p>
      <div className="placeholder-description">
        <div>
          <TextIcon actionId={"P_H"} modifier={"_"} className={"icon-1x1"} />
        </div>
        <p>Placeholder for action whose icon has not been made yet.</p>
      </div>
      <p>Hover on the keys to show all the related keybindings.</p>
      <p>Click on the MENU in the bottom-right for filters, file importing, and more settings.</p>
    </>,
    btn_readme_close: "[Close]",

    btn_upload: "Import actionmaps.xml",
    btn_reset: "Reset",
    btn_cancel: "Cancel",
    btn_reset_confirm: "Confirm to Reset Actionmaps",
    btn_debug: "Debug Toggle: Displaying Action Id",
    txt_help_upload: <>This Web App runs locally, so your file will not leave your device. <br />The file actionmaps.xml is usually under the path <span style={{ color: globalConstants.modifierColorMap._hold }}>StarCitizen/<wbr />LIVE/<wbr />USER/<wbr />Client/<wbr />0/<wbr />Profiles/<wbr />default/</span> or changing <span style={{ color: globalConstants.modifierColorMap._hold }}>LIVE/</span> to <span style={{ color: globalConstants.modifierColorMap._hold }}>PTU/</span> for PTU version.</>,

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
    txt_mod_f: "F",
    txt_mod_lalt: "Left Alt",
    txt_mod_ralt: "Right Alt",
    txt_mod_lshift: "Left Shift",
    txt_mod_rshift: "Right Shift",
    txt_mod_lctrl: "Left Ctrl",
    txt_mod_rctrl: "Right Ctrl",
    txt_mod__hold: "Long Press",

    txt_keyDetails_lockPrompt: "Click on the key to lock/unlock this detail panel.",
    txt_key_lalt: "Left Alt",
    txt_key_ralt: "Right Alt",
    txt_key_lshift: "Left Shift",
    txt_key_rshift: "Right Shift",
    txt_key_lctrl: "Left Ctrl",
    txt_key_rctrl: "Right Ctrl",
    txt_key_space: "Space",
    txt_key_enter: "⏎",
    txt_key_print: "PrtSc",
    txt_key_scrolllock: "Scroll Lock",
    txt_key_pause: "Pause",
    txt_key_insert: "Insert",
    txt_key_home: "Home",
    txt_key_pgup: "PgUp",
    txt_key_delete: "Delete",
    txt_key_end: "End",
    txt_key_pgdn: "PgDn",
    txt_key_up: "↑",
    txt_key_left: "←",
    txt_key_down: "↓",
    txt_key_right: "→",
    txt_key_numlock: "Num Lock",
    txt_key_np_enter: "Num ⏎",
    txt_key_np_1: "Num 1",
    txt_key_np_2: "Num 2",
    txt_key_np_3: "Num 3",
    txt_key_np_4: "Num 4",
    txt_key_np_5: "Num 5",
    txt_key_np_6: "Num 6",
    txt_key_np_7: "Num 7",
    txt_key_np_8: "Num 8",
    txt_key_np_9: "Num 9",
    txt_key_np_0: "Num 0",
    txt_key_np_add: "Num +",
    txt_key_np_subtract: "Num -",
    txt_key_np_multiply: "Num *",
    txt_key_np_divide: "Num /",
    txt_key_np_period: "Num .",

    txt_key_mouse1: "Left Mouse Button",
    txt_key_mouse2: "Right Mouse Button",
    txt_key_mouse3: "Middle Mouse Button",
    txt_key_mwheel_up: "Mouse Wheel ↑",
    txt_key_mwheel_down: "Mouse Wheel ↓",
    txt_key_mouse4: "Mouse Button 4",
    txt_key_mouse5: "Mouse Button 5",
    txt_key_mouse6: "Mouse Button 6",
    txt_key_mouse7: "Mouse Button 7",
    txt_key_maxis_x: "Mouse Axis X",
    txt_key_maxis_y: "Mouse Axis Y",
    txt_key_maxis_z: "Mouse Wheel Axis"
  },
  zh_CN: {
    this_lang: "简体中文",
    btn_menu: "菜单 ≡",

    txt_readme: <>
      <p>此为星际公民游戏的键位可视化展示，由社区制作。（游戏版本Alpha 3.18及以上）</p>
      <div className="placeholder-description">
        <div>
          <TextIcon actionId={"P_H"} modifier={"_"} className={"icon-1x1"} />
        </div>
        <p>图标尚未制作而使用的占位符。</p>
      </div>
      <p>悬停在按键上以显示所有相关按键绑定。</p>
      <p>点击右下菜单以使用筛选、文件导入和更多设置。</p>
    </>,
    btn_readme_close: "[关闭]",

    btn_upload: "导入 actionmaps.xml",
    btn_reset: "重置",
    btn_cancel: "取消",
    btn_reset_confirm: "确认以重置键位映射",
    btn_debug: "调试切换：显示操作 Id",
    txt_help_upload: <>此网页应用在本地运行，因此您的文件不会离开您的设备。<br />文件 actionmaps.xml 通常在 <span style={{ color: globalConstants.modifierColorMap._hold }}>StarCitizen/<wbr />LIVE/<wbr />USER/<wbr />Client/<wbr />0/<wbr />Profiles/<wbr />default/</span> 路径下，或者更改 <span style={{ color: globalConstants.modifierColorMap._hold }}>LIVE/</span> 为 <span style={{ color: globalConstants.modifierColorMap._hold }}>PTU/</span> 以使用PTU版本。</>,

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
    txt_mod__hold: "长按",

    txt_keyDetails_lockPrompt: "单击按键以锁定/解锁此详细面板。",
    txt_key_lalt: "左 Alt",
    txt_key_ralt: "右 Alt",
    txt_key_lshift: "左 Shift",
    txt_key_rshift: "右 Shift",
    txt_key_lctrl: "左 Ctrl",
    txt_key_rctrl: "右 Ctrl",
    txt_key_space: "空格",
    txt_key_np_enter: "数字键 ⏎",
    txt_key_np_1: "数字键 1",
    txt_key_np_2: "数字键 2",
    txt_key_np_3: "数字键 3",
    txt_key_np_4: "数字键 4",
    txt_key_np_5: "数字键 5",
    txt_key_np_6: "数字键 6",
    txt_key_np_7: "数字键 7",
    txt_key_np_8: "数字键 8",
    txt_key_np_9: "数字键 9",
    txt_key_np_0: "数字键 0",
    txt_key_np_add: "数字键 +",
    txt_key_np_subtract: "数字键 -",
    txt_key_np_multiply: "数字键 *",
    txt_key_np_divide: "数字键 /",
    txt_key_np_period: "数字键 .",

    txt_key_mouse1: "鼠标左键",
    txt_key_mouse2: "鼠标右键",
    txt_key_mouse3: "鼠标中键",
    txt_key_mwheel_up: "鼠标滚轮 ↑",
    txt_key_mwheel_down: "鼠标滚轮 ↓",
    txt_key_mouse4: "鼠标按键 4",
    txt_key_mouse5: "鼠标按键 5",
    txt_key_mouse6: "鼠标按键 6",
    txt_key_mouse7: "鼠标按键 7",
    txt_key_maxis_x: "鼠标 X 轴",
    txt_key_maxis_y: "鼠标 Y 轴",
    txt_key_maxis_z: "鼠标滚轮轴"
  }
}

export default i18n;