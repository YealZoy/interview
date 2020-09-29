# CommonJs
CommonJS是由JavaScript社区于2009年提出的包含模块、文件、IO、控制台在内的一系列标准。<br/>
现在一般谈到CommonJS其实是Node.js中的版本

## 导出
导出是一个模块向外暴露自身的唯一方式
```javascript
module.exports = {
    name: 'calculater',
    add(a,b){
        return a + b;
    }
}
```
CommonJS模块内部会有一个module对象用于存放当前模块的信息
```javascript
var module = {...};
// 模块自身逻辑
module.exports = {...};
```

## 导入
```javascript
// calculator.js
module.exports = {
    add: function(a, b) {return a + b;}
};
// index.js
const calculator = require('./calculator.js');
const sum = calculator.add(2, 3);
console.log(sum); // 5
```
当我们require一个模块时会有两种情况：
+ require的模块是第一次被加载。这时会首先执行该模块，然后导出内容。
+ require的模块曾被加载过。这时该模块的代码不会再次执行，而是直接导出上次执行后得到的结果。<br/>

模块会有一个module对象用来存放其信息，这个对象中有一个属性loaded用于记录该模块是否被加载过。
它的值默认为false，当模块第一次被加载和执行过后会置为true，
后面再次加载时检查到module.loaded为true，则不会再次执行模块代码。

# ESM
ES6 Module也是将每个文件作为一个模块，每个模块拥有自身的作用域，不同的是导入、导出语句。
```javascript
// calculator.js
export default {
    name: 'calculator',
    add: function(a, b) {
        return a + b;
    }
};

// index.js
import calculator from './calculator.js';
const sum = calculator.add(2, 3);
console.log(sum); // 5
```
ES6 Module会自动采用严格模式，这在ES5（ECMAScript 5.0）中是一个可选项。
以前我们可以通过选择是否在文件开始时加上“use strict”来控制严格模式，在ES6 Module中不管开头是否有“use strict”，都会采用严格模式。

## 导出
```javascript
// 写法1
export const name = 'calculator';
export const add = function(a, b) { return a + b; };

// 写法2
const name = 'calculator';
const add = function(a, b) { return a + b; };
export { name, add };
```

## 导入
```javascript
// calculator.js
const name = 'calculator';
const add = function(a, b) { return a + b; };
export { name, add };

// index.js
import { name, add } from './calculator.js';
add(2, 3);
```

## CommonJS与ES6区别
## 动态与静态
CommonJS与ES6 Module最本质的区别在于前者对模块依赖的解决是“动态的”，而后者是“静态的”。
在这里“动态”的含义是，模块依赖关系的建立发生在代码运行阶段；
而“静态”则是模块依赖关系的建立发生在代码编译阶段。

+ CommonJS中require的模块路径可以动态指定，支持传入一个表达式，我们甚至可以通过if语句判断是否加载某个模块
因此，在CommonJS模块被执行前，并没有办法确定明确的依赖关系，模块的导入、导出发生在代码的运行阶段。
+ ES6 Module的导入、导出语句都是声明式的，它不支持导入的路径是一个表达式，并且导入、导出语句必须位于模块的顶层作用域


## CommonJS
+ 对于基本数据类型，属于复制。即会被模块缓存。同时，在另一个模块可以对该模块输出的变量重新赋值。
+ 对于复杂数据类型，属于浅拷贝。由于两个模块引用的对象指向同一个内存空间，因此对该模块的值做修改时会影响另一个模块
+ 当使用require命令加载某个模块时，就会运行整个模块的代码。
+ 当使用require命令加载同一个模块时，不会再执行该模块，而是取到缓存之中的值。也就是说，CommonJS模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。
+ 循环加载时，属于加载时执行。即脚本代码在require的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。

## ES6
+ ES6模块中的值属于【动态只读引用】。
+ 对于只读来说，即不允许修改引入变量的值，import的变量是只读的，不论是基本数据类型还是复杂数据类型。当模块遇到import命令时，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。
+ 对于动态来说，原始值发生变化，import加载的值也会发生变化。不论是基本数据类型还是复杂数据类型。
+ 循环加载时，ES6模块是动态引用。只要两个模块之间存在某个引用，代码就能够执行。

# AMD
规范代表库：require.js <br/>
AMD采用异步方式加载模块，模块的加载不影响它后面语句的运行。
所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。

## 模块定义与使用
```javascript
// 定义一个模块
define('module', ['dep'], function (dep) {
  return exports;
});

// id  可选参数，用来定义模块的标识，如果没有提供该参数，默认脚本文件名（去掉拓展名）

// dependencies 是一个当前模块用来的模块名称数组,(所依赖模块的数组)

// factory 工厂方法，模块初始化要执行的函数或对象，如果为函数，它应该只被执行一次，如果是对象，此对象应该为模块的输出值。



//导入和使用模块
require([module], callback);
 
// 第二个参数[module]，是一个数组，里面的成员就是要加载的模块；

// 第二个参数callback，则是加载成功之后的回调函数

// 等到前面的module加载完成之后，这个回调函数才被调用。
// 加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块
```

# CMD
```javascript
//定义没有依赖的模块
define(function(require, exports, module){
  exports.xxx = value
  module.exports = value
})

//定义有依赖的模块
define(function(require, exports, module){
  //引入依赖模块(同步)
  var module2 = require('./module2')
  //引入依赖模块(异步)
    require.async('./module3', function (m3) {
    })
  //暴露模块
  exports.xxx = value
})

define(function (require) {
  var m1 = require('./module1')
  var m4 = require('./module4')
  m1.show()
  m4.show()
})


```