# vueUnitWebpack
基于Iview开发独立的Vue模块，能够作为独立的服务，也能作为模块，引入业务模块，作为插件调用,参考iview的message等组件
#
https://www.cnblogs.com/brandonhulala/p/6057378.html
  插件注释
    (1) autoprefixer-loader: 打包后自动补充浏览器的兼容性前缀和后缀（比如flexbox布局中的前后缀-webkit,-mos等）
    
    (2)extract-text-webpack-plugin:
    主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象。
    详细参考：https://blog.csdn.net/u010982507/article/details/81337529

#https://www.cnblogs.com/brandonhulala/p/6057378.html