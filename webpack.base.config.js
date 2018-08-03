/**
 * @file webpack通用配置文件
 * @author jinjiaxing<34568305@qq.com>
 * @date 18/01/08
 */

'use strict';

/**lib**/
const webpack = require('webpack');
const path = require('path');

/**plugin**/
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**other**/
const _d = new Date();
const verforTime = _d.getFullYear().toString() + (_d.getMonth() + 1).toString() + _d.getDate();
const BUILD_PATH = path.resolve(__dirname, 'dist');
const REACT_ENV = process.env.REACT_ENV;
// 源代码的根目录（本地物理文件路径）
const SRC_PATH = path.resolve('./client');


console.log('--------------------------REACT_ENV=',REACT_ENV);
let aliasObj ={};
if( REACT_ENV ==='preact') {
    aliasObj = {
        'react': 'preact-compat',
        'react-dom': 'preact-compat',
        'create-react-class': 'preact-compat/lib/create-react-class',
        'react-redux': 'preact-redux',
        'react-tap-event-plugin': 'preact-tap-event-plugin'
    }
} else {
    aliasObj = {
        'react': path.join(__dirname, 'node_modules', 'react')
    }
}

let config = {
    resolve: {
        // 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['.jsx', '.js', '.json', '.scss', '.png'],
        // 别名,优化编译时间
        alias: aliasObj,
        modules: [path.resolve(__dirname, 'node_modules')]
    },
    // 入口
    entry: {
        vendor: ['core-js','react', 'react-dom', 'react-router-dom', 'react-redux', 'redux',
            'redux-thunk', 'prop-types']
    },
    // 出口
    output: {
        path: BUILD_PATH,
        filename: '[name].[hash].js?ver=' + verforTime
    },
    module: {
        rules: [
            {
                test: [/\.js$/, /\.jsx$/],
                use: ['babel-loader?cacheDirectory=true'],
                exclude: /node_modules/,
                include: path.resolve(__dirname, SRC_PATH)
            },
            // 对于所有小于8k的图片进行资源打包,大于8k的图片直接拷贝到/dist/img目录下
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'Img/[name].[ext]'
                },
                exclude: /node_modules/,
                include: path.resolve(__dirname, './client')
            }
        ]
    },
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10,
                    reuseExistingChunk: false,
                    test: /node_modules\/(.*)\.js/
                }
            }
        }
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        // 每次打包前，先清空原来目录中的内容
        new CleanWebpackPlugin([BUILD_PATH], { verbose: false }),
        // 打包html文件,动态加载js,拷贝到输出目录
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './client/index.html',
            inject: 'body',
            chunks: ['vendor', 'main','manifest']
        })
    ]
};

module.exports = config;
