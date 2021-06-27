let devServer = {
    host: "localhost",
    historyApiFallback: true, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    port: 8089,
    compress: true, // 启用gzip压缩
    hot: true, // 热启动
    open: false,
    client: {
        overlay: {
            errors: true,
            warnings: false,
        },
    },
};
module.exports = devServer;
