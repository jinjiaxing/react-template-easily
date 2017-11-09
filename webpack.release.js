/**
 * @file webpack 产品发布打包脚本
 * @author jinjiaxing<34568305@qq.com>
 * @date 17/5/19.
 * @update 17/11/08
 */
'use strict';

const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const _d = new Date();
const verforTime = _d.getFullYear().toString() + (_d.getMonth()+1).toString() + _d.getDate();

let config = {
    // 入口
    entry: {
        main: [path.resolve(__dirname, './client/router.jsx')],
        vendor: ['react', 'react-dom', 'react-router-dom', 'react-redux',
            'redux','redux-thunk', 'prop-types']
    },
    // 出口
    output: {
        path: buildPath,
        filename: '[name].[hash].js?ver='+verforTime
    },
    // 优化
    resolve: {
        // 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['.jsx', '.js', '.json', '.scss'],
        // 别名,优化编译时间
        alias: {
            'react': path.join(__dirname, 'node_modules', 'react')
        },
        modules: [path.resolve(__dirname, 'node_modules')]
    },

    module: {
        rules: [
            {
                test: [/\.js$/, /\.jsx$/],
                use: ['babel-loader?cacheDirectory=true'],
                exclude: /node_modules/,
                include: path.resolve(__dirname, './client')
            },
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
            },
            // 对于所有小于8k的图片进行资源打包,大于8k的图片直接拷贝到/dist/img目录下
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'Img/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        // 打包html文件,动态加载js,拷贝到输出目录
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './client/index.html',
            inject: 'body',
            chunks: ['vendor', 'main']
        }),
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

        // 提取多个入口文件的公共脚本
        new webpack.optimize.CommonsChunkPlugin(
            {
                name: 'vendor',
                filename: 'smartparkinglib.[hash].js?ver='+verforTime
            }
        ),
        // 独立打包样式文件
        new ExtractTextPlugin({filename: '[name].[hash].bundle.css?ver='+verforTime, disable: false, allChunks: true}),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
};

module.exports = config;