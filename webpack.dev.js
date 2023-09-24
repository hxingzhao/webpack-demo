const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './dist',
        hot: true, // 启用 webpack 的模块热替换特性 test1
    },
    plugins: [
        // 这个插件的作用是在热加载时直接返回更新文件名，而不是文件的id 
        // [HMR] Updated modules:  [HMR]  - ./example. js  [HMR] Update applied.
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
});