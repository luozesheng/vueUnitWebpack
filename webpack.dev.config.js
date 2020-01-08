const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');

const httpProxy = require('http-proxy');
const proxyConfig = require('./proxy');

console.log(proxyConfig);



const devServerPort = 3222;

const devSever = new WebpackDevServer(webpack(webpackBaseConfig), {
    contentBase: './public/',
    publicPath:'',
    historyApiFallback: true,
    hot: false,
    noInfo: false
});

devSever.listen(devServerPort, '0.0.0.0', function (err) {
    if (err) {
        console.log(err);
    }
});

console.log('Webpack Dev Server is listening on port ' + devServerPort);

const proxy = httpProxy.createProxyServer({
    secure: false
});

// 捕获异常
proxy.on('error', function (err, req, res) {
    console.log(err);
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end('Something went wrong. And we are reporting a custom error message.');
});

const proxyServer = require('http').createServer(function (req, res) {
    // 在这里可以自定义你的路由分发
    if (proxyConfig.isProxy(req.url)) {
        //req.url = proxyConfig.urlTransform(req.url); 接口走代理
        console.log('代理的远程服务器:'+proxyConfig.server);
        proxy.web(req, res, { target: proxyConfig.server });
    }
    else {
        // 本地页面 css,图片直接走本地， 无代理
        proxy.web(req, res, {target: 'http://127.0.0.1:' + devServerPort});
    }
});

proxyServer.listen(proxyConfig.port);
console.log('Proxy server is listening at ' + proxyConfig.port);
// fs.open('./src/config/env.js', 'w', function(err, fd) {
//     const buf = 'export default "development";';
//     fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
// });

module.exports = merge(webpackBaseConfig, {
    devtool: '#source-map',
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.js'
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/template/index.ejs',
            inject: false
        })
    ]
});