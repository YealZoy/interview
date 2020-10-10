# 代码层面优化
+ 代码编写规范
+ 目录与模块文件命名 
+ 代码编写规范
   + BEM
+ 注释方式
    + jsdoc 
+ Request工具更高效封装
    针对axios进行了更高效的封装，
    比如设置了拦截器，在数据请求回来后就可以根据请求结果的状态进行失败处理等等。
+ 目录结构整理
+ Mock数据配置
+ 路由采用懒加载
+ script懒加载 script sync defere
+ 第三方插件按需引入
+ 图片资源懒加载
    + vue-lazyload 
+ 事件的销毁
    + beforeDestroy

# webpack打包方面优化
+ 开启多线程打包
    + thread-loader
+ 优化loader配置
    + 通过cacheDirectory选项开启缓存
    + 通过include、exclude来减少被处理的文件。实践如下
+ dll
    + DllPlugin
    + DllReferencePlugin
+ SourceMap
    + 开发环境推荐： cheap-module-eval-source-map
    + 生产环境推荐： cheap-module-source-map
+ html,js,css压缩 开启gzip
    + js webpack 生产环境自带压缩 babel-loader
    + css mini-css-extract-plugin OptimizeCssAssetsWebpackPlugin
    + html-webpack-plugin 做一些配置
    + image 压缩 
    + 其他文件压缩

