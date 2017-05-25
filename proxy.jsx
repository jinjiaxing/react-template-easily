/**
 * @file Mock Server
 * @author chenyiwen
 * @date 16/12/05
 */
var http = require('http');
var url = require('url');
var fs = require('fs');
var Webpackdevserver = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.config');

var HOST = '0.0.0.0';
var PROXY_PORT = 8000;
var SERVER_PORT = 8080;

var mock = require('./mock.jsx');

var devServerConfig = Object.assign(config.devServer);

if (process.env.NODE_ENV === 'MOCK') {
    config.module.loaders.splice(1, 0, {
        test: [/\.js$/, /\.jsx$/],
        loader: 'string-replace',
        exclude: /node_modules/,
        query: {
            multiple: [
                {search: 'NATIVE_COMM_TAG = \'iframe\'', replace: 'NATIVE_COMM_TAG = \'script\''},
                {search: 'carlife://', replace: '/mock/', flags: 'g'}
            ]
        }
    });

    devServerConfig.proxy = Object.assign(config.devServer.proxy, {
        '/mock/*': {
            target: 'http://' + HOST + ':8000/mock'
        }
    });
}

new Webpackdevserver(webpack(config), devServerConfig).listen(SERVER_PORT);

http.createServer(function (proxyReq, proxyResp) {
    var params = url.parse(proxyReq.url, true);
    if ('/mock' === params.pathname.substr(0, '/mock'.length)) {
        console.log(proxyReq.method, proxyReq.url);

        var exist = fs.existsSync('./mock.jsx');
        if (!exist) {
            proxyResp.writeHead(404, {'Content-Type': 'text/plain'});
            proxyResp.end();
            return;
        } else {
            var content = fs.readFileSync('./mock.jsx', 'utf8');
            proxyResp.writeHead(200, {'Content-Type': 'application/json'});
            proxyResp.end(content + '(' + JSON.stringify(params.query) + ')');
        }

    }
    proxyResp.writeHead(404);
    proxyResp.end();
}).listen(PROXY_PORT);

console.log('Mock server is running at ' + PROXY_PORT + '... open "http://' + HOST + ':' + SERVER_PORT + '" to test');
