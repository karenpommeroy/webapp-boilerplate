import React from "react";
import {useTranslation} from "react-i18next";

import {Box, Typography} from "@mui/material";

import Styles from "./SettingsView.styl";

export const SettingsView: React.FC = () => {
    const {t} = useTranslation();

    return (
        <Box className={Styles.settings}>
            <Typography className="capitalize" variant="h4">
                {t("settings")}
            </Typography>
        </Box>
    );
};

export default SettingsView;
