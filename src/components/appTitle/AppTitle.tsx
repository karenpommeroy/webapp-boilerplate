import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import useClickCounter from "../../react/hooks/useClickCounter";
import Logo from "../logo/Logo";
import Styles from "./AppTitle.styl";

const AppTitle = () => {
    const { onClick } = useClickCounter(() => handleOpenDevelopment(), 3, 500);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleOpenDevelopment = () => {
        navigate("/development");
    };

    return (
        <Stack direction="row" alignItems="center" className={Styles.appTitle}>
            <Logo onClick={onClick} className={Styles.logo} />
            <Typography className={classNames(Styles.title, "uppercase")} variant="h6" noWrap>
                {t("appName")}
            </Typography>
        </Stack>
    );
};

export default AppTitle;
