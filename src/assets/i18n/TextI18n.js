import { useContext } from "react";
import i18n from "./i18n";
import GlobalVarsContext from "../../contexts/_globalVarsContext";

function TextI18n({ elem, langOverride }) {
  const { globalVars, _ } = useContext(GlobalVarsContext);
  const lang = langOverride == null
    ? globalVars.lang
    : langOverride;

  if (lang == null) return <>{elem}</>;
  if (i18n[lang] == null) return <>{elem}</>;
  let result = i18n[lang][elem];
  if (result == null)
    result = i18n.en_US[elem] ?? elem;
  if (typeof result === "string" || result instanceof String)
    return <>{result}</>;
  return result;
}

export default TextI18n;