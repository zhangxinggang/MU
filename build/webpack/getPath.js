const fs = require("fs")
module.exports = function getPath(path){
	let arr = []
	let existpath = fs.existsSync(path)
	if(existpath){
		let readdirSync = fs.readdirSync(path)
		readdirSync.map((item)=>{
			let currentPath = path + "/" + item;
			let isDirector = fs.statSync(currentPath).isDirectory()
			if(isDirector){
				arr.push(item)
			}
		});
	}
	return arr
};
