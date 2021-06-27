const path = require("path");
const cwdModules = path.resolve(process.cwd(), "node_modules");
const baseModules = path.resolve(__dirname, "../../node_modules");
module.exports = {
    alias: {
        "@g": path.join(__dirname, "../../src/utils"),
    },
    extensions: [".js", ".jsx", ".vue", ".json"],
    modules: Array.from(new Set(["node_modules", cwdModules, baseModules])),
};
