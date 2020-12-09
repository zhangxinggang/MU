const path = require('path')
module.exports = {
	services:{
		viewServer:{
			output:path.resolve(process.cwd(),'dist'),
			entry:path.resolve(process.cwd(),"./src/page")
		}
	}
}