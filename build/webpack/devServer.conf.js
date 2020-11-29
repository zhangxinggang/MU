const merge = require('merge')
let devServer={
	disableHostCheck: true,
  	contentBase:false,
  	host:'0.0.0.0',
	historyApiFallback: true,// 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
  	port:8089,
	compress: true,// 启用gzip压缩
	publicPath: '/',
  	inline:true, // 设置为true，当源文件改变时会自动刷新页面
  	hot:true, // 热启动
	watchContentBase:false,
	noInfo: false,
	quiet: false,
	lazy: false,
	watchOptions:{
		aggregateTimeout: 300,
		pool: true
	},
	open:false,
	stats: { colors: true, chunks: false }
}
merge.recursive(devServer,MUGlobal.services.viewServer.devServer)
module.exports = devServer