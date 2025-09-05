import moment from "moment";
import momentDurationFormat from "moment-duration-format";
import React from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { createHashRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Dashboard from "./components/dashboard/Dashboard";
import createLoader from "./components/loader/AppLoader";
import i18n from "./i18next";
import { getRoutes } from "./Navigation";
import { AppContextProvider } from "./react/contexts/AppContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const renderApplication = async (Component: React.FC) => {
    momentDurationFormat(moment as any);

    moment.updateLocale("en", { week: { dow: 1 } });

    i18n.changeLanguage("en");

    const router = createHashRouter([
        {
            Component: App,
            children: [{ path: "/", Component: Dashboard, children: getRoutes() }],
        },
    ]);

    root.render(
        <AppContextProvider>
            <I18nextProvider i18n={i18n}>
                <RouterProvider router={router}>
                    <Component />
                </RouterProvider>
            </I18nextProvider>
        </AppContextProvider>
    );
};

export const run = async () => {
    root.render(createLoader());
    // const config = await getConfiguration<IConfiguration>("/config.json");
    // const locales = (await i18nReady()) as any;

    // renderApplication(App, config, locales);

    if (module.hot) {
        // module.hot.accept("./App", () => {
        const NextApp = React.lazy(() => import("./App"));
        renderApplication(NextApp);
        // });
    }
};

run();
