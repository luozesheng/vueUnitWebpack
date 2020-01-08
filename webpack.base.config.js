const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main',
        //vendors: './src/vendors'
    },
    output: {
        path: path.join(__dirname, 'build' ,'./theme')
    },
    dev: {
        assetsSubDirectory: 'static', // 静态文件目录
        assetsPublicPath: '/', // 相对文件路径
        proxyTable: {},
        host: 'localhost',
        port: '8000',
        autoOpenBrowser: false, // 是否自动打开浏览器
        errorOverlay: true, // 浏览器错误提示遮罩层
        notifyOnErrors: true, // 编译错误的时候通知提示，需要friendly-errors-webpack-plugin 配合
        poll: false,
        useEslint: true, // 便宜使用eslint-loader模块
        showEslintErrorsInOverlay: false, // eslint浏览器错误提示遮罩层
        devtool: 'cheap-module-eval-source-map', // Source Maps
        cssSourceMap: true, // css Source Maps
        cacheBusting: false, // vue debugg 提示
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {

                        css: ExtractTextPlugin.extract({
                            use: ['css-loader', 'autoprefixer-loader'],
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /iview\/.*?js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: resolve('src')
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', 'autoprefixer-loader'],
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024'
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js'
        }
    }
};