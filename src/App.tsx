import classNames from "classnames";
import _isArray from "lodash/isArray";
import _map from "lodash/map";
import _split from "lodash/split";
import React from "react";
import { Outlet } from "react-router-dom";

import { Box, CssBaseline, Paper, Popper, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";

import Styles from "./App.styl";
import { getNavigation } from "./Navigation";
import { useAppContext } from "./react/contexts/AppContext";
import useHelp from "./react/hooks/useHelp";
import { getThemeDefinition } from "./theme/Theme";

export const App: React.FC = () => {
    const { state } = useAppContext();
    const { anchorEl, help } = useHelp();
    const renderLineBreaks = (value: string) => {
        return _map(_split(value, "\n"), (v, k) => (
            <React.Fragment key={k}>
                {v}
                <br />
            </React.Fragment>
        ));
    };

    const renderText = (value: string | string[]) => {
        const valueArray = _isArray(value) ? value : [value];

        return _map(valueArray, (v, k) => <p key={k}>{renderLineBreaks(v)}</p>);
    };

    const theme = createTheme({
        cssVariables: {
            colorSchemeSelector: "data-theme-mode",
            cssVarPrefix: "theme",
            rootSelector: ":root",
        },
        ...getThemeDefinition("Sky"),
    });

    return (
        <ReactRouterAppProvider navigation={getNavigation()} theme={theme} window={window}>
            <Box className={classNames(Styles.app, { [Styles.help]: state.help })}>
                <CssBaseline enableColorScheme />
                <Outlet />
            </Box>
            <Popper className={Styles.helpPopup} open={Boolean(anchorEl)} anchorEl={anchorEl} disablePortal>
                <Paper sx={{ p: 2 }}>
                    <Typography className={Styles.header} color="textSecondary">
                        {help.header}
                    </Typography>
                    <Typography component="div" className={Styles.content}>
                        {renderText(help.content)}
                    </Typography>
                </Paper>
            </Popper>
        </ReactRouterAppProvider>
    );
};

export default App;
