import classNames from "classnames";
import React from "react";

import HelpIcon from "@mui/icons-material/Help";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import ComponentDisplayMode from "../../common/ComponentDisplayMode";
import { useAppContext } from "../../react/contexts/AppContext";
import LanguagePicker from "../languagePicker/LanguagePicker";
import ThemeSwitcher from "../themeSwitcher/ThemeSwitcher";
import Styles from "./AppActions.styl";

const AppActions = () => {
    const { state, actions } = useAppContext();

    const onHelpClick = () => {
        actions.setHelp(!state.help);
    };

    return (
        <Stack direction="row" alignItems="center" className={Styles.appActions} gap={1}>
            <IconButton
                color="inherit"
                data-help="help-toggle"
                className={classNames(Styles.icon, Styles.help, { [Styles.active]: state.help })}
                onClick={onHelpClick}
            >
                {state.help ? <HelpIcon /> : <HelpOutlineIcon />}
            </IconButton>
            <ThemeSwitcher data-help="themeSwitcher" />
            <LanguagePicker
                data-help="languagePicker"
                className={Styles.languagePicker}
                showArrow={false}
                mode={ComponentDisplayMode.Minimal}
            />
        </Stack>
    );
};

export default AppActions;
