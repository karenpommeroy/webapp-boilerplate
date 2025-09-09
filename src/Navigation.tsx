import {map, reject} from "lodash-es";
import {useTranslation} from "react-i18next";
import {RouteObject} from "react-router-dom";

import CodeIcon from "@mui/icons-material/Code";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import {Navigation, NavigationItem} from "@toolpad/core";

import {Route} from "./common/Route";
import DevelopmentView from "./views/development/DevelopmentView";
import HomeView from "./views/home/HomeView";
import SettingsView from "./views/settings/SettingsView";

/*
    t("home")
    t("settings")
*/

export const Routes: Route[] = [
    {
        path: "",
        title: "home",
        icon: HomeIcon,
        component: HomeView,
    },
    {
        path: "settings",
        title: "settings",
        icon: SettingsIcon,
        component: SettingsView,
    },
    {
        path: "development",
        title: "development",
        icon: CodeIcon,
        component: DevelopmentView,
        hidden: true,
    },
];

export const getNavigation = (): Navigation => {
    const {t} = useTranslation();

    return map(
        reject(Routes, "hidden"),
        (route) =>
            ({
                segment: route.path,
                title: t(route.title),
                icon: <route.icon />,
            }) as NavigationItem
    );
};

export const getRoutes = (): RouteObject[] => {
    return map(
        Routes,
        (route): RouteObject => ({
            path: route.path,
            Component: route.component,
        })
    );
};
