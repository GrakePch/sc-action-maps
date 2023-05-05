import Key from "../key/Key";
import "./Mouse.css";

function Mouse(props) {
  let defaultSz = props.defaultSz ?? 5.5;
  let isDebug = props.isDebug;
  let linesInfo = [
    [[null, .5], ["mouse1", 1, 2], "mouse3", ["mouse2", 1, 2], [null, .5], "mwheel_up"],
    [[null, .5], null, "maxis_z", null, [null, .5], "mwheel_down"],
    ["mouse5", ["maxis_y", 2], "mouse7"],
    ["mouse4", ["maxis_x", 2], "mouse6"],
    [null],
  ];

  let lineElements = linesInfo.map((l, i) =>
    <div key={i} id={"Mouse-l" + i} style={{ height: defaultSz + "rem" }}>
      {l.map((item, i) =>
        Array.isArray(item)
          ? <Key
            key={i}
            id={item[0]}
            device="mo1"
            defaultSz={defaultSz}
            widthMod={item[1] ?? 1}
            heightMod={item[2] ?? 1}
            isDebug={isDebug} />
          : <Key key={i} id={item} device="mo1" defaultSz={defaultSz} isDebug={isDebug} />
      )}
    </div>
  )

  return (
    <div className="Mouse-root">
      <div className="Mouse-shape font-narrow">
        <div style={{
          left: defaultSz + "rem",
          top: 2 * defaultSz + "rem",
          width: 2 * defaultSz + "rem",
          height: 2.5 * defaultSz + "rem",
        }}></div>
        <div style={{
          left: .5 * defaultSz + "rem",
          top: 4 * defaultSz + "rem",
          width: 3 * defaultSz + "rem",
          height: defaultSz + "rem",
          borderBottomLeftRadius: defaultSz + "rem",
          borderBottomRightRadius: defaultSz + "rem",
        }}></div>
        <div style={{
          left: 3.75 * defaultSz + "rem",
          width: defaultSz + "rem",
          height: defaultSz + "rem",
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          userSelect: "none",
        }}><p style={{ marginRight: ".25rem" }}>Wheel →</p></div>
        <div style={{
          left: 3.75 * defaultSz + "rem",
          top: defaultSz + "rem",
          width: defaultSz + "rem",
          height: defaultSz + "rem",
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          userSelect: "none",
        }}><p style={{ marginRight: ".25rem" }}>← Wheel</p></div>
      </div>
      {lineElements}
    </div>
  )
}

export default Mouse;