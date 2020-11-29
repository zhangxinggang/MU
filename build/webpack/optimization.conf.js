const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
module.exports={
	minimizer: [//压缩js
		new TerserPlugin({
			sourceMap: true, // Must be set to true if using source-maps in production
			terserOptions: {
				output: {
					comments: false,
				}
			}
		}),
		new UglifyJsPlugin({
			cache: true,
			parallel: true,
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