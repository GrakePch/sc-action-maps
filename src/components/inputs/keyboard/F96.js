import "./F96.css";
import Key from "./key/Key";

function F96() {
  let defaultSz = 6;
  let linesInfo = [];
  linesInfo.push(["Esc", ...Array.from({ length: 12 }, (_, i) => "F" + (i + 1)), "PrtSc", "Del", "Home", "End", "PgUp", "PgDn"]);
  linesInfo.push(["`", ...Array.from({ length: 9 }, (_, i) => i + 1), "0", "-", "=", ["Backspace", 2], "NumLock", "Num/", "Num*", "Num-"]);
  linesInfo.push([["Tab", 1.5], "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", ["\\", 1.5], "Num7", "Num8", "Num9", ["Num+", 1, 2]]);
  linesInfo.push([["CapsLock", 1.75], "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", ["Enter", 2.25], "Num4", "Num5", "Num6"]);
  linesInfo.push([["LShift", 2.25], "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", ["RShift", 1.75], "\u2BC5", "Num1", "Num2", "Num3", ["NumEnter", 1, 2]])
  linesInfo.push([["LCtrl", 1.25], ["Win", 1.25], ["LAlt", 1.25], ["Space", 6.25], "RAlt", "Fn", "RCtrl", "\u2BC7", "\u2BC6", "\u2BC8", "Num0", "Num."])

  let lineElements = linesInfo.map((l, i) =>
    <div key={i} id={"F96-l" + i} style={{ height: defaultSz + "rem" }}>
      {l.map((item, i) =>
        Array.isArray(item)
          ? <Key key={i} id={item[0]} defaultSz={defaultSz} widthMod={item[1]} heightMod={item[2] ?? 1} />
          : <Key key={i} id={item} />
      )}
    </div>
  )

  return (
    <div className="F96-root">
      {lineElements}
    </div>
  )
}

export default F96;