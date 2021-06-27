const cmdArg = require("minimist")(process.argv.slice(2));
const config = JSON.parse(cmdArg.config);
const { app, BrowserWindow } = require("electron");
let mainWindow;
let winURL = config.isPro ? `file://${config.output.path}/index.html` : `http://localhost:${config.devServer.port}`;
app.on("ready", () => {
    mainWindow = new BrowserWindow({
        title: "桌面应用程序",
        webPreferences: {
            nativeWindowOpen: true,
            nodeIntegration: true,
            devTools: true,
        },
    });
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL(winURL);
});
