import React from "react";
import { useTranslation } from "react-i18next";
import {ChangeLanguage} from "../../utils/ChangeLanguage";

const Language = () => {
  const { i18n } = useTranslation();
  const changeLanguageHandler = (lang: string) => {
    i18n.changeLanguage(lang, () => {
      ChangeLanguage(lang)
    });
  };
  return (
    <button
      type="button"
      className="rounded-md focus:outline-none focus:shadow-outline-purple font-bold text-purple-600"
      aria-label="Toggle color mode"
    >
      {i18n.language === "fa" ? (
        <span onClick={() => changeLanguageHandler("en")}>EN</span>
      ) : (
        <span onClick={() => changeLanguageHandler("fa")}>FA</span>
      )}
    </button>
  );
};

export default Language;
