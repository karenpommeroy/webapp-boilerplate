import fs from "fs-extra";
import i18next from "i18next";
import i18nextBackend from "i18next-http-backend";
import _forEach from "lodash/forEach";
import _isUndefined from "lodash/isUndefined";
import _replace from "lodash/replace";
import _without from "lodash/without";
import path from "path";
import { initReactI18next } from "react-i18next";

const isMac = process.platform === "darwin";
const isDev = process.env.NODE_ENV === "development";
// const prependPath = isMac && !isDev ? path.join("./assets", "..") :  ".";
const localePath = _replace(
    !isDev ? path.join("./assets", "locales") : path.join(__dirname, "assets", "locales"),
    /\\/g,
    "/"
);

i18next
    .use(i18nextBackend)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: localePath + "/{{lng}}/{{ns}}.json",
            // addPath: prependPath + "./assets/locales/{{lng}}/{{ns}}.missing.json",
        },

        lng: "en-GB",
        preload: ["en-GB", "de-DE", "pl-PL"],
        debug: false,
        saveMissing: false, // process.env.NODE_ENV === "development",
        // missingKeyHandler: (lngs, ns, key) => {
        //     _forEach(_without(i18next.options.supportedLngs as string[], "cimode"), (lng) => {
        //         const targetPath = prependPath + `./assets/locales/${lng}/${ns}.json`;
        //         if (!fs.existsSync(targetPath)) {
        //             fs.writeJSONSync(targetPath, {}, {spaces: 4});
        //         }

        //         const data = fs.readJsonSync(targetPath);

        //         if (!_isUndefined(data[key])) return;

        //         data[key] = "";
        //         fs.writeJSONSync(targetPath, data, {spaces: 4});
        //     });
        // },
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
