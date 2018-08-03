/**
 * @file webpack 开发版
 * @author jinjiaxing<34568305@qq.com>
 * @date 18/01/08
 */

const webpack = require('webpack');
const path = require('path');

// 读取同一目录下的 base config
const config = require('./webpack.base.config');

config.entry.main= [
    // activate HMR for React
    'webpack-dev-server/client?http://0.0.0.0:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, './client/router.jsx')
];

// 添加 webpack-dev-server 相关的配置项
config.devServer = {
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
    host: "0.0.0.0",
    port: "8080",
    proxy: {},
    // enable gzip compression
    compress: true,
    // hot module replacement. Depends on HotModuleReplacementPlugin
    hot: true,
    disableHostCheck: true
};

config.devtool = 'eval-source-map';

config.module.rules.push(
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

    }
);

config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
);

config.mode = "development";

module.exports = config;