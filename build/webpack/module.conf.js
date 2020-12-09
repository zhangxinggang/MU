const MiniCssExtractPlugin=require("mini-css-extract-plugin")
const isDevelopment = process.env.NODE_ENV === 'development'? true: false
var rules=[{
    test:/\.(js|jsx)/,
	exclude:new RegExp('node_modules'),
    use: {
        loader:"babel-loader",
        options:{
            presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                {
                    "plugins": 
                    [
                        "@babel/plugin-proposal-class-properties"
                    ]
                } //这句很重要 不然箭头函数出错
            ], 
        }
    }
},{
    test: /\.less$/,
    exclude:new RegExp('node_modules'),
    use: [
        isDevelopment?'style-loader':MiniCssExtractPlugin.loader,
        'css-loader',
        'less-loader'
    ]
},{
    test: /\.(sa|sc|c)ss$/,
    exclude:new RegExp('node_modules'),
    use:[
        isDevelopment?'style-loader':MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
    ]
},{
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    exclude:new RegExp('node_modules'),
    use:[{
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: isDevelopment?'public/media/[hash:8].[name].[ext]':'public/media/[name].[ext]'
        }
    }]
},{
    test: /\.(woff|woff2?|eot|ttf|otf)$/,
    exclude:new RegExp('node_modules'),
	loader: 'url-loader?limit=10240&name=public/fonts/[name].[ext]'
},{
    test: /\.(png|jpe?g|gif)$/,
    exclude:new RegExp('node_modules'),
    use: [{
        loader: 'url-loader',
        options:{
            esModule: false,
            // 这里的options选项参数可以定义多大的图片转换为base64
            name: isDevelopment?'[hash:8].[name].[ext]':'[name].[ext]',
            limit:50*1024,//小于50k就会转成base64
            outputPath: 'public/images' //定义输出的图片文件夹
        }
    }]
},{
    test: /\.svg/,
    use: [{
        loader:'file-loader',
        options:{
            outputPath: 'public/svg'
        }
    }]
},{
	test: /\.json$/,
	exclude:new RegExp('node_modules'),
	loader: 'json-loader',
}];
module.exports={
	rules:rules
}