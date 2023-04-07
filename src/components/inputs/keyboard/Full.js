import "./Full.css";
import Numpad from "./Numpad";
import Tenkeyless from "./Tenkeyless";

function Full(props) {
  return (
    <div className="Full-root">
      <Tenkeyless defaultSz={props.defaultSz} isDebug={props.isDebug} />
      <Numpad defaultSz={props.defaultSz} isDebug={props.isDebug} />
    </div>
  )
}

export default Full;