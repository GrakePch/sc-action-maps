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
import help from "./assets/icons_for_ui/help-circle.svg";
import ModifierPriorityEditor from "./components/PriorityEditor/ModifierPriorityEditor";
import i18n from "./assets/i18n/i18n";
import TextI18n from "./assets/i18n/TextI18n";
import GlobalVarsContext from "./contexts/_globalVarsContext";
import globalConstants from "./_globalConstants";
import MaxNumOfIconsEditor from "./components/PriorityEditor/MaxNumOfIconsEditor";
import KeyDetails from "./components/KeyDetails/KeyDetails";

function App() {
  const [isDebugging, setIsDebugging] = useState(false);
  const [actionMapI2A, setActionMapI2A] = useState(convertA2IToI2A(JSON.parse(JSON.stringify(action2InputDefault))));
  const [isActionMapI2ADefault, setIsActionMapI2ADefault] = useState(true);
  const [isActionMapI2AResetPending, setIsActionMapI2AResetPending] = useState(false);
  const [actionCatePriority, setActionCatePriority] = useState(Object.keys(actionCategories).map(item => globalConstants.actionCateDefaultVisible[item]
    ? [item, true]
    : [item, false]));
  const [modifierPriority, setModifierPriority] = useState(
    ["_1tap", "_2tap", "lalt", "ralt", "lshift", "rshift", "lctrl", "rctrl"].map(item => [item, true])
  );
  const [showMenu, setShowMenu] = useState(false);
  const [globalVars, setGlobalVars] = useState({
    lang: "en_US",
    maxIconsOnAKey: 9,
    keyDetails: {
      showOnHover: false,
      lockShowing: false,
      keyId: null,
      actionListObj: null
    }
  });
  const globalVarsWithSetter = { globalVars, setGlobalVars };

  return (
    <ActionCatePriorityContext.Provider value={actionCatePriority}>
      <ModifierPriorityContext.Provider value={modifierPriority}>
        <ActionMapI2AContext.Provider value={actionMapI2A}>
          <GlobalVarsContext.Provider value={globalVarsWithSetter}>
            <div className="App">

              <div className="App-readme font-narrow">
                <div className="App-readme-close-button" onClick={() => { document.getElementsByClassName("App-readme")[0].style.display = "none"; }}><TextI18n elem="btn_readme_close" /></div>
                <TextI18n elem="txt_readme" />
              </div>

              <div className="App-main">
                <Full defaultSz={6} isDebug={isDebugging} />
              </div>

              <div className="btn-container-float-b-r">

                <button className="GitHub-link" onClick={() => window.open("https://github.com/GrakePch/sc-action-maps", "_blank")}>
                  <svg width="98" height="96" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" /></svg>
                </button>

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

                  <MaxNumOfIconsEditor />

                  <ModifierPriorityEditor modifierPriority={modifierPriority} setModifierPriority={setModifierPriority} />

                  <ActionPriorityEditor actionCatePriority={actionCatePriority} setActionCatePriority={setActionCatePriority} />

                  <button className="btn-debug font-narrow" onClick={() => setIsDebugging(!isDebugging)}>
                    <div style={{ backgroundImage: `url(${bug_outline})` }} />
                    <TextI18n elem="btn_debug" />
                  </button>

                </div>

                <div className="upload-btn-set">
                  <div className="overlapping-btn">
                    <label
                      className="upload-label btn-bg-accent"
                      htmlFor="inputActionMaps"
                      onClick={() => {
                        document.getElementById("inputActionMaps").value = "";
                      }}>
                      <div className="upload-main-content">
                        {/* <div className="upload-icon" style={{ backgroundImage: `url(${upload})` }} /> */}
                        <TextI18n elem="btn_upload" />
                      </div>
                      <div className="help-icon" style={{ backgroundImage: `url(${help})` }}>
                        <div className="help-box">
                          <TextI18n elem="txt_help_upload" />
                        </div>
                      </div>
                    </label>
                    {(!isActionMapI2ADefault && isActionMapI2AResetPending) &&
                      <button className="upload-reset-confirm font-narrow"
                        onClick={() => {
                          handleUploadReset(setActionMapI2A, setIsActionMapI2ADefault);
                          setIsActionMapI2AResetPending(false);
                        }}>
                        <TextI18n elem="btn_reset_confirm" />
                      </button>
                    }
                  </div>

                  <input type="file" id="inputActionMaps" name="actionMaps" accept=".xml"
                    onChange={() => handleFileSelect(setActionMapI2A, setIsActionMapI2ADefault)}
                  />

                  {!isActionMapI2ADefault &&
                    <button className="upload-reset font-narrow"
                      onClick={() => setIsActionMapI2AResetPending(!isActionMapI2AResetPending)}>
                      {isActionMapI2AResetPending
                        ? <TextI18n elem="btn_cancel" />
                        : <TextI18n elem="btn_reset" />}
                    </button>
                  }
                </div>

              </div>
              <KeyDetails
                keyId={globalVars.keyDetails.keyId}
                actions={globalVars.keyDetails.actionListObj}
                lockShowing={globalVars.keyDetails.lockShowing}
                showOnHover={globalVars.keyDetails.showOnHover}
                opacity={!showMenu}
              />
            </div>
          </GlobalVarsContext.Provider>
        </ActionMapI2AContext.Provider>
      </ModifierPriorityContext.Provider>
    </ActionCatePriorityContext.Provider>
  );
}

function handleFileSelect(setActionMap, setIsActionMapDefault) {
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
    setActionMap(I2A);
    setIsActionMapDefault(false);
  }
}

function handleUploadReset(setActionMap, setIsActionMapDefault) {
  document.getElementById("inputActionMaps").value = "";
  setActionMap(convertA2IToI2A(JSON.parse(JSON.stringify(action2InputDefault))));
  setIsActionMapDefault(true);
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
