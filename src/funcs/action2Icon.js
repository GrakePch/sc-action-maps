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

export default function getElementsWithActions(inputId, actionListObj, showing = "icon") {
  if (inputId === "win") {
    return <img src={StarCitizenLogo} alt="Star Citizen Logo" className="color-_ star-citizen-logo" />
  }
  if (inputId === "backtick") {
    return <img src={consoleIcon} alt="console" className="icon-1x1 color-_" />
  }

  if (showing === "debug") {
    return <div style={{ fontSize: ".45rem" }}>
      {actionListObj.actionList.map(([action, modifier], idx) =>
        <div key={idx} style={{ color: globalConstants.modifierColorMap[modifier] }}>{action}</div>
      )}
    </div>;
  }

  if (!actionListObj) return null;

  let actionListVisible = [];
  for (const actionArr of actionListObj.actionList)
    if (actionArr[actionArr.length - 1]) actionListVisible.push(actionArr);

  if (actionListVisible.length === 0) return null;

  var [numInFirstRow, clsNameFirstRow, clsNameRemainedRows] = genIconLayoutInfo(inputId, actionListVisible.length);

  var iconsFirstRow = [];
  var iconsRemainedRows = [];
  for (let a = 0; a < numInFirstRow; a++)
    genAndPushIconElement(iconsFirstRow, a, actionListVisible, clsNameFirstRow);
  for (let a = numInFirstRow; a < actionListVisible.length; a++)
    genAndPushIconElement(iconsRemainedRows, a, actionListVisible, clsNameRemainedRows);
  return <>
    <div className="Key-icon-first-row">{iconsFirstRow}</div>
    {iconsRemainedRows.length > 0 &&
      <div className="Key-icon-remained-rows">{iconsRemainedRows}</div>}
  </>;
}

function genAndPushIconElement(destList, actionIdx, actionList, additionalClassName) {
  const [action, modifier, category, visibility] = actionList[actionIdx];
  if (!visibility) return;
  const iconFileName = action2IconFileName[action];

  if (iconFileName) {
    let iconFound = false;
    for (let i = 0; i < icons.length; i++) {
      if (icons[i].fName === iconFileName) {
        destList.push(
          <img
            key={actionIdx}
            src={icons[i].fPath}
            alt={icons[i].fName}
            className={additionalClassName + " color-" + modifier} />
        )
        iconFound = true;
        break;
      }
    }
    if (iconFound) return;
  }

  destList.push(
    <TextIcon
      key={actionIdx}
      actionId={action}
      modifier={modifier}
      className={additionalClassName} />
  )
}

/**
 * Customize layout for different shape keys and different number of icons
 */
const nonStandardKeyMap = {
  backspace: [2, 1],
  tab: [1.5, 1],
  backslash: [1.5, 1],
  capslock: [1.75, 1],
  enter: [2.25, 1],
  lshift: [2.25, 1],
  rshift: [2.75, 1],
  lctrl: [1.25, 1],
  lalt: [1.25, 1],
  space: [6.25, 1],
  ralt: [1.25, 1],
  rctrl: [1.25, 1],
  np_add: [1, 2],
  np_enter: [1, 2],
  np_0: [2, 1]
}
function genIconLayoutInfo(inputId, listLen) {
  var numInFirstRow = 1;
  var clsNameFirstRow = "icon-1x1";
  var clsNameRemainedRows = "icon-2x2";
  if (inputId === "space") {
    numInFirstRow = listLen;
  } else if (nonStandardKeyMap[inputId] != null) {
    let [dimX, dimY] = nonStandardKeyMap[inputId];
    if (dimX >= 1.25)
      switch (listLen) {
        case 1:
          numInFirstRow = 1;
          clsNameFirstRow = "icon-1x1";
          break;
        case 2:
          numInFirstRow = 2;
          clsNameFirstRow = "icon-1x1";
          break;
        case 3:
          numInFirstRow = 3;
          clsNameFirstRow = "icon-2x2";
          break;
        case 4:
          numInFirstRow = 2;
          clsNameFirstRow = "icon-2x2";
          clsNameRemainedRows = "icon-2x2";
          break;
        case 5:
          numInFirstRow = 2;
          clsNameFirstRow = "icon-2x2";
          clsNameRemainedRows = "icon-2x2";
          break;
        case 6:
          numInFirstRow = 3;
          clsNameFirstRow = "icon-2x2";
          clsNameRemainedRows = "icon-2x2";
          break;
        default:
          numInFirstRow = 3;
          clsNameFirstRow = "icon-3x3";
          clsNameRemainedRows = "icon-3x3";
      }
    else if (dimY >= 2)
      switch (listLen) {
        case 1:
          numInFirstRow = 1;
          clsNameFirstRow = "icon-1x1";
          break;
        case 2:
          numInFirstRow = 1;
          clsNameFirstRow = "icon-1x1";
          clsNameRemainedRows = "icon-1x1";
          break;
        case 3:
          numInFirstRow = 1;
          clsNameFirstRow = "icon-2x2";
          clsNameRemainedRows = "icon-2x2";
          break;
        case 4:
          numInFirstRow = 2;
          clsNameFirstRow = "icon-2x2";
          clsNameRemainedRows = "icon-2x2";
          break;
        case 5:
          numInFirstRow = 2;
          clsNameFirstRow = "icon-2x2";
          clsNameRemainedRows = "icon-3x3";
          break;
        default:
          numInFirstRow = 3;
          clsNameFirstRow = "icon-3x3";
          clsNameRemainedRows = "icon-3x3";
      }
  } else {
    // Standard 1x1 key cap
    switch (listLen) {
      case 1:
        numInFirstRow = 1;
        clsNameFirstRow = "icon-1x1";
        break;
      case 2:
        numInFirstRow = 2;
        clsNameFirstRow = "icon-2x2";
        break;
      case 3:
        numInFirstRow = 1;
        clsNameFirstRow = "icon-2x2";
        clsNameRemainedRows = "icon-2x2";
        break;
      case 4:
        numInFirstRow = 2;
        clsNameFirstRow = "icon-2x2";
        clsNameRemainedRows = "icon-2x2";
        break;
      case 5:
        numInFirstRow = 2;
        clsNameFirstRow = "icon-2x2";
        clsNameRemainedRows = "icon-3x3";
        break;
      default:
        numInFirstRow = 3;
        clsNameFirstRow = "icon-3x3";
        clsNameRemainedRows = "icon-3x3";
    }
  }
  return [numInFirstRow, clsNameFirstRow, clsNameRemainedRows];
}