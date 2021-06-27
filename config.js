const path = require('path')
module.exports = {
	services:{
		viewServer:{
			output:path.resolve(process.cwd(),'dist'),
			entry:{
				index:path.resolve(process.cwd(),"./src/pages/index/index.js"),
				vue:path.resolve(process.cwd(),"./src/pages/vue/index.js")
			}
		}
	}
}