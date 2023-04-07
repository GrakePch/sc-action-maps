import globalConstants from "../_globalConstants";

function TextIcon(props) {
  var showText = props.actionId.split("_").map(s => s === "v" ? "" : s[0].toUpperCase()).join("");
  if (showText.length < 4) {
    showText += props.actionId.slice(showText.length - 4).toString();
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