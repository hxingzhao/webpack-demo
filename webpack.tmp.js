const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// html-webpack-template配合HtmlWebpackPlugin使用时有版本限制 
// peerDependencies WARNING html-webpack-template@* requires a peer of html-webpack-plugin@2.x || ^3
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    optimization: {
        usedExports: true
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"), // 告诉服务器从哪里提供内容
        hot: true, // 启用 webpack 的模块热替换特性
    },
    entry: {
        app: './src/index.js',
        another: './src/another-module.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Output Management',
            minify: false
        }),
        // 这个插件的作用是在热加载时直接返回更新文件名，而不是文件的id 
        // [HMR] Updated modules:  [HMR]  - ./example. js  [HMR] Update applied.
        // new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        //解析扩展名 
        extensions: ['.js', 'jsx', 'vue'],
        alias: {
            //快捷访问入口
            'component': path.resolve(__dirname, './src/components/'),
            'utils': path.resolve(__dirname, './src/utils/')
        }
    }
};