import "./PriorityEditor.css";
import eye from "../../assets/icons_for_ui/eye.svg";
import eye_outline from "../../assets/icons_for_ui/eye-outline.svg";
import globalConstants from "../../_globalConstants";

function ModifierPriorityEditor({ modifierPriority, setModifierPriority }) {
  return (
    <div>
      <h2 className="editor-title">Modifier Priorities</h2>
      <p className="editor-info">Modifier near the top will be displayed on the key with higher priority within the same action category.</p>

      <div className="editor-item-container">
        <div className="space-between-hor">
          <button
            className="btn-small-icon btn-editor-tool btn-icon-black btn-bg-accent"
            onClick={() =>
              setModifierPriority(toggleAllVisibility(modifierPriority))}>
            {modifierPriority.every(item => item[1])
              ? <><div style={{ backgroundImage: `url(${eye})` }} />V</>
              : modifierPriority.every(item => !item[1])
                ? "\u2007"
                : <><div style={{ backgroundImage: `url(${eye_outline})` }} />-</>
            }
          </button>
          <button
            className="btn-small-text btn-editor-tool btn-text-black btn-bg-accent font-narrow"
            onClick={() => setModifierPriority(moveAllVisibleToTop(modifierPriority))}>
            {"\u2b9d"} Move Visible Modifiers to Top
          </button>
        </div>
        {
          modifierPriority.map((item, idx) => (
            <div key={idx} className="editor-item" style={{
              borderRadius: idx === 0
                ? ".5rem .5rem 0 0"
                : idx === modifierPriority.length - 1
                  ? "0 0 .5rem .5rem"
                  : 0
            }}>
              <button
                className="btn-small-icon btn-icon-accent btn-bg-dark"
                onClick={() =>
                  setModifierPriority(toggleVisibility(modifierPriority, idx))}>
                {item[1]
                  ? <><div style={{ backgroundImage: `url(${eye})` }} />V</>
                  : "\u2007"
                }
              </button>

              {globalConstants.modifierNameMap[item[0]] === "Single Press"
                ? <>Single Press (Short/<span style={{ color: globalConstants.modifierColorMap._hold }}>Long</span>)</>
                : <span style={{ color: globalConstants.modifierColorMap[item[0]] }}>{globalConstants.modifierNameMap[item[0]]}</span>
              }

              <div className="flex-grow"></div>
              {idx > 0
                ? <button
                  className="btn-small-text btn-text-accent btn-bg-dark"
                  onClick={() =>
                    setModifierPriority(moveItemInArray(idx - 1, idx, modifierPriority))
                  }>{"\u25B2"}</button>
                : <button
                  className="btn-small-text btn-text-accent btn-bg-dark btn-disabled"
                  disabled>{"\u25B2"}</button>
              }
              {idx < modifierPriority.length - 1
                ? <button
                  className="btn-small-text btn-text-accent btn-bg-dark"
                  onClick={() =>
                    setModifierPriority(moveItemInArray(idx + 1, idx, modifierPriority))
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

function moveAllVisibleToTop(arr) {
  let arrVisible = [];
  let arrInvisible = [];
  arr.forEach(tuple => {
    if (tuple[1]) arrVisible.push(tuple);
    else arrInvisible.push(tuple);
  })
  return arrVisible.concat(arrInvisible);
}

function toggleVisibility(arr, idx) {
  let result = [...arr];
  result[idx][1] = !result[idx][1];
  return result;
}

function toggleAllVisibility(arr) {
  let result = [...arr];
  let curState = arr.every(item => item[1])
    ? 2
    : arr.every(item => !item[1])
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

export default ModifierPriorityEditor;