import globalConstants from "../_globalConstants";
import action2IconFileName from "../assets/maps/action2IconFileName.json";
import TextIcon from "./TextIcon";
import StarCitizenLogo from "../assets/icons/STARCITIZEN_BLACK.png";
import consoleIcon from "../assets/icons/console.svg";

const reqIcons = require.context('../assets/icons/', true, /\.(png|jpe?g|svg|JPE?G)$/)

const icons = reqIcons.keys().map(p => ({
  fName: p.replace(/^.*[\\/]/, '').replace(/\.(png|jpe?g|svg|JPE?G)$/, ''),
  fPath: reqIcons(p)
}));

/**
 * showing: "icon | debug"
 */

export default function getElementsWithActions(inputId, actionList, showing = "icon", limit = 4) {
  if (inputId === "win") {
    return <img src={StarCitizenLogo} alt="Star Citizen Logo" className="color-_ star-citizen-logo" />
  }
  if (inputId === "backtick") {
    return <img src={consoleIcon} alt="console" className="icon-1x1 color-_" />
  }

  if (showing === "debug") {
    return <div style={{ fontSize: ".45rem" }}>
      {actionList.map(([action, modifier], idx) =>
        <div key={idx} style={{ color: globalConstants.modifierColorMap[modifier] }}>{action}</div>
      )}
    </div>;
  }

  var clsName =
    inputId === "space" || actionList.length <= 1
      ? "icon-1x1"
      : actionList.length <= 4
        ? "icon-2x2"
        : "icon-3x3";

  var iconElement = [];
  for (let a = 0; a < actionList.length; a++) {
    const [action, modifier] = actionList[a];
    const iconFileName = action2IconFileName[action];

    // Special size for actionList == 5
    let currentClsName = clsName;
    if (actionList.length == 5 && a <= 1)
      currentClsName = "icon-2x2";

    if (iconFileName) {
      let iconFound = false;
      for (let i = 0; i < icons.length; i++) {
        if (icons[i].fName === iconFileName) {
          iconElement.push(
            <img
              key={a}
              src={icons[i].fPath}
              alt={icons[i].fName}
              className={currentClsName + " color-" + modifier} />
          )
          iconFound = true;
          break;
        }
      }
      if (iconFound) continue;
    }

    iconElement.push(
      <TextIcon
        key={a}
        actionId={action}
        modifier={modifier}
        className={currentClsName} />
    )

  }
  return iconElement;
}