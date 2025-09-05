import CircularDependencyPlugin from "circular-dependency-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import fs from "fs-extra";
import HtmlWebpackPlugin from "html-webpack-plugin";
import $_ from "lodash";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import { Configuration, DefinePlugin, ProgressPlugin } from "webpack";
import { Configuration as DevServerConfiguration } from "webpack-dev-server";

// const I18nextWebpackPlugin = require("i18next-scanner-webpack");

export const isDevelopment = () => {
    return $_.get(process, "env.NODE_ENV") === "development";
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
    const rootDir = path.resolve(__dirname);

    args = Array.prototype.slice.call(args, 0);

    return path.join.apply(path, [rootDir].concat(args));
};

export const webpackConfig: Configuration & DevServerConfiguration = {
    entry: getRoot("src", "index.tsx"),
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".styl", ".css"],
        fallback: {
            fs: false,
            constants: false,
            stream: false,
            assert: false,
            util: false,
            buffer: false,
            path: require.resolve("path-browserify"),
            process: require.resolve("process/browser"),
        },
    },
    module: {
        rules: [
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto",
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: isDevelopment(),
                        },
                    },
                ],
                exclude: [/\.(test|spec|)\.ts$/, /node_modules$/, /[\\/]node_modules[\\/]$/, /\.yarn$/],
            },
            {
                test: /\.js$/,
                enforce: "pre",
                loader: "source-map-loader",
                exclude: [],
            },
            {
                test: /\.json$/,
                loader: "json-loader",
                exclude: [getRoot(__dirname, "config"), /node_modules/],
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                            defaultExport: true,
                        },
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[name]__[local]___[hash:base64:5]",
                                mode: "global",
                                exportLocalsConvention: "camelCase",
                                namedExport: true,
                            },
                            esModule: true,
                        },
                    },
                ],
            },
            {
                test: /\.styl$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                            defaultExport: true,
                        },
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[name]__[local]___[hash:base64:5]",
                                exportLocalsConvention: "camelCase",
                                namedExport: true,
                            },
                            esModule: true,
                            importLoaders: 1,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "stylus-loader",
                        options: { sourceMap: true },
                    },
                ],
            },
            {
                test: /url\("([^)]+?\.(woff|eot|woff2|ttf|svg)[^"]*)"/,
                exclude: [],
                type: "asset/resource",
                dependency: { not: ["url"] },
            },
            {
                test: /[^)]+?\.(woff|eot|woff2|ttf|svg)[^"]*/,
                exclude: [],
                type: "asset/resource",
                dependency: { not: ["url"] },
            },
            {
                test: /[^)]+?\.(svg|png|jpg|gif)[^"]*/,
                exclude: [/fonts/],
                type: "asset/resource",
            },
            {
                test: /[^)]+?\.(svg|png|jpg|gif)[^"]*/,
                exclude: [/images/],
                type: "asset/resource",
            },
        ],
    },
    mode: "development",
    output: {
        path: getRoot("dist"),
        pathinfo: false,
        filename: "bundle.js",
        clean: true,
        publicPath: "/",
    },
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        minimize: false,
        splitChunks: {
            chunks: "async",
            maxSize: 20000,
            minSize: 0,
            minChunks: 1,
            maxAsyncRequests: 6,
            maxInitialRequests: 4,
            automaticNameDelimiter: "~",
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    stats: {
        errorDetails: true,
    },
    devtool: "eval",
    devServer: {
        host: "localhost",
        client: {
            overlay: true,
        },
        static: {
            directory: getRoot("public"),
            publicPath: "/",
            watch: {
                aggregateTimeout: 500,
                ignored: [
                    /node_modules\/(?!@core)/,
                    "node_modules/@core/**/node_modules/**/*",
                    /assets\/locales\/__.*\.json/,
                ],
            },
        },

        historyApiFallback: true,
        compress: true,
        server: {
            type: "https",
            options: {
                key: fs.readFileSync("./public/localhost.key"),
                cert: fs.readFileSync("./public/localhost.crt"),
            },
        },
        hot: true,
        open: true,
        port: process.env.PORT,
    },
    plugins: [
        new DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development"),
            },
            "process.platform": JSON.stringify(process.platform),
        }),
        new ProgressPlugin(reportProgress),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: getRoot("assets"),
                    to: "assets",
                    force: true,
                },
            ],
        }),
        new CircularDependencyPlugin({
            exclude: /a\.js|node_modules/,
            failOnError: true,
            allowAsyncCycles: false,
            cwd: process.cwd(),
        }),
        new HtmlWebpackPlugin({
            title: "webapp",
            template: getRoot("public", "index.html"),
        }),
        new MiniCssExtractPlugin({ filename: "bundle.css" }),
        // new I18nextWebpackPlugin({
        //     extensions: [".ts", ".tsx"],
        //     dest: path.resolve("./"),
        //     src: [path.resolve("./src")],
        //     options: {
        //         locales: ["en", "de", "pl"],
        //         sort: true,
        //         verbose: false,
        //         failOnWarnings: false,
        //         pluralSeparator: "_",
        //         output: path.resolve("./assets/locales/$LOCALE/translation.json"),
        //         indentation: 4,
        //         i18nextOptions: {
        //             debug: false
        //         }
        //     }
        // })
    ],
};

export default { ...webpackConfig };
