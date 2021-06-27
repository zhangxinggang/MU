const { merge, mergeWithRules } = require("webpack-merge");
const portfinder = require("portfinder");
const path = require("path");
const muConfig = require("../config");
const regAddI = (arr) => {
    arr = arr || [];
    arr.forEach((item) => {
        item["test"] = new RegExp(item["test"], "i");
    });
};
const beforeGenerateConf = () => {
    !global.MUGlobal.dev && (global.MUGlobal.dev = {});
    const portfinderFun = (initPort) => {
        return new Promise((resolve) => {
            portfinder.getPort(
                {
                    port: initPort,
                },
                (err, port) => {
                    if (err) {
                        return portfinderFun(initPort + 1);
                    } else {
                        !global.MUGlobal.dev.analyzer && (global.MUGlobal.dev.analyzer = []);
                        global.MUGlobal.dev.analyzer.push({
                            port: port,
                            haveUse: false,
                        });
                        resolve();
                    }
                }
            );
        });
    };
    return new Promise((resolve) => {
        portfinderFun(8888).then(resolve);
    });
};
module.exports = (pcf, arg) => {
    return new Promise((resolve) => {
        arg && arg.mode && (process.env.NODE_ENV = arg.mode);
        !process.env.NODE_ENV && (process.env.NODE_ENV = "production");
        pcf = pcf || {};
        !pcf.services && (pcf.services = {});
        !pcf.services.viewServer && (pcf.services.viewServer = {});
        const vsType = Object.prototype.toString.call(pcf.services.viewServer);
        const configClone = { ...muConfig };
        let config = { ...configClone };
        if (vsType === "[object Object]") {
            pcf.services.viewServer.entry && delete configClone.services.viewServer.entry;
            config = merge(configClone, pcf);
            config.services.viewServer = [config.services.viewServer];
        }
        config.isProduction = process.env.NODE_ENV === "production";
        global.MUGlobal = config;
        let generateConf = (viewServer) => {
            !viewServer.module && (viewServer.module = {});
            !viewServer.module.rules && (viewServer.module.rules = []);
            let defaultModule = require("./webpack/module.conf");
            regAddI(defaultModule.rules);
            regAddI(viewServer.module.rules);
            let { rules } = mergeWithRules({
                rules: {
                    test: "match",
                    exclude: "replace",
                    use: "replace",
                },
            })(defaultModule, viewServer.module);
            delete defaultModule.rules;
            delete viewServer.module.rules;
            let output = require("./webpack/output.conf");
            let plugins = require("./webpack/plugins.conf");
            let conf = merge(
                {
                    context: path.resolve(__dirname, "../"),
                    mode: process.env.NODE_ENV,
                    devtool: config.isProduction ? false : "eval-source-map",
                    module: defaultModule,
                    devServer: require("./webpack/devServer.conf"),
                    resolve: require("./webpack/resolve.conf"),
                    plugins: plugins(viewServer),
                    optimization: require("./webpack/optimization.conf"),
                    performance: {
                        maxAssetSize: 10000000,
                        maxEntrypointSize: 1024 * 800,
                        hints: "warning",
                    },
                },
                {
                    ...viewServer,
                    module: { rules },
                    output: output(viewServer),
                }
            );
            return conf;
        };
        beforeGenerateConf().then(() => {
            const webpackConf = config.services.viewServer.map((item) => {
                return generateConf(item);
            });
            resolve(webpackConf);
        });
    });
};
