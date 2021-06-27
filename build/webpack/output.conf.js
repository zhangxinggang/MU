const isProduction = global.MUGlobal.isProduction;
const { httpServer } = global.MUGlobal.services;
const { normalize, join } = require("upath");

module.exports = function (viewServer) {
    const { output } = viewServer;
    let outputObj = {
        path: join(process.cwd(), "dist"),
        filename: "[name].[chunkhash].js",
        chunkFilename: "[name].[contenthash].js",
        publicPath: isProduction ? "./" : "/",
        clean: true,
    };
    if (typeof output == "object") {
        Object.assign(outputObj, output);
    } else if (typeof output == "string") {
        outputObj.path = output;
    }
    if (httpServer && httpServer.routes && httpServer.routes.staticDirs) {
        let staticDirs = httpServer.routes.staticDirs;
        staticDirs.map((item) => {
            if (normalize(item.rootDir) == normalize(outputObj.path)) {
                outputObj.publicPath = item.rootPath || "/";
            }
        });
    }
    return outputObj;
};
