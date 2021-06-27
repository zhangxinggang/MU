const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
module.exports={
	minimizer: [//压缩js
		new TerserPlugin({
			terserOptions: {
				output: {
					comments: false
				},
				compress: {
					drop_console: true
				}
			},
			cache: true, // 是否缓存
			parallel: true, // 是否并行打包
			sourceMap: false
		}),
		new OptimizeCSSAssetsPlugin({})
	],
	runtimeChunk: 'single',
	splitChunks: {//压缩css
		cacheGroups: {
			vendor: {
				test: /[\\/]node_modules[\\/]/,
				name: 'vendor',
				minSize: 0,
				chunks: 'all',
			},
			common: {
				test:/[\\/]src[\\/]common[\\/]/,//也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,
				name: "common", //生成文件名，依据output规则
				minSize: 0,
				priority: 80,
				chunks:"all",
			},
		}
	}
};