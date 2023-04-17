import i18n from "./i18n";

function i18nGetText(lang, element) {
  let result = i18n[lang][element];
  if (result == null) return i18n.en_US[element];
  return result;
}

export default i18nGetText;