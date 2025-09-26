import classNames from "classnames";
import React from "react";

import HelpIcon from "@mui/icons-material/Help";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {Stack} from "@mui/material";
import IconButton from "@mui/material/IconButton";

import ComponentDisplayMode from "../../common/ComponentDisplayMode";
import {useAppContext} from "../../react/contexts/AppContext";
import LanguagePicker from "../languagePicker/LanguagePicker";
import ThemeSelector from "../themeSelector/ThemeSelector";
import ThemeSwitcher from "../themeSwitcher/ThemeSwitcher";
import Styles from "./AppActions.styl";

const AppActions = () => {
    const {state, actions} = useAppContext();

    const onHelpClick = () => {
        actions.setHelp(!state.help);
    };

    return (
        <Stack direction="row" alignItems="center" className={Styles.appActions} gap={1} data-testid="app-actions">
            <IconButton
                color="primary"
                data-help="help-toggle"
                data-testid="help-toggle"
                className={classNames(Styles.icon, Styles.help, {[Styles.active]: state.help})}
                onClick={onHelpClick}>
                {state.help ? <HelpIcon /> : <HelpOutlineIcon />}
            </IconButton>
            <ThemeSwitcher data-help="themeSwitcher" data-testid="theme-switcher" />
            <LanguagePicker
                data-help="languagePicker"
                data-testid="language-picker"
                className={Styles.languagePicker}
                showArrow={false}
                mode={ComponentDisplayMode.Minimal}
            />
        </Stack>
    );
};

export default AppActions;
