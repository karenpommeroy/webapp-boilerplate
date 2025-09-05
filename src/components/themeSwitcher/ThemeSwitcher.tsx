import classNames from "classnames";
import React, { HTMLAttributes } from "react";

import SystemModeIcon from "@mui/icons-material/ComputerRounded";
import DarkModeIcon from "@mui/icons-material/DarkModeRounded";
import LightModeIcon from "@mui/icons-material/LightModeRounded";
import { IconButton, IconButtonProps } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";

import Styles from "./ThemeSwitcher.styl";

export type IThemeSwitcherProps = Omit<HTMLAttributes<HTMLDivElement> & IconButtonProps, "onClick">;

export type ThemeMode = "dark" | "light" | "system";

export const ThemeSwitcher = (props: IThemeSwitcherProps) => {
    const { className, ...rest } = props;
    const { mode, setMode } = useColorScheme();

    const resolveIcon = (mode: ThemeMode) => {
        if (mode === "dark") {
            return <LightModeIcon className={Styles.icon} />;
        } else if (mode === "light") {
            return <DarkModeIcon className={Styles.icon} />;
        }

        return <SystemModeIcon className={Styles.icon} />;
    };

    const resolveNextMode = (mode: ThemeMode) => {
        if (mode === "dark") {
            return "light";
        } else if (mode === "light") {
            return "dark";
        }

        return "dark";
    };

    const onChangeMode = () => {
        setMode(resolveNextMode(mode));
    };

    return (
        <IconButton className={classNames(Styles.themeSwitcher, className)} onClick={onChangeMode} {...rest}>
            {resolveIcon(mode)}
        </IconButton>
    );
};

export default ThemeSwitcher;
