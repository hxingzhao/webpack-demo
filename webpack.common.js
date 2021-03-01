const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
// const webpack = require('webpack');

module.exports = {
    // entry这种方式存在一些隐患：比如index.js和another-module.js中都引用了lodash
    // 如果入口 chunk 之间包含一些重复的模块，那些重复模块都会被引入到各个 bundle 中。
    // 这种方法不够灵活，并且不能动态地将核心应用程序逻辑中的代码拆分出来。
    // SplitChunksPlugin 来移除重复的模块。
    entry: {
        index: './src/index.js',
        another: './src/another-module.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['lodash'],
                        presets: ['@babel/preset-env']
                    }
                }
                // options: {
                //     plugins: ['lodash'],
                //     presets: [['env', { 'modules': false, 'targets': { 'node': 4 } }]]
                // }
            },
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
        // 对于 CleanWebpackPlugin 的 v2 versions 以下版本，使用 new CleanWebpackPlugin(['dist/*'])
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'webpack demo'
        }),
        new LodashModuleReplacementPlugin()
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },

    resolve: {
        //解析扩展名 
        extensions: ['.js', 'jsx', 'vue'],
        alias: {
            //快捷访问入口
            'component': path.resolve(__dirname, './src/components/'),
            'utils': path.resolve(__dirname, './src/utils/')
        },

    }
};