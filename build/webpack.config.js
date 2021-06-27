const {merge,mergeWithRules} = require('webpack-merge')
const portfinder = require('portfinder')
const defaultConfig= require('../config') || {}
const regAddI=(arr)=>{
	arr=arr || []
	arr.forEach(item=>{
		item['test']=new RegExp(item['test'],'i')
	})
}
const beforeGenerateConf=()=>{
	!global.MUGlobal.dev && (global.MUGlobal.dev = {})
	const isDevelopment = process.env.NODE_ENV === 'development'? true: false
	const portfinderFun = (initPort)=>{
		return new Promise((resolve, reject)=>{
			portfinder.getPort({
				port:initPort
			},(err,port)=>{
				if(err){
					return portfinderFun(initPort+1)
				}else{
					resolve(port)
				}
			})
		})
	}
	return new Promise(resolve=>{
		if(isDevelopment){
			portfinderFun(8888).then((port)=>{
				global.MUGlobal.dev.analyzerPort = port
				resolve()
			})
		}else{
			resolve()
		}
	})
}
module.exports = (pcf, arg) =>{
	return new Promise((resolve)=>{
		arg && arg.mode && (process.env.NODE_ENV=arg.mode)
		!process.env.NODE_ENV && (process.env.NODE_ENV='production')
		pcf=pcf || {}
		!pcf.services && (pcf.services={})
		!pcf.services.viewServer && (pcf.services.viewServer={})
		pcf.services.viewServer.entry && (delete defaultConfig.services.viewServer.entry)
		const config=merge(defaultConfig,pcf)
		!config.services.viewServer.module && (config.services.viewServer.module={})
		!config.services.viewServer.module.rules && (config.services.viewServer.module.rules=[])

		global.MUGlobal=config
		let defaultModule=require('./webpack/module.conf')
		regAddI(defaultModule.rules)
		regAddI(config.services.viewServer.module.rules)
		let {rules}=mergeWithRules({
			rules: {
				test: "match",
				exclude: 'replace',
				use: 'replace'
			}
		})(defaultModule,config.services.viewServer.module)
		delete defaultModule.rules
		delete config.services.viewServer.module.rules
		let generateConf=()=>{
			return merge({},
				{
					module: defaultModule,
					devServer: require('./webpack/devServer.conf'),
					resolve:require('./webpack/resolve.conf'),
					plugins:require('./webpack/plugins.conf'),
					optimization: require('./webpack/optimization.conf'),
					performance: {
						maxAssetSize: 10000000,
						maxEntrypointSize: 1024*800,
						hints: "warning"
					},
					externals: require('./webpack/externals.conf')
				},{
					...config.services.viewServer,
					module:{rules}
				},{
					mode:process.env.NODE_ENV,
					devtool:process.env.NODE_ENV='production'?false:'eval-source-map',
					entry: require('./webpack/entry.conf'),
					output: require('./webpack/output.conf'),
				}
			)
		}
		beforeGenerateConf().then(()=>{
			resolve(generateConf())
		})
	})
}