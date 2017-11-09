/**
 * @file webpack 产品dev开发打包脚本
 * @author jinjiaxing<34568305@qq.com>
 * @date 17/5/19.
 */
'use strict';

const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const _d = new Date();
const verforTime = _d.getFullYear().toString() + (_d.getMonth() + 1).toString() + _d.getDate();

let config = {
    // 入口
    entry: {
        main: [
            // activate HMR for React
            'webpack-dev-server/client?http://0.0.0.0:8080',
            // bundle the client for webpack-dev-server
            // and connect to the provided endpoint
            'webpack/hot/only-dev-server',
            path.resolve(__dirname, './client/router.jsx')
        ],
        vendor: ['react', 'react-dom', 'react-router-dom', 'react-redux', 'redux',
            'redux-thunk', 'prop-types']

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
    // 出口
    output: {
        path: buildPath,
        filename: '[name].[hash].js?ver=' + verforTime

    },

    // 开启sourcemap
    devtool: 'eval-source-map',
    // server配置
    devServer: {

        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        host: "0.0.0.0",
        port: "8080",
        proxy: {

        },
        // gzip
        compress: true,
        disableHostCheck: true
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
                use: [
                    {loader: 'style-loader', options: {}},
                    {loader: 'css-loader', options: {}},
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
                            })
                        ]
                    }
                    },
                    {loader: 'sass-loader', options: {}}
                ],
                exclude: /node_modules/,
                include: path.resolve(__dirname, './client'),

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
    plugins: [
        // 打包html文件,动态加载js,拷贝到输出目录
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './client/index.html',
            inject: 'body',
            chunks: ['vendor', 'main']
        }),
        // 提取多个入口文件的公共脚本
        new webpack.optimize.CommonsChunkPlugin(
            {
                name: 'vendor',
                filename: 'smartparkinglib.[hash].js?ver=' + verforTime
            }
        ),
        new webpack.HotModuleReplacementPlugin(),
        // 开启全局的模块热替换(HMR)
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]

};

module.exports = config;
