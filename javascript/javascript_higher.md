# 作用域和闭包
## 编译原理
+ 分词/词法分析 <br/>
这个过程会将由字符组成的字符串分解成（对编程语言来说）有意义的代码块，这些代
码块被称为词法单元（token）。例如，考虑程序var a = 2;。这段程序通常会被分解成
为下面这些词法单元：var、a、=、2 、;。空格是否会被当作词法单元，取决于空格在
这门语言中是否具有意义。

+ 解析/语法分析 <br/>
这个过程是将词法单元流（数组）转换成一个由元素逐级嵌套所组成的代表了程序语法
结构的树。这个树被称为“抽象语法树”（Abstract Syntax Tree，AST）

+ 代码生成 <br/>
将AST 转换为可执行代码的过程称被称为代码生成。这个过程与语言、目标平台等息
息相关。

# 动态语言
静态类型语言在编译时便已确定变量的类型，
而动态类型语言的变量类型要到程序运行的时
候，待变量被赋予某个值之后，才会具有某种类型。

# 多态
同一操作作用于不同的对象上面，可以产生不同的解释和不同的执行结果。
换句话说，给不同的对象发送同一个消息的时候，这些对象会根据这个消息分别给出不同的反馈。
```javascript
var makeSound = function( animal ){
animal.sound();
};

var Duck = function(){}
Duck.prototype.sound = function(){
console.log( '嘎嘎嘎' );
};
var Chicken = function(){}
Chicken.prototype.sound = function(){
console.log( '咯咯咯' );
};
makeSound( new Duck() ); // 嘎嘎嘎
makeSound( new Chicken() ); // 咯咯咯
```
#  闭包和高阶函数
```javascript
var func = function(){
    var a = 1;
    return function(){
        a++;
        alert ( a );
    }
}
var f = func();
f(); // 输出：2
f(); // 输出：3
f(); // 输出：4
f(); // 输出：5
```

## 高阶函数
高阶函数是指至少满足下列条件之一的函数。
+ 函数可以作为参数被传递；
+ 函数可以作为返回值输出。

### 高阶函数实现AOP
```javascript
Function.prototype.before = function( beforefn ){
    var __self = this; // 保存原函数的引用
    return function(){ // 返回包含了原函数和新函数的"代理"函数
        beforefn.apply( this, arguments ); // 执行新函数，修正this
        return __self.apply( this, arguments ); // 执行原函数
    }
};
Function.prototype.after = function( afterfn ){
    var __self = this;
    return function(){
        var ret = __self.apply( this, arguments );
        afterfn.apply( this, arguments );
        return ret;
    }
};
var func = function(){
console.log( 2 );
};
func = func.before(function(){
console.log( 1 );
}).after(function(){
console.log( 3 );
});
func();
```

### 函数柯里化
currying 又称部分求值。一个currying 的函数首先会接受一些参数，接受了这些参数之后，
该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保
存起来。待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。
```javascript
var monthlyCost = 0;
var cost = function( money ){
    monthlyCost += money;
};
cost( 100 ); // 第1 天开销
cost( 200 ); // 第2 天开销
cost( 300 ); // 第3 天开销
//cost( 700 ); // 第30 天开销
alert ( monthlyCost ); // 输出：600


//---------------

var currying = function( fn ){
    var args = [];
    return function(){
        if ( arguments.length === 0 ){
            return fn.apply( this, args );
        }else{
            [].push.apply( args, arguments );
            return arguments.callee;
        }
    }
};
var cost = (function(){
    var money = 0;
    return function(){
        for ( var i = 0, l = arguments.length; i < l; i++ ){
            money += arguments[ i ];
        }   
        return money;
    }
})();
var cost = currying( cost ); // 转化成currying 函数
cost( 100 ); // 未真正求值
cost( 200 ); // 未真正求值
cost( 300 ); // 未真正求值
alert ( cost() ); // 求值并输出：600
```

### 函数节流
函数被触发的频率太高,比如window.resize
```javascript
var throttle = function ( fn, interval ) {
    var __self = fn, // 保存需要被延迟执行的函数引用
    timer, // 定时器
    firstTime = true; // 是否是第一次调用
    return function () {
        var args = arguments,
        __me = this;
        if ( firstTime ) { // 如果是第一次调用，不需延迟执行
            __self.apply(__me, args);
            return firstTime = false;
        }
        if ( timer ) { // 如果定时器还在，说明前一次延迟执行还没有完成
            return false;
        }
        timer = setTimeout(function () { // 延迟一段时间执行
            clearTimeout(timer);
            timer = null;
            __self.apply(__me, args);
        }, interval || 500 );
    };
};
window.onresize = throttle(function(){
console.log( 1 );
}, 500 );
```

### 分时函数
操作过多 分批进行 每隔 多少秒 接着执行 
```javascript
var timeChunk = function( ary, fn, count ){
    var obj,
        t;
    var len = ary.length;
    var start = function(){
        for ( var i = 0; i < Math.min( count || 1, ary.length ); i++ ){
            var obj = ary.shift();
            fn( obj );
        }
    };
    return function(){
        t = setInterval(function(){
            if ( ary.length === 0 ){ // 如果全部节点都已经被创建好
                return clearInterval( t );
            }
            start();
        }, 200 ); // 分批执行的时间间隔，也可以用参数的形式传入
    };
};
```

# 单例模式
单例模式的定义是：保证一个类仅有一个实例，并提供一个访问它的全局访问点。
```javascript
var Singleton = function( name ){
    this.name = name;
    this.instance = null;
};
Singleton.prototype.getName = function(){
    alert ( this.name );
};
Singleton.getInstance = function( name ){
    if ( !this.instance ){
        this.instance = new Singleton( name );
    }
    return this.instance;
};
var a = Singleton.getInstance( 'sven1' );
var b = Singleton.getInstance( 'sven2' );
alert ( a === b ); // true




//-----------

var Singleton = function( name ){
    this.name = name;
};
Singleton.prototype.getName = function(){
    alert ( this.name );
};
Singleton.getInstance = (function(){
    var instance = null;
    return function( name ){
        if ( !instance ){
            instance = new Singleton( name );
        }
        return instance;
    }
})();

var a = Singleton.getInstance( 'sven1' );
var b = Singleton.getInstance( 'sven2' );
alert ( a === b ); // true
```