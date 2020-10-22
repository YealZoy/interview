# js基础
1.let const var <br/>
+ let const 不存在变量提升
+ var声明的变量会挂到windows上，let const 不会
+ var是函数作用域，let const是代码块作用域
+ const 初始化的时候就要赋值，并且赋值之后不能被修改 对象 不能修改引用地址，引用属性可以修改

2.箭头函数 <br/>
+ 没有自己的this和arguments
+ 没有prototype
+ 不能被new,因为new之后 实例对象会有一个__proto__属性指向prototype 而箭头函数没有prototyoe
+ 不能作为构造函数

3.commonjs esmodule amd cmd umd  
+ commonjs 是nodejs加载模块使用的规范，浏览器不支持
+ esmodule是es6+ 模块机制 可以在浏览器端运行的
+ 浏览器端实现模块机制以前esmodule不兼容的时候出现过amd,cmd
+ cmd是阿里玉伯实现的seajs 现在用的很少了
+ amd是requirejs define(id?, dependencies?, factory)
+ AMD 推崇依赖前置、提前执行，CMD推崇依赖就近、延迟执行 define(function (require, exports, module){})
```javascript
// model1.js
define(function () {
    console.log('model1 entry');
    return {
        getHello: function () {
            return 'model1';
        }
    };
});

// model2.js
define(function () {
    console.log('model2 entry');
    return {
        getHello: function () {
            return 'model2';
        }
    };
});

// main.js
define(function (require) {
    var model1 = require('./model1');
    console.log(model1.getHello());
    var model2 = require('./model2');
    console.log(model2.getHello());
});


//AMD 运行结果 
// model1 entry
// model2 entry
// model1
// model2

// CMD运行结果
// 输出 
// model1 entry
// model1
// model2 entry
// model2
```
+ commonjs可动态导入，esmodule静态导入
+ commonjs导入的值是拷贝，如果原始值发生变化，需再次重新导入
+ esmodule导入的值是引用，原模块修改数据，导入的数据也会修改，导入之后只读，不能被修改


4.深浅拷贝  
+ 对象直接赋值属于浅拷贝 他是把对象的引用地址给copy了 但是2个变量指的还是内存中的通一个对象
```javascript
function deepClone(obj){
    let result = Array.isArray(obj) ? [] : {};
    for(let key in obj){
        if(typeof obj[key] === 'object'){
            result[key] = deepClone(obj[key])
        }else {
            result[key] = obj[key];
        }
    }
    return result;
}
```

5.防抖节流
```javascript
// 防抖
function debounces(func,delay) {
  let timer;
  return function() {
    let context = _this;
    let args = func.arguments;
    if(!timer){
        timer = setTimeout(func.call(_this,args),delay)
    }else{
        clearTimeout(timer);
        timer = null;
    }
  }
}


//节流
function throolte(func,delay) {
  let timer;
  let flag = false;
  return function() {
    let context = _this;
    let args = func.arguments;
    if(!flag){
        flag = true;
        timer = setTimeout(()=>{
            func.call(_this,args);
            flag = false;
        },delay);
    }
  }
}
```
6.promise
+ promise 有 3 种状态：pending、fulfilled 或 rejected。
状态改变只能是 pending->fulfilled 或者 pending->rejected，状态一旦改变则不能再变
+ Promise.then() 之后返回的是一个新的promise
+ 构造函数中的 resolve 或 reject 只有第一次执行有效，多次调用没有任何作用
+ .then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。
```javascript
let p = new Promise((resolve,reject)=>{
    reslove();
})
function Promise(excute) {
    //PENDING REJECT FULFILLED
  this.state = 'PENDING';
  let _this = this;
  this.value = null;
  this.reason = null;
  this.fulfilled = [];
  this.rejected = [];
  function reslove() {
    this.value = arguments;
    if(_this.state == 'PENDING'){
        _this.state = 'FULFILLED';
       _this.fulfilled.forEach(item=>{
           item();
       })
    }
  }
  function reject() {
    this.reason = arguments
    _this.state = 'REJECT';
    if(_this.rejected.length > 0){
        _this.rejected.forEach(item=>{
            item();
        })
    }  
  }
    
  try{
    excute(reslove,reject);
  }catch (e) {
    reject(e)
  }

}

Promise.prototype.then = function(func,func2) {
  if(this.state == 'PENDING'){
    this.fulfilled.push(func);
    this.rejected.push(func2);
  }
  if(this.state == 'FULFILLED'){
    this.value = func(func.arguments);
  }
  
  if(this.state == 'REJECT'){
    this.value = func2(func.arguments);
  }

  
}
```

7.闭包作用域 <br/>
8.手撕函数柯里化<br/>
```javascript
let curry = (func,args=[]) => func.length === args.length ? func(args) : args => curry(func,[arguments,...args]); 
```

9.继承
+ extends super
+ prototype
+ call,apply

10.babel 语法兼容
+ babel core 转ast
+ babel-traverse 遍历
+ 生成新的Ast
+ 生成新的代码

11.polyfill 方法兼容
  babel-preset-env 
  babel-transform-runtime 按需加入

12.发布订阅

13.观察者

14.数组常见方法 

15.new
+ 创建空对象{}
+ {}.prototype 指向构造函数的prototype
+ this={}
+ 执行构造函数



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


