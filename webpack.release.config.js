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
const config = require('./webpack.base.config.js');
const _d = new Date();
const verforTime = _d.getFullYear().toString() + (_d.getMonth() + 1).toString() + _d.getDate();

config.entry.main = [path.resolve(__dirname, './client/router.jsx')];

config.plugins.push(
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
config.mode = "production";

module.exports = config;