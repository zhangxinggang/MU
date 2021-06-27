const path = require("path");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const generateConf = require("./build/webpack.config.js");
module.exports = (pcf, arg) => {
    let cmdArg = require("minimist")(process.argv.slice(2));
    let args = { mode: "production", ...cmdArg, ...arg };
    let isPro = args.mode === "production";
    let openServer = isPro ? Boolean(+args.server) : true;
    let webpackPromise = (cb) => {
        generateConf(pcf, args).then((webpackConf) => {
            if (openServer) {
                const compiler = webpack(webpackConf);
                const devServer = webpackConf[0].devServer;
                const server = new WebpackDevServer(devServer, compiler);
                server.start();
                if (webpackConf.length > 1) {
                    console.warn("devServer use first config in the webpack config.");
                }
            } else {
                webpack(webpackConf, (err, stats) => {
                    if (err || stats.hasErrors()) {
                        console.error(err);
                    } else {
                        console.log("build success.");
                        cb(webpackConf);
                    }
                });
            }
        });
    };
    let tasks = (config) => {
        let startElectron = () => {
            const electron = require("electron");
            const { spawn } = require("child_process");
            let electronProcess = null;
            let conf = {
                mode: config.mode,
                isPro: isPro,
                devServer: config.devServer,
                output: config.output,
            };
            let args = [path.join(__dirname, "./src/electron/main.js"), `--config= ${JSON.stringify(conf)}`];
            electronProcess = spawn(electron, args);
            electronProcess.stdout.on("data", (data) => {
                console.log(data.toString());
            });
            electronProcess.stderr.on("data", (data) => {
                console.error(`stderr: ${data}`);
            });
            electronProcess.on("close", (code) => {
                console.log(`child process exited with code ${code}`);
                process.exit();
            });
        };
        if (args.target === "electron" || (!args.target && config.target === "electron")) {
            startElectron();
        }
    };
    webpackPromise(tasks);
};
