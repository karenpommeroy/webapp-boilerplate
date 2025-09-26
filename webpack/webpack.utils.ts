import path from "path";

import {ThemeOptions} from "@mui/material/styles";

export const isDevelopment = () => {
    return process.env.NODE_ENV === "development";
};

export const reportProgress = (percentage: number, message: string, ...args: any[]) => {
    const stream = process.stderr;
    const formatted = (percentage * 100).toFixed();

    if (stream.isTTY && percentage < 1) {
        stream.cursorTo(0);
        stream.write(`${formatted}%: ${message}`);
        stream.clearLine(1);
    } else if (percentage === 1) {
        stream.write("building done!");
    }
};

export const getRoot = (...args: any[]) => {
    const rootDir = path.resolve(__dirname, "..");

    args = Array.prototype.slice.call(args, 0);

    return path.join.apply(path, [rootDir].concat(args));
};
export const themeOptions: ThemeOptions = {
    palette: {
        mode: "dark",
        primary: {
            main: "hsl(227, 19%, 46%)",
            light: "hsl(227, 20%, 65%)",
            dark: "hsl(227, 22%, 30%)",
        },
        secondary: {
            main: "hsl(14, 60%, 55%)",
            light: "hsl(14, 60%, 65%)",
            dark: "hsl(14, 60%, 40%)",
        },
        background: {
            default: "hsl(230, 25%, 10%)",
            paper: "hsl(230, 20%, 14%)",
        },
        text: {
            primary: "hsl(0, 0%, 95%)",
            secondary: "hsl(0, 0%, 70%)",
            disabled: "hsl(0, 0%, 50%)",
        },
        error: {
            main: "hsl(0, 75%, 55%)",
        },
        warning: {
            main: "hsl(35, 85%, 60%)",
        },
        info: {
            main: "hsl(210, 80%, 65%)",
        },
        success: {
            main: "hsl(150, 55%, 50%)",
        },
        divider: "hsl(0, 0%, 25%)",
    },
    typography: {
        fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        fontSize: 14,
        h1: {fontWeight: 600},
        h2: {fontWeight: 600},
        h3: {fontWeight: 600},
        h4: {fontWeight: 500},
        h5: {fontWeight: 500},
        h6: {fontWeight: 500},
    },
    shape: {
        borderRadius: 10,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderRadius: "8px",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                },
            },
        },
    },
};
