const fs = require("fs")
const MiniCssExtractPlugin=require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const getPath = require("./getPath")
const {entry}=MUGlobal.services.viewServer
const isDevelopment = process.env.NODE_ENV === 'development'? true: false
let plugins=[]
if(!isDevelopment){
	let {CleanWebpackPlugin}=require('clean-webpack-plugin')
	plugins.push(new CleanWebpackPlugin())
}
function htmlTemplate(page_path){
	let htmlArr = []
	let paths=getPath(page_path)
	paths.map(async (item)=>{
		let template=`${page_path}/${item}/index.html`
		let entryAddr=`${item}/index`
		let htmlPluginParams={
			chunks:[entryAddr,'vendor', 'common'],//必须时entry入口的key定义过
			filename : item == "index" ? "index.html" : `${entryAddr}.html`, //html位置
			minify:{
				collapseWhitespace: true,
				preserveLineBreaks: true
			}
		}
		try{
			fs.accessSync(template)
			htmlPluginParams['template']=template
		}catch(err){
			htmlPluginParams['templateContent']=`<!doctype html>
			<html>
				<head>
					<style>
						::-webkit-scrollbar{
							width:10px;
						}
						::-webkit-scrollbar-track{
							background:rgb(239,239,239);
						}
						::-webkit-scrollbar-thumb{
							background: #bfbfbf;
							border-radius: 4px;
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
					<meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1.0">
				</head>
				<body>
					<div id=app></div>
				</body>
			</html>`
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
	})
])
module.exports=plugins