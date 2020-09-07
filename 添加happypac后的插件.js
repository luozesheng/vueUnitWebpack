const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// webpack构建的vue项目中，需要配置改loader的插件库
// 具体解释：https://www.cnblogs.com/eret9616/p/11802889.html
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，支持按需加载css和sourceMap
// https://www.jianshu.com/p/91e60af11cc9
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //引入清除文件插件
//  插件可以测量各个插件和loader所花费的时间，使用之后，构建时会展示编译时间
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
// 它把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。
const Happypack = require('happypack');
const HOST = 'localhost'
const PORT = 3006
const HTTPS = false
let config = {
    mode: "development",
    // JS 执行入口文件
    entry: __dirname + '/src/main.js',
    output: {
        // filename:"bundle.js",
        // 把所有依赖的模块合并输出到一个 bundle.js 文件
        filename: "[name].[hash:8].js", // 用于长效缓存
        // 输出文件都放到 dist 目录下
        path: path.join(__dirname, 'dist'),
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                // use: ['vue-loader'],
                use: 'Happypack/loader?id=js',
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /.css$/,
                use: [
                    // MiniCssExtractPlugin.loader,
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            },
            {
                test: /.less$/,       // less-loader 用于解析 less
                use:"Happypack/loader/loader?id=less",
                // use: [
                //     {
                //         loader: 'style-loader',
                //         // options: {
                //         //     insertAt: 'top', // 将样式插入到 <head>
                //         //     singleton: 'true' // 将所有的 style 标签合成一个
                //         // }
                //     },
                //     {loader: 'css-loader'},
                //     {loader: 'less-loader'},
                //     {
                //         loader: 'postcss-loader',
                //         options:{
                //             plugins: () => [
                //                 require('autoprefixer')({
                //                     browsers:[
                //                         'last 5 version',
                //                         '>1%', 
                //                         'ios 7'
                //                     ]
                //                 })
                //             ]
                //         }
                //     },
                // ],
                include: [path.resolve(__dirname, 'src')]
            },
            // {
            //     test:/\.(vue|less)$/,
            //     loader:'webpack-px2rem-loader',
            //     // 这个配置是可选的
            //      query:{
            //         // 1rem=npx 默认为 10
            //         basePx:75,
            //         // 只会转换大于min的px 默认为0
            //         // 因为很小的px（比如border的1px）转换为rem后在很小的设备上结果会小于1px，有的设备就会不显示
            //         min:1,
            //         // 转换后的rem值保留的小数点后位数 默认为3
            //         floatWidth:3
            //     }
 
            // }
        ]
    },
    plugins: [
        new Happypack({
            id: 'js', //和rule中的id=js对应
            //将之前 rule 中的 loader 在此配置
            use: ['vue-loader'] //必须是数组
        }),
        new Happypack({
            id: 'less',
            use: [
                {
                    loader: 'style-loader',
                },
                {loader: 'css-loader'},
                {loader: 'less-loader'},
                {
                    loader: 'postcss-loader',
                    options:{
                        plugins: () => [
                            require('autoprefixer')({
                                browsers:[
                                    'last 5 version',
                                    '>1%', 
                                    'ios 7'
                                ]
                            })
                        ]
                    }
                },
            ]
        }),
        // new CleanWebpackPlugin(), //引入清楚文件插件
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: '模块热替换',
            template: './public/index.html',
            favicon: './src/assets/images/logo.png'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        // 启动输出清理
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`You application is running here ${HTTPS ? 'https' : 'http'}://${HOST}:${PORT}`],
                // notes: ['Some additional notes to be displayed upon successful compilation'],
                clearConsole: true
            },
        })
    ],
    devServer: {
        contentBase: __dirname,
        quiet: true,
        compress: true,
        port: PORT,
        host: HOST,
        https: HTTPS,
        // hot: true,
        // hotOnly: true,
        // inline: true,
        open: true,
        overlay: true,
        openPage: './dist/index.html'
    },
    // devtool: 'source-map' // 输出 source-map 方便直接调试 ES6 源码
};

module.exports = smp.wrap(config);