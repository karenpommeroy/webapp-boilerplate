import React from "react";
import {useTranslation} from "react-i18next";

import {Box} from "@mui/material";

import {useSettings} from "../../react/contexts/SettingsContext";
import Styles from "./DevelopmentView.styl";

export const DevelopmentView: React.FC = () => {
    const {t} = useTranslation();
    const {config} = useSettings();

    return <Box className={Styles.development}></Box>;
};

export default DevelopmentView;
