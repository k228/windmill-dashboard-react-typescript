import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LangugageDetector from "i18next-browser-languagedetector";
i18n.use(Backend).use(LangugageDetector).use(initReactI18next).init({
  fallbackLng: "en",
  whitelist: ["en", "fa"],
  debug: true,
});
