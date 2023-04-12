import "./Full.css";
import Numpad from "./Numpad";
import Tenkeyless from "./Tenkeyless";

function Full(props) {
  return (
    <div className="Full-root">
      <Tenkeyless defaultSz={props.defaultSz} isDebug={props.isDebug} actionMapI2A={props.actionMapI2A}/>
      <Numpad defaultSz={props.defaultSz} isDebug={props.isDebug} actionMapI2A={props.actionMapI2A}/>
    </div>
  )
}

export default Full;