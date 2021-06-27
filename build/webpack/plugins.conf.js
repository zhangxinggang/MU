const fs = require("fs")
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin=require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { VueLoaderPlugin } = require("vue-loader")
const {entry,externals}=global.MUGlobal.services.viewServer
const isDevelopment = process.env.NODE_ENV === 'development'? true: false
let project = global.MUGlobal.project || {}
let dproject = {}
for(let key in project){
	let value=project[key]
	let isObject = Object.prototype.toString.call(value)=="[object Object]" || Object.prototype.toString.call(value)=="[object Array]"
	value = isObject ? JSON.stringify(value) : value
	dproject['PROJECT.'+key]=`'${value}'`
}
let plugins=[
	new webpack.DefinePlugin(dproject)
]
if(!isDevelopment){
	let {CleanWebpackPlugin}=require('clean-webpack-plugin')
	plugins.push(new CleanWebpackPlugin())
}else{
	let {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
	plugins.push(new BundleAnalyzerPlugin({
		openAnalyzer: false,
		analyzerPort: global.MUGlobal.dev.analyzerPort
	}))
}
function htmlTemplate(entry){
	let htmlArr = []
	let entrys=Object.keys(entry)
	entrys.forEach(async (item)=>{
		let template=path.resolve(entry[item],'../index.html')
		let htmlPluginParams={
			chunks:[item, 'runtime', 'vendor', 'common'],//必须时entry入口的key定义过
			filename : `${item}.html`, //html位置
			minify:{
				preserveLineBreaks: true,
				collapseWhitespace: true, // 移除空格
				removeAttributeQuotes: true, // 移除引号
				removeComments: true // 移除注释
			},
			cdn:(externals || {})['_cdn']
		}
		try{
			fs.accessSync(template)
			htmlPluginParams['template']=template
		}catch(err){
			htmlPluginParams['templateContent']=({htmlWebpackPlugin})=>{
				let injectCss = ''
				let injectScript = ''
				if(htmlWebpackPlugin.options.cdn && htmlWebpackPlugin.options.cdn[item]){
					let entryCdn = htmlWebpackPlugin.options.cdn[item]
					entryCdn.forEach(item=>{
						let type = item.substring(item.lastIndexOf('.')+1).toLowerCase()
						if(type === 'css'){
							injectCss += `<link rel="stylesheet" href="${item}" />\n`
						}
						if(type === 'js'){
							injectScript += `<script type="text/javascript" src="${item}"></script>\n`
						}
					})
				}
				return `<!doctype html>
				<html>
					<head>
						<style>
							::-webkit-scrollbar{
								width:5px;
								height:5px;
							}
							::-webkit-scrollbar-track{
								background:rgb(239,239,239);
							}
							::-webkit-scrollbar-thumb{
								background: #bfbfbf;
								border-radius: 5px;
							}
							::-webkit-scrollbar-thumb:hover{
								background: #333;
							}
							*{
								margin:0;
								padding:0;
								box-sizing:border-box;
							}
							html,body,#app{
								width:100%;
								height:100%;
							}
						</style>
						<meta charset="utf-8">
						<meta http-equiv="X-UA-Compatible" content="IE=edge">
						<meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1.0">
						${injectCss}
					</head>
					<body>
						<div id=app></div>
						${injectScript}
					</body>
				</html>`
			}
		}
		htmlArr.push(new HtmlWebpackPlugin(htmlPluginParams))
	});
	return htmlArr
}
plugins=plugins.concat([
	...htmlTemplate(entry),
	new MiniCssExtractPlugin({
		filename: isDevelopment?"[name].[contenthash:8].css":'[name].css',
		chunkFilename: isDevelopment?"public/css/[id].[hash].css":'public/css/[id].css'
	}),
	new VueLoaderPlugin()
])
module.exports=plugins