# js基础
1. let const var <br/>
+ let const 不存在变量提升
+ var声明的变量会挂到windows上，let const 不会
+ var是函数作用域，let const是代码块作用域
+ const 初始化的时候就要赋值，并且赋值之后不能被修改 对象 不能修改引用地址，引用属性可以修改

2. 箭头函数 
+ commonjs esmodule amd cmd umd  
AMD 推崇依赖前置、提前执行，CMD推崇依赖就近、延迟执行
```javascript

```
+ 深浅拷贝  对象直接赋值属于浅拷贝 他是把对象的引用地址给copy了 但是2个变量指的还是内存中的通一个对象
+ 防抖节流
+ promise
+ 闭包作用域
+ 手撕函数柯里化
+ 继承
+ babel
+ polyfill  babel-preset-env babel-transform-runtime
+ 发布订阅
+ 观察者
+ 数组常见方法 
+ new
+ 手撕call,apply,bind
+ generator next 实现
+ 随机数 范围 （star,end) => Math.random() * length + start;

# 浏览器
+ js内存
+ 浏览器垃圾回收
+ v8执行过程
+ event loop
+ 安全
+ 跨域
+ 缓存
+ url页面发生什么 https://blog.csdn.net/allenliu6/article/details/76609929
+ 浏览器组成

# http https
+ tcp三次握手 4次挥手
+ udp
+ tcp

# BOM
+ event
+ 浏览器可是区域
+ window
+ navigator
+ 存储

# DOM


# babel
+ babel包

# webpack
+ source-map
+ 包处理
+ 手撕代码
+ loader
+ 优化
+ eslint

# vue
+ 响应式
+ key
+ 观察者
+ vdom
+ diff
+ vue3

# css
+ 居中
+ flex
+ BFC https://blog.csdn.net/dff1993/article/details/80394150
+ 适配
+ css3
+ 兼容性问题
+ 优先级
+ 固定宽高比

# html5
+ 

# 算法

# 项目问题
Q: geoserver 中文乱码最后解决办法 
A: 字体文件缺少

Q: webpack 配置 publicPath的理解
A: publicPath的使用说法适用于生产环境,
默认情况下，webpack-dev-server 会把打包后的文件放到项目的根目录下，文件名是在output配置中的filename. 
但是当有publicPath 配置的时候，就不一样了。
Webpack 会把所有的文件打包到publicPath指定的目录下，
就是相当于在项目根目录下创建了一个publicPath目录, 然后把打包成的文件放到了它里面，只不过我们看不到而已, 
文件名还是output配置中的filename。

Q: 坐标系的理解，各个坐标系 之间的不同 
A:

Q: docker network
A: 



Q: Docker远程访问


