import CircularDependencyPlugin from "circular-dependency-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import fs from "fs-extra";
import HtmlWebpackPlugin from "html-webpack-plugin";
import I18nextWebpackPlugin from "i18next-scanner-webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {Configuration, DefinePlugin, ProgressPlugin} from "webpack";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import {Configuration as DevServerConfiguration} from "webpack-dev-server";

import {getRoot, isDevelopment, reportProgress} from "./webpack.utils";

export const webpackConfig: Configuration & DevServerConfiguration = {
    entry: getRoot("src", "index.tsx"),
    output: {
        filename: (pathData) => {
            return pathData.chunk?.name === "vendors" ? "vendors.js" : "bundle.js";
        },
        publicPath: "/",
        path: getRoot("dist"),
        clean: true,
    },
    mode: isDevelopment() ? "development" : "production",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".styl", ".css"],
        fallback: {
            path: require.resolve("path-browserify"),
            process: require.resolve("process/browser"),
        },
    },
    module: {
        rules: [
            {
                test: /\.mjs$/,
                include: [/node_modules/, /\.yarn/],
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
                exclude: [
                    /\.(test|spec|)\.ts$/,
                    /node_modules$/,
                    /[\\/]node_modules[\\/]$/,
                    /\.yarn$/,
                    /[\\/]\.yarn[\\/]$/,
                ],
            },
            {
                test: /\.js$/,
                enforce: "pre",
                loader: "source-map-loader",
                exclude: /react-zoom-pan-pinch/,
            },
            {
                test: /\.json$/,
                loader: "json-loader",
                exclude: [getRoot(__dirname, "config"), /[\\/]((node_modules)|(\.yarn))[\\/]/],
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
                        options: {sourceMap: true},
                    },
                ],
            },
            {
                test: /url\("([^)]+?\.(woff|eot|woff2|ttf|svg)[^"]*)"/,
                exclude: [],
                type: "asset/resource",
                dependency: {not: ["url"]},
            },
            {
                test: /[^)]+?\.(woff|eot|woff2|ttf|svg)[^"]*/,
                exclude: [],
                type: "asset/resource",
                dependency: {not: ["url"]},
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
    optimization: {
        removeAvailableModules: true,
        removeEmptyChunks: true,
        concatenateModules: true,
        mergeDuplicateChunks: true,
        minimize: !isDevelopment(),
        splitChunks: {
            chunks: "async",
            cacheGroups: {
                vendors: {
                    test: /[\\/]((node_modules)|(\.yarn[\\/]cache))[\\/]/,
                    name: "vendors",
                    chunks: "all",
                    enforce: true,
                },
            },
        },
    },
    stats: {
        errorDetails: true,
    },
    devtool: "eval",
    watchOptions: {
        aggregateTimeout: 2000,
        ignored: ["**/assets/locales/**/*"],
    },
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
                    ".yarn/**/*",
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
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
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
                {
                    from: getRoot("src/config/", `config.${process.env.NODE_ENV}.json`),
                    to: "config.json",
                    force: true,
                    noErrorOnMissing: false,
                },
            ],
        }),
        new CircularDependencyPlugin({
            exclude: /node_modules|\.yarn/,
            failOnError: true,
            allowAsyncCycles: false,
            cwd: process.cwd(),
        }),
        new HtmlWebpackPlugin({
            title: "webapp",
            template: getRoot("public", "index.html"),
        }),
        new BundleAnalyzerPlugin({
            analyzerHost: "localhost",
            analyzerPort: 8888,
            openAnalyzer: false,
            reportTitle: "Web Application Boilerplate Bundle Analysis",
        }),
        new MiniCssExtractPlugin({
            filename: "bundle.css",
        }),
        new I18nextWebpackPlugin({
            extensions: [".ts", ".tsx"],
            dest: getRoot("./"),
            src: [getRoot("./src")],
            options: {
                locales: ["en-GB", "de-DE", "pl-PL"],
                sort: true,
                verbose: true,
                failOnWarnings: false,
                pluralSeparator: "_",
                output: getRoot("./assets/locales/$LOCALE/translation.json"),
                indentation: 2,
                i18nextOptions: {
                    debug: isDevelopment(),
                },
            },
        }),
    ],
};

export default webpackConfig;
