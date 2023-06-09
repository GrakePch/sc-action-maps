import globalConstants from "../_globalConstants";

function TextIcon(props) {
  var splittedList = props.actionId.split("_");
  if (splittedList.length >= 2 && splittedList[0] == "emote") {
    if (splittedList.length >= 3 && splittedList[1] == "cs") {
      showText = splittedList[2].toUpperCase().slice(0, 5);
    } else {
      showText = splittedList[1].toUpperCase().slice(0, 5);
    }
  } else {
    var showText = splittedList.map(s => !s || s === "v" ? "" : s[0].toUpperCase()).join("");
    if (showText.length < 4 && splittedList.length > 0) {
      showText += splittedList[splittedList.length - 1].slice(1, 5 - showText.length).toString();
    }
  }

  var color = globalConstants.modifierColorMap[props.modifier];

  return <div className={props.className} style={{
    border: `.1rem solid ${color}`,
    fontSize: ".75rem",
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    color: color
  }}>
    <p style={{
      margin: 0,
      paddingTop: ".1rem",
      width: "100%",
      overflowWrap: "break-word",
      lineHeight: "80%",
      alignSelf: "center",
    }}>{showText}</p>
  </div>
}

export default TextIcon;