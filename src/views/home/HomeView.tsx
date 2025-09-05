import React from "react";
import { useTranslation } from "react-i18next";

import { Box } from "@mui/material";

import Styles from "./HomeView.styl";

interface TableCell {
    row: number;
    col: number;
    rowspan?: number;
    colspan?: number;
    value: string;
}

export const HomeView: React.FC = () => {
    const { t } = useTranslation();

    return <Box className={Styles.home}></Box>;
};

export default HomeView;
