import {createTheme, PaletteMode, ThemeOptions} from "@mui/material";

import oceanWavesJson from "./definitions/OceanWaves.json";
import pastelMidnightJson from "./definitions/PastelMidnight.json";
import pinkFloydJson from "./definitions/PinkFloyd.json";
import sunsetSkyJson from "./definitions/SunsetSky.json";

console.log(pastelMidnightJson.colorSchemes.dark.palette.primary.main);

export const themeDefinitions: Record<any, ThemeOptions> = {
    PastelMidnight: pastelMidnightJson as ThemeOptions,
    SunsetSky: sunsetSkyJson as ThemeOptions,
    OceanWaves: oceanWavesJson as ThemeOptions,
    PinkFloyd: pinkFloydJson as ThemeOptions,
};

export const getThemeSample = (name: string, mode: string) => {
    if (!mode) return;

    const themeDef: any = themeDefinitions[name];

    themeDef.defaultColorScheme = mode as PaletteMode;
    const theme = createTheme(themeDef);

    return [
        theme.palette.background.default,
        theme.palette.background.paper,
        theme.palette.primary.light,
        theme.palette.primary.main,
        theme.palette.primary.dark,
        theme.palette.secondary.light,
        theme.palette.secondary.main,
        theme.palette.secondary.dark,
    ];
};
