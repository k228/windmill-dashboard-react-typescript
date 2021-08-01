import axios from "../axios/vendors/auth.axios";

export const ChangeLanguage=(lang)=>{
    const body = document.querySelector("body") as HTMLBodyElement;
    axios.defaults.headers.common["accept-language"]=lang;
    body.dir = lang === "fa" ? "rtl" : "ltr";
};