import classNames from "classnames";
import {map} from "lodash-es";
import React, {HTMLAttributes} from "react";

import SystemModeIcon from "@mui/icons-material/ComputerRounded";
import DarkModeIcon from "@mui/icons-material/DarkModeRounded";
import LightModeIcon from "@mui/icons-material/LightModeRounded";
import {Button, Menu, MenuItem, Stack, Typography} from "@mui/material";
import {useColorScheme} from "@mui/material/styles";

import {useAppContext} from "../../react/contexts/AppContext";
import {useSettings} from "../../react/contexts/SettingsContext";
import {getThemeSample} from "../../themes/Theme";
import Styles from "./ThemeSelector.styl";

export type IThemeSelectorProps = HTMLAttributes<HTMLDivElement>;

export type ThemeMode = "dark" | "light" | "system";

export const ThemeSelector = (props: IThemeSelectorProps) => {
    const {className, ...rest} = props;
    const {mode, setMode} = useColorScheme();
    const {state, actions} = useAppContext();
    const {config} = useSettings();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const colorThemes = map(config.themes, (name) => ({
        name,
        sample: getThemeSample(name, mode),
    }));

    const onColorThemeChange = (event: React.MouseEvent<HTMLElement>) => {
        // const nextTheme = event.target.value as string;
        // actions.setTheme(nextTheme);
    };

    return (
        <div className={classNames(Styles.themeSelector, className)} {...rest}>
            <Button onClick={handleClick}>
                <MenuItem key={state.theme} value={state.theme} className={Styles.menuItem}>
                    <Stack direction="row" spacing={2} className={Styles.menuItemWrapper}>
                        <Stack direction="row" className={Styles.themeSample}>
                            {/* {map(item.sample, (color, idx) => (
                                <div key={idx} className={Styles.color} style={{backgroundColor: color}} />
                            ))} */}
                        </Stack>
                        <Typography variant="subtitle1" className={Styles.themeName}>
                            {state.theme}
                        </Typography>
                    </Stack>
                </MenuItem>
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                disablePortal
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}>
                {map(colorThemes, (item) => (
                    <MenuItem key={item.name} value={item.name} className={Styles.menuItem}>
                        <Stack direction="row" spacing={2} className={Styles.menuItemWrapper}>
                            <Stack direction="row" className={Styles.themeSample}>
                                {map(item.sample, (color, idx) => (
                                    <div key={idx} className={Styles.color} style={{backgroundColor: color}} />
                                ))}
                            </Stack>
                            <Typography variant="subtitle1" className={Styles.themeName}>
                                {item.name}
                            </Typography>
                        </Stack>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default ThemeSelector;
