import "./Key.css";
import kbId2Name from "../../../../assets/maps/keyboardId2Name.json";
import getElementsWithActions from "../../../../funcs/action2Icon";
import getActionsWithInput from "../../../../funcs/inputToAction";
import globalConstants from "../../../../_globalConstants";
import { useContext, useEffect, useState } from "react";
import ActionCatePriorityContext from "../../../../contexts/ActionCatePriorityContext";
import ActionMapI2AContext from "../../../../contexts/ActionMapI2AContext";
import ModifierPriorityContext from "../../../../contexts/ModifierPriorityContext";
import GlobalVarsContext from "../../../../contexts/_globalVarsContext";

function Key({
  id = "unknown",
  device = "kb1",
  defaultSz = 5.5,
  widthMod = 1,
  heightMod = 1,
  isDebug = false,
}) {
  const actionCatePriority = useContext(ActionCatePriorityContext);
  const modifierPriority = useContext(ModifierPriorityContext);
  const actionMapI2A = useContext(ActionMapI2AContext);
  const { globalVars, setGlobalVars } = useContext(GlobalVarsContext);
  const [actionListObj, setActionListObj] = useState(getActionsWithInput(
    id,
    device,
    actionMapI2A,
    actionCatePriority,
    modifierPriority
  ));

  useEffect(() => {

    setActionListObj(getActionsWithInput(
      id,
      device,
      actionMapI2A,
      actionCatePriority,
      modifierPriority,
      globalVars.maxIconsOnAKey,
    ));

  }, [
    actionMapI2A,
    actionCatePriority,
    modifierPriority,
    globalVars
  ])

  return (
    <div
      className="Key-root"
      style={{
        width: defaultSz * (widthMod) + "rem",
        height: defaultSz * (heightMod) + "rem",
      }}
      onClick={() => {
        if (!actionListObj || !actionListObj.actionList || actionListObj.actionList.length === 0) return;
        setGlobalVars(obj => {
          let newObj = JSON.parse(JSON.stringify(obj));
          if (newObj.keyDetails.keyId === id) newObj.keyDetails.lockShowing = !newObj.keyDetails.lockShowing;
          else {
            newObj.keyDetails.keyId = id;
            newObj.keyDetails.actionListObj = actionListObj;
          }
          return newObj;
        })
        // console.log(actionListObj.actionList)
      }}
      onMouseEnter={() => {
        if (globalVars.keyDetails.lockShowing) return;
        setGlobalVars(obj => {
          let newObj = JSON.parse(JSON.stringify(obj));
          newObj.keyDetails.showOnHover = true;
          newObj.keyDetails.keyId = id;
          newObj.keyDetails.actionListObj = actionListObj;
          return newObj;
        })
      }}
      onMouseLeave={() => {
        setGlobalVars(obj => {
          let newObj = JSON.parse(JSON.stringify(obj));
          newObj.keyDetails.showOnHover = false;
          return newObj;
        })
      }}
    >
      {
        id &&
        <div className={"Key-cap" + (globalVars.keyDetails.lockShowing && globalVars.keyDetails.keyId === id ? " active" : "")} style={globalConstants.modifierColorMap[id] && {
          boxShadow: "0 0 0 2px " + globalConstants.modifierColorMap[id]
        }}>
          {
            actionListObj.numVisible <= 3 &&
            <p className="Key-name">{kbId2Name.map[id]}</p>
          }
          <div className="Key-icon-container">{getElementsWithActions(id, actionListObj, isDebug ? "debug" : "icon")}</div>
        </div>
      }
    </div>
  )
}

export default Key;