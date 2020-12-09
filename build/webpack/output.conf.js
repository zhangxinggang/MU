const {viewServer,httpServer}=MUGlobal.services
const {output} = viewServer
const {normalize,join} = require('upath')
let outputObj={
	path: join(process.cwd(),'dist'),
	filename: "[name].js",
	publicPath:'/'
}
if(typeof(output)=='object'){
	Object.assign(outputObj,output)
}else if(typeof(output)=='string'){
	outputObj.path=output
}
if(httpServer && httpServer.routes && httpServer.routes.staticDirs){
	let staticDirs=httpServer.routes.staticDirs
	staticDirs.map(item=>{
		if(normalize(item.rootDir)==normalize(outputObj.path)){
			outputObj.publicPath=item.rootPath || '/'
		}
	})
}
module.exports=outputObj