import classNames from "classnames";
import React from "react";
import { Outlet } from "react-router-dom";

import { NavigationPageItem } from "@toolpad/core";
import { DashboardLayout, DashboardSidebarPageItem } from "@toolpad/core/DashboardLayout";

import AppActions from "../appActions/AppActions";
import AppTitle from "../appTitle/AppTitle";
import Styles from "./Dashboard.styl";

export const Dashboard = () => {
    const renderPageItem = React.useCallback((item: NavigationPageItem, props: { mini: boolean }) => {
        return (
            <div className="uppercase">
                <DashboardSidebarPageItem item={item} />
            </div>
        );
    }, []);

    return (
        <div className={classNames(Styles.dashboard)}>
            <DashboardLayout
                renderPageItem={renderPageItem}
                defaultSidebarCollapsed={true}
                slots={{
                    appTitle: AppTitle,
                    toolbarActions: AppActions,

                    sidebarFooter: null,
                }}
            >
                <Outlet />
            </DashboardLayout>
        </div>
    );
};

export default Dashboard;
