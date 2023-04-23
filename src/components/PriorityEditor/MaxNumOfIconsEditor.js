import { useContext } from "react";
import GlobalVarsContext from "../../contexts/_globalVarsContext";
import TextI18n from "../../assets/i18n/TextI18n";
import "./MaxNumOfIconsEditor.css";

function MaxNumOfIconsEditor() {
  const { globalVars, setGlobalVars } = useContext(GlobalVarsContext);

  return (
    <div className="maxIconsOnAKey-container">
      <h2 className="editor-title"><TextI18n elem="txt_maxIconsOnAKey_title" /></h2>
      <p className="editor-info"><TextI18n elem="txt_maxIconsOnAKey_info" /></p>
      <div className="maxIconsOnAKey-radio-group">
        {[1, 2, 4, 6, 9].map(num => <div
          className={"maxIconsOnAKey-radio" + (globalVars.maxIconsOnAKey == num
            ? " checked"
            : "")}
          key={num}>
          <input
            type="radio"
            name="maxIcons"
            id={"max" + num}
            value={num}
            defaultChecked={globalVars.maxIconsOnAKey == num}
            onClick={(e) => setGlobalVars(obj => {
              let newObj = JSON.parse(JSON.stringify(obj));
              newObj.maxIconsOnAKey = e.target.value;
              return newObj;
            })} />
          <label htmlFor={"max" + num}>{num}</label>
        </div>)}
      </div>
    </div>
  )
}

export default MaxNumOfIconsEditor;