/**
 * @file webpack release版
 * @author jinjiaxing<34568305@qq.com>
 * @date 18/01/08
 */

'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 读取同一目录下的 base config
const config = require('./webpack.base.config').config;
const verforTime = require('./webpack.base.config').verforTime;

config.entry.main = [path.resolve(__dirname, './client/router.jsx')];

config.plugins.push(
    // 压缩打包的文件
    new webpack.optimize.UglifyJsPlugin({
        // 最紧凑的输出
        beautify: false,
        // 删除所有的注释
        comments: false,
        compress: {
            // 在UglifyJs删除没有用到的代码时不输出警告
            warnings: false,
            // 删除所有的 `console` 语句
            drop_console: true,
        },
        output: {
            comments: false,  // remove all comments
        },
    }),
    // 开启全局的模块热替换(HMR)
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
        }
    }),
    // 独立打包样式文件
    new ExtractTextPlugin({filename: '[name].[hash].bundle.css?ver='+verforTime, disable: false, allChunks: true})
);

config.module.rules.push(
    {
        test: [/\.scss$/, /\.css$/],
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        // css压缩
                        minimize: true
                    }
                },
                {
                    loader: 'postcss-loader', options: {
                    plugins: (loader) => [
                        require('autoprefixer')({
                            browsers: [
                                'last 2 versions',
                                'iOS >= 8',
                                'Safari >= 8',
                                'Android >= 4',
                                '> 1%'
                            ]
                        }),
                    ]
                }
                },
                'sass-loader'
            ]
        })
    }
);

module.exports = config;