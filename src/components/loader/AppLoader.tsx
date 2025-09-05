import React from "react";

import { Backdrop } from "@mui/material";

export interface AppLoaderProps {
    width?: number;
    height?: number;
    imageSrc?: string;
}

export const AppLoader = (props: AppLoaderProps = { width: 180, height: 180, imageSrc: "/assets/img/loading.svg" }) => {
    const { width, height, imageSrc } = props;

    return (
        <Backdrop invisible={true} open={true}>
            <img
                src={imageSrc}
                width={width}
                height={height}
                style={{
                    verticalAlign: "middle",
                    display: "inline-block",
                }}
            />
        </Backdrop>
    );
};

export default AppLoader;
