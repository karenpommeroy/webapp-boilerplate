import _map from "lodash/map";
import _reject from "lodash/reject";
import React from "react";
import { RouteObject } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import { Navigation, NavigationItem } from "@toolpad/core";

import { Route } from "./common/Route";
import HomeView from "./views/home/HomeView";

export const Routes: Route[] = [
    {
        path: "/",
        title: "home",
        icon: HomeIcon,
        component: HomeView,
    },
];

export const getNavigation = (): Navigation => {
    return _map(
        _reject(Routes, "hidden"),
        (route) =>
            ({
                segment: route.path,
                title: route.title,
                icon: <route.icon />,
            }) as NavigationItem
    );
};

export const getRoutes = (): RouteObject[] => {
    return _map(
        Routes,
        (route): RouteObject => ({
            path: route.path,
            Component: route.component,
        })
    );
};
