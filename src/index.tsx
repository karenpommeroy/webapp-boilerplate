import moment from "moment";
import momentDurationFormat from "moment-duration-format";
import {createRoot} from "react-dom/client";
import {I18nextProvider} from "react-i18next";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import App from "./App";
import {getConfiguration, IConfiguration} from "./common/Config";
import Dashboard from "./components/dashboard/Dashboard";
import createLoader from "./components/loader/AppLoader";
import i18next from "./i18next";
import {getRoutes} from "./Navigation";
import {AppContextProvider} from "./react/contexts/AppContext";
import {SettingsProvider} from "./react/contexts/SettingsContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const renderApplication = async (config: IConfiguration) => {
    momentDurationFormat(moment as any);
    moment.updateLocale(i18next.language, {week: {dow: 1}});

    const router = createBrowserRouter([
        {
            Component: App,
            children: [{path: "/", Component: Dashboard, children: getRoutes()}],
        },
    ]);

    root.render(
        <SettingsProvider config={config}>
            <AppContextProvider>
                <I18nextProvider i18n={i18next}>
                    <RouterProvider router={router} />
                </I18nextProvider>
            </AppContextProvider>
        </SettingsProvider>
    );
};

export const run = async () => {
    root.render(createLoader());
    const config = await getConfiguration<IConfiguration>("/config.json");

    setTimeout(() => {
        renderApplication(config);
    }, 100);
};

run();
