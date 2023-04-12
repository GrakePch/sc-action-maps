import { useState } from "react";
import './App.css';
import Full from "./components/inputs/keyboard/Full";
import xmlToJson from "./funcs/xmlToJson";
import jsonToA2I from "./funcs/jsonToA2I";
import convertA2IToI2A from "./funcs/convertA2IToI2A";
import action2InputDefault from "./assets/maps/action2InputDefault.json"

function App() {
  const [isDebugging, setIsDebugging] = useState(false);
  const [actionMapI2A, setActionMapI2A] = useState(convertA2IToI2A(action2InputDefault));
  
  return (
    <div className="App">
      <header className="App-header">
        <Full defaultSz={6} isDebug={isDebugging} actionMapI2A={actionMapI2A} />
      </header>
      <div className="Upload-container">
        <label className="upload-label" htmlFor="inputActionMaps">Upload actionmaps.xml</label>
        <input type="file" id="inputActionMaps" name="actionMaps" accept=".xml" onChange={() => handleFileSelect(setActionMapI2A)} />
        <button onClick={() => { setIsDebugging(!isDebugging) }}>Debugging</button>
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
    console.log(result);
    // console.log(JSON.stringify(result, null, 2));
    let A2I = jsonToA2I(result, true);
    console.log(A2I);
    let I2A = convertA2IToI2A(A2I);
    console.log(I2A);
    setActionMap(I2A)
  }
}


export default App;
