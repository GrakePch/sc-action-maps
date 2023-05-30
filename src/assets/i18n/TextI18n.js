import { useContext } from "react";
import i18n from "./i18n";
import GlobalVarsContext from "../../contexts/_globalVarsContext";
import i18n_actionName from "./i18n_actionName";

function TextI18n({ elem, langOverride, fallbackTxt, isActionName }) {
  const { globalVars, _ } = useContext(GlobalVarsContext);
  const lang = langOverride == null
    ? globalVars.lang
    : langOverride;

  // if lang is not set
  if (lang == null) return <>{fallbackTxt ?? elem}</>;

  // set dictionary
  let dictionary = isActionName ? i18n_actionName : i18n;
  // if lang does not exist
  if (dictionary[lang] == null) return <>{fallbackTxt ?? elem}</>;

  let result = dictionary[lang][elem];
  // if target text is not found
  if (result == null)
    result = dictionary.en_US[elem] ?? (fallbackTxt ?? elem);

  // if target is a string
  if (typeof result === "string" || result instanceof String)
    return <>{result}</>;

  // target is an element
  return result;
}

export default TextI18n;