import classNames from "classnames";
import {isArray, map, split, without} from "lodash-es";
import React from "react";
import {useTranslation} from "react-i18next";
import {Outlet} from "react-router-dom";

import {Box, CssBaseline, Paper, Popper, Typography} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {ReactRouterAppProvider} from "@toolpad/core/react-router";

import Styles from "./App.styl";
import {getNavigation} from "./Navigation";
import {useAppContext} from "./react/contexts/AppContext";
import useHelp from "./react/hooks/useHelp";
import {getThemeDefinition} from "./theme/Theme";

export const App: React.FC = () => {
    const {state} = useAppContext();
    const {anchorEl, help} = useHelp();
    const {i18n} = useTranslation();
    const renderLineBreaks = (value: string) => {
        return map(split(value, "\n"), (v, k) => (
            <React.Fragment key={k}>
                {v}
                <br />
            </React.Fragment>
        ));
    };

    const renderText = (value: string | string[]) => {
        const valueArray = isArray(value) ? value : [value];

        return map(valueArray, (v, k) => <p key={k}>{renderLineBreaks(v)}</p>);
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
            <Box className={classNames(Styles.app, {[Styles.help]: state.help})} lang={i18n.language} data-testid="app">
                <CssBaseline enableColorScheme />
                <Outlet />
            </Box>
            <Popper
                className={Styles.helpPopup}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                disablePortal
                data-testid="help-tooltip">
                <Paper sx={{p: 2}}>
                    <Typography className={Styles.header} color="textSecondary" data-testid="help-header">
                        {help.header}
                    </Typography>
                    <Typography component="div" className={Styles.content} data-testid="help-content">
                        {renderText(help.content)}
                    </Typography>
                </Paper>
            </Popper>
            <div
                id="test-props"
                style={{display: "none"}}
                data-languages={JSON.stringify(without(i18n.options.supportedLngs as string[], "cimode"))}
            />
        </ReactRouterAppProvider>
    );
};

export default App;
