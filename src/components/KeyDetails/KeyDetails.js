import { useEffect, useState } from "react";
import "./KeyDetails.css";
import globalConstants from "../../_globalConstants";
import TextI18n from "../../assets/i18n/TextI18n";
import TextIcon from "../../funcs/TextIcon";
import kbId2Name from "../../assets/maps/keyboardId2Name.json";
import action2IconFileName from "../../assets/maps/action2IconFileName.json";
import actionsNeedHold from "../../assets/maps/actionsNeedHold.json";

const reqIcons = require.context('../../assets/icons/', true, /\.(png|jpe?g|svg|JPE?G)$/)

const icons = reqIcons.keys().map(p => ({
  fName: p.replace(/^.*[\\/]/, '').replace(/\.(png|jpe?g|svg|JPE?G)$/, ''),
  fPath: reqIcons(p)
}));

function KeyDetails(props) {
  const actionListObj = props.actions;
  const keyId = props.keyId;
  const [showOnHoverSelf, setShowOnHoverSelf] = useState(false);
  const lockShowing = props.lockShowing;
  const showOnHoverKey = props.showOnHover;
  const opacity = props.opacity;
  const [detailListObj, setDetailListObj] = useState({});

  useEffect(() => {
    if (!actionListObj || !actionListObj.actionList || actionListObj.actionList.length === 0) return;

    let newDetailListObj = {};
    for (const modifier of Object.keys(globalConstants.modifierColorMap))
      newDetailListObj[modifier] = {};

    for (const item of actionListObj.actionList) {
      let actionId = item[0];
      let actionMod = item[1];
      let actionCate = item[2];
      if (!newDetailListObj[actionMod][actionCate]) newDetailListObj[actionMod][actionCate] = [];
      if (newDetailListObj[actionMod][actionCate].includes(actionId)) continue;
      newDetailListObj[actionMod][actionCate].push(actionId);
    }
    setDetailListObj(newDetailListObj);
  }, [actionListObj])

  if (!actionListObj || !actionListObj.actionList || actionListObj.actionList.length === 0) return;

  return (
    <div
      className="KeyDetails-container font-narrow"
      onMouseEnter={() => setShowOnHoverSelf(true)}
      onMouseLeave={() => setShowOnHoverSelf(false)}
      style={{
        display: (showOnHoverSelf || lockShowing || showOnHoverKey) ? "block" : "none",
        outlineColor: "#afe5f4",
        outlineStyle: "solid",
        outlineWidth: lockShowing ? 4 : 0,
        opacity: opacity ? 1 : 0
      }}>
      <p className="KeyDetails-info"><TextI18n elem="txt_keyDetails_lockPrompt" /></p>
      {Object.entries(detailListObj).map(([mod, cateObj], idx) =>
        (cateObj && Object.keys(cateObj).length !== 0) ?
          <div key={idx}>

            <h2 className="KeyDetails-title">
              {mod !== "_" &&
                <span className="KeyDetails-title-modifier"
                  style={{ backgroundColor: globalConstants.modifierColorMap[mod] }}>
                  <TextI18n elem={"txt_mod_" + mod} />
                </span>
              }
              <span className="KeyDetails-title-key">
                <TextI18n elem={"txt_key_" + keyId} fallbackTxt={kbId2Name.map[keyId]} />
              </span>
            </h2>

            {Object.entries(cateObj).map(([cate, actionIdList], jdx) =>
              <div key={jdx} className="KeyDetails-actionGroup">

                <div className="KeyDetails-category">
                  <TextI18n elem={cate} isActionName={true} />
                </div>

                {actionIdList.map((actionId, kdx) =>
                  <div key={kdx} className="KeyDetails-action">
                    {getIcon(actionId, mod)}
                    <TextI18n elem={actionId && actionId.startsWith("_custom_")
                      ? Object.keys(actionsNeedHold).filter(i => Array.isArray(actionsNeedHold[i]) && actionsNeedHold[i].includes(actionId))[0]
                      : actionId
                    } isActionName={true} />
                  </div>
                )}
              </div>
            )}
          </div>
          :
          null
      )}
    </div >
  )
}

function getIcon(actionId, modifier) {
  let iconFileName = action2IconFileName[actionId];
  let iconList = [];
  let iconIdx = 0;
  if (actionId) {
    let iconFound = false;
    for (let i = 0; i < icons.length; i++) {
      if (icons[i].fName === iconFileName) {
        iconList.push(
          <img
            key={iconIdx}
            src={icons[i].fPath}
            alt={icons[i].fName}
            className={"icon-1x1 color-" + modifier} />
        )
        iconIdx++;
        iconFound = true;
        break;
      }
    }
    if (iconFound) return iconList;
  }

  iconList.push(
    <TextIcon
      key={iconIdx}
      actionId={actionId}
      modifier={modifier}
      className={"icon-1x1"} />
  )
  return iconList;
}

export default KeyDetails;