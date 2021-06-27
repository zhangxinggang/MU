// 提取公共模块，包括第三方库和自定义工具库等
module.exports = {
    // 找到chunk中共享的模块,取出来生成单独的chunk
    splitChunks: {
        chunks: "all", // async表示抽取异步模块，all表示对所有模块生效，initial表示对同步模块生效
        cacheGroups: {
            "chunk-vendors": {
                // 抽离第三方插件
                test: /[\\/]node_modules[\\/]/,
                name: "chunk-vendors",
                priority: -10,
            },
            "chunk-common": {
                // 抽离自定义工具库
                name: "chunk-common",
                minSize: 0, // 将引用模块分离成新代码文件的最小体积
                minChunks: 2, // 表示将引用模块如不同文件引用了多少次，才能分离生成新chunk
                priority: -20,
            },
        },
    },
    // 为 webpack 运行时代码创建单独的chunk，单独出来需要考虑http开销和大小
    // runtimeChunk:{
    // 	name:'manifest'
    // }
};
