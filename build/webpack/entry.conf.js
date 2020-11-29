const getPath = require("./getPath")
const {entryDir}=MUGlobal.services.viewServer
const entry = {}
getPath(entryDir).map((item)=>{
	entry[`${item}/index`] = `${entryDir}/${item}/index.js`
});
module.exports = entry