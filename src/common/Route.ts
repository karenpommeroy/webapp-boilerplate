import React from "react";

export type Route = {
    path: string;
    title: string;
    icon: React.FC<{}>;
    component: React.FC<{}>;
    hidden?: boolean;
};
