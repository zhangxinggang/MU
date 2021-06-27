const path = require('path')
module.exports = {
	services:{
		// target:'electron',
		viewServer:{
			output:path.resolve(process.cwd(),'dist'),
			entry:{
				index:path.resolve(__dirname,"./src/pages/index.js")
			}
		}
	}
}