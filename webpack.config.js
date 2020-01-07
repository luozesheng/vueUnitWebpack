// 引入依赖模块
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // 入口文件，路径相对于本文件所在的位置，可以写成字符串、数组、对象
    entry: {
        // path.resolve([from ...], to) 将to参数解析为绝对路径
        index:path.resolve(__dirname, '../src/main.js'),
        // 需要被提取为公共模块的群组
        vendors:['vue','vue-router','vuex'],
    },

    // 输出配置
    output: {
        // 输出文件，路径相对于本文件所在的位置
        path: path.resolve(__dirname, '../output/static/js/'),

        // 设置publicPath这个属性会出现很多问题：
        // 1.可以看成输出文件的另一种路径，差别路径是相对于生成的html文件；
        // 2.也可以看成网站运行时的访问路径；
        // 3.该属性的好处在于当你配置了图片CDN的地址，本地开发时引用本地的图片资源，上线打包时就将资源全部指向CDN了，如果没有确定的发布地址不建议配置该属性，特别是在打包图片时，路径很容易出现混乱，如果没有设置，则默认从站点根目录加载
        // publicPath: '../static/js/',

        // 基于文件的md5生成Hash名称的script来防止缓存
        filename: '[name].[hash].js',
        // 非主入口的文件名，即未被列在entry中，却又需要被打包出来的文件命名配置
        chunkFilename: '[id].[chunkhash].js'
    },

    // 其他解决方案:详细说明: https://www.cnblogs.com/joyco773/p/9049760.html
    resolve: {
        // require时省略的扩展名，遇到.vue结尾的也要去加载
        extensions: ['.js', '.vue', ''],
        // 模块别名地址，方便后续直接引用别名，无须写长长的地址，注意如果后续不能识别该别名，需要先设置root
        alias:{
            "@":"./src/"
        },
        /*
        配置 Webpack 去哪些目录下寻找第三方模块，默认是只会去  node_modules  目录下寻找。 
        有时你的项目里会有一些模块会大量被其它模块依赖和导入，由于其它模块的位置分布不定，
        针对不同的文件都要去计算被导入模块文件的相对路径， 这个路径有时候会很长，就像这样  import '../../../components/button'  
        这时你可以利用  modules  配置项优化，假如那些被大量导入的模块都在  ./src/components  目录下，把  modules  配置成
        modules:['./src/components','node_modules']
        后，你可以简单通过  import 'button'  导入。
        */ 
        modules:['./src/components','node_modules']
    },    

    // 不进行打包的模块
    externals:{},

    // 模块加载器
    module: {
        // loader相当于gulp里的task，用来处理在入口文件中require的和其他方式引用进来的文件，test是正则表达式，匹配要处理的文件；loader匹配要使用的loader，"-loader"可以省略；include把要处理的目录包括进来，exclude排除不处理的目录       
        loaders: [
            //  使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/, 
                loader: 'vue-loader',
                exclude: /node_modules/    
            },
            // 使用babel 加载 .js 结尾的文件
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query:{
                    presets: ['es2015', 'stage-0'],  
                    plugins: ['transform-runtime']                      
                }
            }, 
            // 使用css-loader和style-loader 加载 .css 结尾的文件
            {  
                test: /\.css$/,                  
                // 将样式抽取出来为独立的文件
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader"),
                exclude: /node_modules/
            },         
            // 加载图片
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                query: {
                    // 把较小的图片转换成base64的字符串内嵌在生成的js文件里
                    limit: 10000,
                    // 路径要与当前配置文件下的publicPath相结合
                    name:'../img/[name].[ext]?[hash:7]'
                }
            },
            // 加载图标
            {
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                loader: 'file-loader',
                query: {               
                    // 把较小的图标转换成base64的字符串内嵌在生成的js文件里    
                    limit: 10000,
                    name:'../fonts/[name].[ext]?[hash:7]',
                    prefix:'font'
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },          
        ]         
    },

    // 配置插件项
    plugins: []  
}