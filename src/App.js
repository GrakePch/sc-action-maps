import { useState } from "react";
import './App.css';
import Full from "./components/inputs/keyboard/Full";
import jsonToActionMaps from "./funcs/jsonToActionMaps";
import jsonToAllAction from "./funcs/jsonToAllAction";
import xmlToJson from "./funcs/xmlToJson";

function App() {
  const [isDebugging, setIsDebugging] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <Full defaultSz={6} isDebug={isDebugging} />
      </header>
      <div className="Upload-container">
        <label className="upload-label" htmlFor="inputActionMaps">Upload actionmaps.xml</label>
        <input type="file" id="inputActionMaps" name="actionMaps" accept=".xml" onChange={handleFileSelect} />
        <button onClick={() => { setIsDebugging(!isDebugging) }}>Debugging</button>
      </div>
    </div>
  );
}

function handleFileSelect() {
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
    console.log(jsonToActionMaps(result));
    // console.log(jsonToAllAction(result));
  }
}


export default App;
