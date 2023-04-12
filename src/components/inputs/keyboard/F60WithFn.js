import "./F60WithFn.css";
import Key from "./key/Key";


function F60WithFn(props) {
  let defaultSz = props.defaultSz ?? 5.5;
  let linesInfo = [
    ["escape", null, "f1", "f2", "f3", "f4", [null, .5], "f5", "f6", "f7", "f8", [null, .5], "f9", "f10", "f11", "f12"],
    ["backtick", ...Array.from({ length: 9 }, (_, i) => i + 1), "0", "minus", "equals", ["backspace", 2]],
    [["tab", 1.5], "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "lbracket", "rbracket", ["backslash", 1.5]],
    [["capslock", 1.75], "a", "s", "d", "f", "g", "h", "j", "k", "l", "semicolon", "apostrophe", ["enter", 2.25]],
    [["lshift", 2.25], "z", "x", "c", "v", "b", "n", "m", "comma", "period", "slash", ["rshift", 2.75]],
    [["lctrl", 1.25], ["win", 1.25], ["lalt", 1.25], ["space", 6.25], ["ralt", 1.25], ["fn", 1.25], ["menu", 1.25], ["rctrl", 1.25]]
  ];

  let lineElements = linesInfo.map((l, i) =>
    <div key={i} id={"F60WithFn-l" + i} style={{ height: defaultSz + "rem" }}>
      {l.map((item, i) =>
        Array.isArray(item)
          ? <Key key={i} id={item[0]} defaultSz={defaultSz} widthMod={item[1] ?? 1} heightMod={item[2] ?? 1} isDebug={props.isDebug} actionMapI2A={props.actionMapI2A}/>
          : <Key key={i} id={item} defaultSz={defaultSz} isDebug={props.isDebug} actionMapI2A={props.actionMapI2A}/>
      )}
    </div>
  )

  return (
    <div className="F60WithFn-root">
      {lineElements}
    </div>
  )
}

export default F60WithFn;