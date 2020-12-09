const getPath = require("./getPath")
const {entry}=MUGlobal.services.viewServer
let entrys={}
getPath(entry).map((item)=>{
	entrys[`${item}/index`] = `${entry}/${item}/index.js`
});
module.exports = entrys