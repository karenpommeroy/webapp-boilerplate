import {map} from "lodash-es";
import React, {ChangeEvent} from "react";
import {useTranslation} from "react-i18next";

import {Box, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography, useColorScheme} from "@mui/material";

import {useAppContext} from "../../react/contexts/AppContext";
import {useSettings} from "../../react/contexts/SettingsContext";
import {getThemeSample} from "../../themes/Theme";
import Styles from "./SettingsView.styl";

export const SettingsView: React.FC = () => {
    const {t} = useTranslation();
    const {config} = useSettings();
    const {state, actions} = useAppContext();
    const {mode, setMode} = useColorScheme();
    const colorThemes = map(config.themes, (name) => ({
        name,
        sample: getThemeSample(name, mode),
    }));

    const onColorThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const nextTheme = event.target.value as string;

        actions.setTheme(nextTheme);
    };

    return (
        <Box className={Styles.settings}>
            <Grid size={12} spacing={1} container>
                <Grid size="grow" data-help="themeSelect">
                    <FormControl fullWidth>
                        <InputLabel>{t("theme")}</InputLabel>
                        <Select
                            value={state.theme}
                            label={t("theme")}
                            onChange={onColorThemeChange}
                            className={Styles.select}
                            slotProps={{
                                input: {
                                    className: Styles.selectInput,
                                },
                            }}
                            MenuProps={{
                                disablePortal: true,
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
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SettingsView;
