import { useState } from "react";
import './App.css';
import Full from "./components/inputs/keyboard/Full";
import xmlToJson from "./funcs/xmlToJson";
import jsonToA2I from "./funcs/jsonToA2I";
import convertA2IToI2A from "./funcs/convertA2IToI2A";
import action2InputDefault from "./assets/maps/action2InputDefault.json";
import actionCategories from "./assets/maps/actionCategories.json";
import ActionCatePriorityContext from "./contexts/ActionCatePriorityContext";
import ActionMapI2AContext from "./contexts/ActionMapI2AContext";
import ModifierPriorityContext from "./contexts/ModifierPriorityContext";
import ActionPriorityEditor from "./components/PriorityEditor/ActionPriorityEditor";
import bug_outline from "./assets/icons_for_ui/bug-outline.svg";
import upload from "./assets/icons_for_ui/tray-arrow-up.svg";
import ModifierPriorityEditor from "./components/PriorityEditor/ModifierPriorityEditor";
import i18n from "./assets/i18n/i18n";
import TextI18n from "./assets/i18n/TextI18n";
import GlobalVarsContext from "./contexts/_globalVarsContext";
import globalConstants from "./_globalConstants";

function App() {
  const [isDebugging, setIsDebugging] = useState(false);
  const [actionMapI2A, setActionMapI2A] = useState(convertA2IToI2A(JSON.parse(JSON.stringify(action2InputDefault))));
  const [actionCatePriority, setActionCatePriority] = useState(Object.keys(actionCategories).map(item => globalConstants.actionCateDefaultVisible[item]
    ? [item, true]
    : [item, false]));
  const [modifierPriority, setModifierPriority] = useState(
    ["_1tap", "_2tap", "lalt", "ralt", "lshift", "rshift", "lctrl", "rctrl"].map(item => [item, true])
  );
  const [showMenu, setShowMenu] = useState(false);
  const [globalVars, setGlobalVars] = useState({
    lang: "en_US"
  });
  const globalVarsWithSetter = { globalVars, setGlobalVars }

  return (
    <ActionCatePriorityContext.Provider value={actionCatePriority}>
      <ModifierPriorityContext.Provider value={modifierPriority}>
        <ActionMapI2AContext.Provider value={actionMapI2A}>
          <GlobalVarsContext.Provider value={globalVarsWithSetter}>
            <div className="App">
              <header className="App-header">
                <Full defaultSz={6} isDebug={isDebugging} />
              </header>

              <div className="btn-container-float-b-r">
                <button className="Lang-toggle font-narrow" onClick={() => setGlobalVars(obj => {
                  let newObj = JSON.parse(JSON.stringify(obj));
                  newObj.lang = nextLangId(obj.lang);
                  return newObj;
                })}>
                  <TextI18n elem="this_lang" langOverride={nextLangId(globalVars.lang)} />
                </button>
                <button className="Menu-toggle font-narrow" onClick={() => setShowMenu(!showMenu)}>
                  <TextI18n elem="btn_menu" />
                </button>
              </div>

              <div className={`Menu-container Menu-container-${showMenu ? "show" : "hide"} font-narrow`}>
                <div className="scrollable-vert">
                  <ModifierPriorityEditor modifierPriority={modifierPriority} setModifierPriority={setModifierPriority} />
                  <ActionPriorityEditor actionCatePriority={actionCatePriority} setActionCatePriority={setActionCatePriority} />
                  <button className="btn-debug font-narrow" onClick={() => setIsDebugging(!isDebugging)}>
                    <div style={{ backgroundImage: `url(${bug_outline})` }} />
                    <TextI18n elem="btn_debug" />
                  </button>
                </div>
                <label className="upload-label" htmlFor="inputActionMaps">
                  <div style={{ backgroundImage: `url(${upload})` }} />
                  <TextI18n elem="btn_upload" />
                </label>
                <input type="file" id="inputActionMaps" name="actionMaps" accept=".xml" onChange={() => handleFileSelect(setActionMapI2A)} />
              </div>
            </div>
          </GlobalVarsContext.Provider>
        </ActionMapI2AContext.Provider>
      </ModifierPriorityContext.Provider>
    </ActionCatePriorityContext.Provider>
  );
}

function handleFileSelect(setActionMap) {
  const file = document.getElementById("inputActionMaps").files[0];

  if (!file) return;

  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function (e) {
    const xmlString = e.target.result;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    const result = xmlToJson(xmlDoc);
    // console.log(result);
    // console.log(JSON.stringify(result, null, 2));
    let A2I = jsonToA2I(result, true);
    // console.log(A2I);
    let I2A = convertA2IToI2A(A2I);
    // console.log(I2A);
    setActionMap(I2A)
  }
}

function nextLangId(lang) {
  const langIds = Object.keys(i18n);
  let i = null;
  for (i = 0; i < langIds.length; i++)
    if (langIds[i] == lang) break;

  if (i == null || i === langIds.length - 1)
    return langIds[0];
  else
    return langIds[i + 1];
}

export default App;
