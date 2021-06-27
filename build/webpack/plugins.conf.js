const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const isProduction = global.MUGlobal.isProduction;
let project = global.MUGlobal.project || {};

function htmlTemplate(entry) {
    let htmlArr = [];
    let entrys = Object.keys(entry);
    entrys.forEach(async (item) => {
        let entryItem = entry[item];
        let entryType = Object.prototype.toString.call(entryItem);
        let template = "";
        let chunks = [item, "chunk-vendors", "chunk-common"];
        if (entryItem.dependOn) {
            let dependOnType = typeof entryItem.dependOn;
            if (dependOnType === "object") {
                chunks = chunks.concat(entryItem.dependOn);
            } else {
                chunks.unshift(entryItem.dependOn);
            }
        }
        let filename = `${item}.html`;
        if (entryType === "[object Array]") {
            template = path.resolve(entryItem[0], "../index.html");
        } else if (entryType === "[object Object]") {
            let entryHtml = entryItem["import"];
            let entryItemImportType = Object.prototype.toString.call(entryHtml);
            if (entryItemImportType === "[object Array]") {
                entryHtml = entryHtml[0];
            }
            template = entryItem.template || path.resolve(entryHtml, "../index.html");
            chunks = entryItem.chunks || chunks;
        } else {
            template = path.resolve(entryItem, "../index.html");
        }
        let htmlPluginParams = null;
        try {
            fs.accessSync(template);
            htmlPluginParams = { chunks, filename, template };
        } catch (err) {
            template = path.resolve(process.cwd(), "public/index.html");
            try {
                fs.accessSync(template);
                htmlPluginParams = { chunks, filename, template };
            } catch (err) {}
        }
        htmlPluginParams && htmlArr.push(new HtmlWebpackPlugin(htmlPluginParams));
    });
    return htmlArr;
}
function dealEntry(viewServer) {
    let { entry } = viewServer;
    let dproject = {};
    for (let key in project) {
        let value = project[key];
        let isObject = Object.prototype.toString.call(value) == "[object Object]" || Object.prototype.toString.call(value) == "[object Array]";
        value = isObject ? JSON.stringify(value) : value;
        dproject["PROJECT." + key] = `'${value}'`;
    }
    let plugins = [new webpack.DefinePlugin(dproject), new webpack.ProgressPlugin()];
    if (!isProduction) {
        let { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
        let analyzer = global.MUGlobal.dev.analyzer.find((item) => !item.haveUse);
        analyzer.haveUse = true;
        plugins.push(
            new BundleAnalyzerPlugin({
                openAnalyzer: false,
                analyzerPort: analyzer.port,
            })
        );
    }
    const entryPlugins = htmlTemplate(entry);
    if (entryPlugins.length) {
        plugins = plugins.concat([
            ...entryPlugins,
            new MiniCssExtractPlugin({
                filename: isProduction ? "[name].[contenthash:8].css" : "[name].css",
                chunkFilename: isProduction ? "public/css/[id].[hash].css" : "public/css/[id].css",
            }),
            new VueLoaderPlugin(),
        ]);
    }
    return plugins;
}
module.exports = dealEntry;
