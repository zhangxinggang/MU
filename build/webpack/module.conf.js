const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDevelopment = process.env.NODE_ENV === "development" ? true : false;
//常用loader分开写，好被外面覆盖
let cssCommonLoader = (lastLoaderName) => {
    let loaders = [isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"];
    lastLoaderName && loaders.push(`${lastLoaderName}-loader`);
    return loaders;
};
let jsCommonLoader = {
    loader: "babel-loader",
    options: {
        cacheDirectory: true,
        presets: [
            require("@babel/preset-env"),
            require("@babel/preset-react"),
            {
                plugins: [
                    require("@babel/plugin-proposal-class-properties"), //这句很重要 不然箭头函数出错
                ],
            },
        ],
        plugins: [require("@babel/plugin-transform-runtime")],
    },
};
let rules = [
    {
        test: /\.vue$/,
        use: [
            {
                loader: "vue-loader",
            },
        ],
    },
    {
        test: /\.js$/,
        use: jsCommonLoader,
    },
    {
        test: /\.jsx$/,
        use: jsCommonLoader,
    },
    {
        test: /\.css$/,
        use: cssCommonLoader(),
    },
    {
        test: /\.less$/,
        use: cssCommonLoader("less"),
    },
    {
        test: /\.sass$/,
        use: cssCommonLoader("sass"),
    },
    {
        test: /\.scss$/,
        use: cssCommonLoader("sass"),
    },
    {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
            {
                loader: "url-loader",
                options: {
                    esModule: false,
                    limit: 10000,
                    name: isDevelopment ? "public/media/[hash:8].[name].[ext]" : "public/media/[name].[ext]",
                },
            },
        ],
        exclude: new RegExp("node_modules"),
    },
    {
        test: /\.(woff|woff2?|eot|ttf|otf)$/,
        use: [
            {
                loader: "url-loader",
                options: {
                    esModule: false,
                    name: "[name].[ext]",
                    limit: 5000,
                    outputPath: "public/fonts",
                },
            },
        ],
        exclude: new RegExp("node_modules"),
    },
    {
        test: /\.(png|jpe?g|gif)$/,
        use: [
            {
                loader: "url-loader",
                options: {
                    esModule: false,
                    // 这里的options选项参数可以定义多大的图片转换为base64
                    name: isDevelopment ? "[hash:8].[name].[ext]" : "[name].[ext]",
                    limit: 50 * 1024, //小于50k就会转成base64
                    outputPath: "public/images", //定义输出的图片文件夹
                },
            },
        ],
        exclude: new RegExp("node_modules"),
    },
    {
        test: /\.svg/,
        use: [
            {
                loader: "svg-sprite-loader",
                options: {
                    symbolId: "icon-[name]",
                    extract: false,
                },
            },
        ],
        exclude: new RegExp("node_modules"),
    },
    {
        test: /\.(ico)$/,
        use: [
            {
                loader: "url-loader",
                options: {
                    esModule: false,
                    limit: 10,
                    name: "[name].[ext]",
                    outputPath: "public/ico",
                },
            },
        ],
        exclude: new RegExp("node_modules"),
    },
    {
        test: /\.md$/,
        use: [
            {
                loader: "html-loader",
            },
            {
                loader: "markdown-loader",
            },
        ],
        exclude: new RegExp("node_modules"),
    },
];
module.exports = {
    rules: rules,
};
