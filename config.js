const path = require('path')
module.exports = {
	services:{
		viewServer:{
			outputDir:path.join(process.cwd(),'dist'),
			entryDir:"./src"
		}
	}
}