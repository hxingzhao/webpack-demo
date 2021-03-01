const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        usedExports: true,
        splitChunks: {
            // 这表明将选择哪些块进行优化。当提供一个字符串，有效值为all，async和initial。
            // 提供all可能特别强大，因为它意味着即使在异步和非异步块之间也可以共享块。
            chunks: 'all',
            cacheGroups: {
                "common-vendor": {
                    name:'common-vendor',
                    test: /[\\/]node_modules[\\/]/,
                    enforce: true // 忽略创建限制
                }
            }
        }
    }
});