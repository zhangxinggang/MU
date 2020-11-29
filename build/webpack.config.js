const merge = require('merge')
const config= require('../config') || {}
module.exports = (pcf, arg) =>{
	arg.NODE_ENV && (process.env.NODE_ENV=arg.NODE_ENV)
	!process.env.NODE_ENV && (process.env.NODE_ENV='production')
	merge.recursive(config,pcf)
	global.MUGlobal=config || {}
	return {
		mode:process.env.NODE_ENV,
		entry: require('./webpack/entry.conf'),
		output: require('./webpack/output.conf'),
		module: require('./webpack/module.conf'),
		devServer: require('./webpack/devServer.conf'),
		resolve:require('./webpack/resolve.conf'),
		plugins:require('./webpack/plugins.conf'),
		optimization: require('./webpack/optimization.conf')
	}
}