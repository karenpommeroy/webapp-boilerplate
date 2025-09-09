import path from "path";

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
