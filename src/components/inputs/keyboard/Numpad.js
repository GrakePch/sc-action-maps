import "./Numpad.css";
import Key from "../key/Key";


function Numpad(props) {
  let defaultSz = props.defaultSz ?? 5.5;
  let linesInfo = [
    ["numlock", "np_divide", "np_multiply", "np_subtract"],
    ["np_7", "np_8", "np_9", ["np_add", 1, 2]],
    ["np_4", "np_5", "np_6"],
    ["np_1", "np_2", "np_3", ["np_enter", 1, 2]],
    [["np_0", 2], "np_period"]
  ];

  let lineElements = linesInfo.map((l, i) =>
    <div key={i} id={"NP-l" + i} style={{ height: defaultSz + "rem" }}>
      {l.map((item, i) =>
        Array.isArray(item)
          ? <Key key={i} id={item[0]} defaultSz={defaultSz} widthMod={item[1] ?? 1} heightMod={item[2] ?? 1} isDebug={props.isDebug} />
          : <Key key={i} id={item} defaultSz={defaultSz} isDebug={props.isDebug} />
      )}
    </div>
  )

  return (
    <div className="NP-root">
      {lineElements}
    </div>
  )
}

export default Numpad;