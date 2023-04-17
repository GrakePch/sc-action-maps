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

function App() {
  const [isDebugging, setIsDebugging] = useState(false);
  const [actionMapI2A, setActionMapI2A] = useState(convertA2IToI2A(JSON.parse(JSON.stringify(action2InputDefault))));
  const [actionCatePriority, setActionCatePriority] = useState(Object.keys(actionCategories).map(item => [item, true]));
  const [modifierPriority, setModifierPriority] = useState(
    ["_1tap", "_2tap", "lalt", "ralt", "lshift", "rshift", "lctrl", "rctrl"].map(item => [item, true])
  );
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <ActionCatePriorityContext.Provider value={actionCatePriority}>
          <ModifierPriorityContext.Provider value={modifierPriority}>
            <ActionMapI2AContext.Provider value={actionMapI2A}>
              <Full defaultSz={6} isDebug={isDebugging} />
            </ActionMapI2AContext.Provider>
          </ModifierPriorityContext.Provider>
        </ActionCatePriorityContext.Provider>
      </header>

      <button className="Menu-toggle font-narrow" onClick={() => setShowMenu(!showMenu)}>Menu ≡</button>

      <div className={`Menu-container Menu-container-${showMenu ? "show" : "hide"} font-narrow`}>
        <div className="scrollable-vert">
          <ModifierPriorityEditor modifierPriority={modifierPriority} setModifierPriority={setModifierPriority} />
          <ActionPriorityEditor actionCatePriority={actionCatePriority} setActionCatePriority={setActionCatePriority} />
          <button className="btn-debug font-narrow" onClick={() => { setIsDebugging(!isDebugging) }}><div style={{ backgroundImage: `url(${bug_outline})` }} />Debug: Toggle Displaying Action Id</button>
        </div>
        <label className="upload-label" htmlFor="inputActionMaps">
          <div style={{ backgroundImage: `url(${upload})` }} />
          Upload actionmaps.xml
        </label>
        <input type="file" id="inputActionMaps" name="actionMaps" accept=".xml" onChange={() => handleFileSelect(setActionMapI2A)} />
      </div>
    </div>
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


export default App;
