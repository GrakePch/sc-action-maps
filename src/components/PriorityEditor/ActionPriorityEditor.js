import "./PriorityEditor.css";
import eye from "../../assets/icons_for_ui/eye.svg";
import eye_outline from "../../assets/icons_for_ui/eye-outline.svg";
import GlobalVarsContext from "../../contexts/_globalVarsContext";
import { useContext } from "react";
import i18nGetText from "../../assets/i18n/i18nGetText";

function ActionPriorityEditor({ actionCatePriority, setActionCatePriority }) {
  const { globalVars, _ } = useContext(GlobalVarsContext);
  const lang = globalVars.lang;

  return (
    <div>
      <h2 className="editor-title">{i18nGetText(lang, "txt_actionPrior_title")}</h2>
      <p className="editor-info">{i18nGetText(lang, "txt_actionPrior_info")}</p>

      <div className="editor-item-container">
        <div className="space-between-hor">
          <button
            className="btn-small-icon btn-editor-tool btn-icon-black btn-bg-accent"
            onClick={() =>
              setActionCatePriority(toggleAllVisibility(actionCatePriority))}>
            {actionCatePriority.every(item => item[1])
              ? <><div style={{ backgroundImage: `url(${eye})` }} />V</>
              : actionCatePriority.every(item => !item[1])
                ? "\u2007"
                : <><div style={{ backgroundImage: `url(${eye_outline})` }} />-</>
            }
          </button>
          <button
            className="btn-small-text btn-editor-tool btn-text-black btn-bg-accent font-narrow"
            onClick={() => setActionCatePriority(moveAllVisibleToTop(actionCatePriority))}>
            {i18nGetText(lang, "btn_actionPrior_visibleToTop")}
          </button>
        </div>
        {
          actionCatePriority.map((item, idx) => (
            <div key={idx} className="editor-item" style={{
              borderRadius: idx === 0
                ? ".5rem .5rem 0 0"
                : idx === actionCatePriority.length - 1
                  ? "0 0 .5rem .5rem"
                  : 0
            }}>
              <button
                className="btn-small-icon btn-icon-accent btn-bg-dark"
                onClick={() =>
                  setActionCatePriority(toggleVisibility(actionCatePriority, idx))}>
                {item[1]
                  ? <><div style={{ backgroundImage: `url(${eye})` }} />V</>
                  : "\u2007"
                }
              </button>

              {item[0]}

              <div className="flex-grow"></div>
              {idx > 0
                ? <button
                  className="btn-small-text btn-text-accent btn-bg-dark"
                  onClick={() =>
                    setActionCatePriority(moveItemInArray(idx - 1, idx, actionCatePriority))
                  }>{"\u25B2"}</button>
                : <button
                  className="btn-small-text btn-text-accent btn-bg-dark btn-disabled"
                  disabled>{"\u25B2"}</button>
              }
              {idx < actionCatePriority.length - 1
                ? <button
                  className="btn-small-text btn-text-accent btn-bg-dark"
                  onClick={() =>
                    setActionCatePriority(moveItemInArray(idx + 1, idx, actionCatePriority))
                  }>{"\u25BC"}</button>
                : <button
                  className="btn-small-text btn-text-accent btn-bg-dark btn-disabled"
                  disabled>{"\u25BC"}</button>
              }
            </div>
          ))
        }
      </div >
    </div >
  )
}

function moveItemInArray(destIdx, srcIdx, arr) {
  let src = arr[srcIdx];
  let result = [...arr];
  result.splice(srcIdx, 1);
  result.splice(destIdx, 0, src);
  return result;
}

function moveAllVisibleToTop(actionCateArr) {
  let arrVisible = [];
  let arrInvisible = [];
  actionCateArr.forEach(tuple => {
    if (tuple[1]) arrVisible.push(tuple);
    else arrInvisible.push(tuple);
  })
  return arrVisible.concat(arrInvisible);
}

function toggleVisibility(actionCateArr, idx) {
  let result = [...actionCateArr];
  result[idx][1] = !result[idx][1];
  return result;
}

function toggleAllVisibility(actionCateArr) {
  let result = [...actionCateArr];
  let curState = actionCateArr.every(item => item[1])
    ? 2
    : actionCateArr.every(item => !item[1])
      ? 0
      : 1;
  switch (curState) {
    case 0:
    case 1:
      result.forEach(tuple => { tuple[1] = 1 });
      break;
    case 2:
      result.forEach(tuple => { tuple[1] = 0 });
  }
  return result;
}

export default ActionPriorityEditor;