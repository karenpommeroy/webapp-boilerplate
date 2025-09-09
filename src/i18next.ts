import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import i18nextBackend from "i18next-http-backend";
import {initReactI18next} from "react-i18next";

const isMac = process.platform === "darwin";
// const prependPath = isMac && !isDevelopment() ? path.join("./assets", "..") : ".";
// const localePath = replace(
//     !isDevelopment() ? path.join("./assets", "locales") : path.join(__dirname, "assets", "locales"),
//     /\\/g,
//     "/"
// );

i18next
    .use(LanguageDetector)
    .use(i18nextBackend)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: "../" + "./assets/locales/{{lng}}/{{ns}}.json",
        },
        detection: {
            order: ["querystring", "cookie", "localStorage", "navigator"],
            caches: ["localStorage"],
        },
        preload: ["en-GB", "de-DE", "pl-PL"],
        debug: false,
        saveMissing: false,
        saveMissingTo: "all",
        load: "currentOnly",
        returnEmptyString: false,
        fallbackLng: false,
        defaultNS: "translation",
        ns: ["translation", "help"],
        interpolation: {
            escapeValue: false,
        },
        supportedLngs: ["en-GB", "de-DE", "pl-PL"],
    });

export default i18next;
