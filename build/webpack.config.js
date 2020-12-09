const {merge} = require('webpack-merge')
const defaultConfig= require('../config') || {}
module.exports = (pcf, arg) =>{
	arg && arg.NODE_ENV && (process.env.NODE_ENV=arg.NODE_ENV)
	!process.env.NODE_ENV && (process.env.NODE_ENV='production')
	const config=merge(defaultConfig,pcf)
	global.MUGlobal=config || {}
	!config.services && (config.services={})
	!config.services.viewServer && (config.services.viewServer={})
	let webpackConfig=merge({},
		{
			module: require('./webpack/module.conf'),
			devServer: require('./webpack/devServer.conf'),
			resolve:require('./webpack/resolve.conf'),
			plugins:require('./webpack/plugins.conf'),
			optimization: require('./webpack/optimization.conf')
		},{
			...config.services.viewServer
		},{
			mode:process.env.NODE_ENV,
			entry: require('./webpack/entry.conf'),
			output: require('./webpack/output.conf'),
		}
	)
	return webpackConfig
}