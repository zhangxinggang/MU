const {entry}=MUGlobal.services.viewServer
if(Object.prototype.toString.call(entry)!=='[object Object]'){
	console.error('entry must be Object!')
}
module.exports = entry