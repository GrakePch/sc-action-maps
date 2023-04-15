function ActionPriorityEditor({ actionCatePriority, setActionCatePriority }) {
  return (
    <div>
      {
        actionCatePriority.map((item, idx) => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {item}
            <span>
              <button onClick={() =>
                setActionCatePriority(moveItemInArray(Math.max(0, idx - 1), idx, actionCatePriority))
              }>{"\u25B2"}</button>
              <button onClick={() =>
                setActionCatePriority(moveItemInArray(Math.min(actionCatePriority.length - 1, idx + 1), idx, actionCatePriority))
              }>{"\u25BC"}</button>
            </span>
          </div>
        ))
      }
    </div>
  )
}

function moveItemInArray(destIdx, srcIdx, arr) {
  let src = arr[srcIdx];
  let result = [...arr];
  result.splice(srcIdx, 1);
  result.splice(destIdx, 0, src);
  return result;
}

export default ActionPriorityEditor;