/**
 * Created by jinjiaxing on 17/05/25.
 */
var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var buildPath = path.resolve(__dirname, 'dist');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    // 入口
    entry: {
        main: [path.resolve(__dirname, './client/router.jsx')],
        vendor: ['react', 'react-dom', 'react-router-dom', 'react-redux', 'redux', 'fastclick', 'iscroll', 'redux-thunk', 'prop-types']
    },
    // 出口
    output: {
        path: buildPath,
        filename: '[name].[hash].js'
    },
    // 优化
    resolve: {
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
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
                                minimize: true //css压缩
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
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'img/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        // 打包html文件,动态加载js,拷贝到输出目录
        new htmlWebpackPlugin({
            filename: './index.html',
            template: './client/index.html',
            inject: 'body'
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
                // 还可以兼容ie浏览器
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
                filename: 'common.js'
            }
        ),
        // 独立打包样式文件
        new ExtractTextPlugin({filename: '[name].[hash].bundle.css', disable: false, allChunks: true}),

        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })

    ]

}

module.exports = config;
