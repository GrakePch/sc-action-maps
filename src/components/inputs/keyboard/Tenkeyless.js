import "./F60WithFn.css";
import F60WithFn from "./F60WithFn";
import Key from "../key/Key";

function Tenkeyless(props) {
  let defaultSz = props.defaultSz ?? 5.5;
  let linesInfo = [
    ["print", "scrolllock", "pause"],
    ["insert", "home", "pgup"],
    ["delete", "end", "pgdn"],
    [],
    [null, "up"],
    ["left", "down", "right"]
  ];

  let lineElements = linesInfo.map((l, i) =>
    <div key={i} id={"F60WithFn-l" + i} style={{ height: defaultSz + "rem" }}>
      {l.map((item, i) =>
        Array.isArray(item)
          ? <Key
            key={i}
            id={item[0]}
            defaultSz={defaultSz}
            widthMod={item[1] ?? 1}
            heightMod={item[2] ?? 1}
            isDebug={props.isDebugging} />
          : <Key key={i} id={item} defaultSz={defaultSz} isDebug={props.isDebug} />
      )}
    </div>
  )

  return (
    <>
      <F60WithFn defaultSz={props.defaultSz} isDebug={props.isDebug} />
      <div className="F60WithFn-root">
        {lineElements}
      </div>
    </>
  )
}

export default Tenkeyless;