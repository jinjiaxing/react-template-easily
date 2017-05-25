/**
 * Created by jinjiaxing on 17/5/19.
 */
var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var buildPath = path.resolve(__dirname, 'dist');
var htmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    // 入口
    entry: {
        main: [
            // activate HMR for React
            'webpack-dev-server/client?http://0.0.0.0:8080',
            // bundle the client for webpack-dev-server
            // and connect to the provided endpoint
            'webpack/hot/only-dev-server',
            path.resolve(__dirname, './client/router.jsx')],
        vendor: ['react', 'react-dom', 'react-router-dom', 'react-redux', 'redux', 'fastclick', 'iscroll', 'redux-thunk','prop-types']

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
    // 出口
    output: {
        path: buildPath,
        filename: '[name].[hash].js',

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
            '/api/*': {

                target: 'http://www.baidu.com/',
                secure: false,
                changeOrigin: true
            }
        },
        // gzip
        compress: true
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
                            }),
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
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'img/[name].[ext]'
                },
                exclude: /node_modules/,
                include: path.resolve(__dirname, './client')
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

        // 提取多个入口文件的公共脚本
        new webpack.optimize.CommonsChunkPlugin(
            {
                name: 'vendor',
                filename: 'common.js'
            }
        ),
        new webpack.HotModuleReplacementPlugin(),
        // 开启全局的模块热替换(HMR)

    ]

}

module.exports = config;
