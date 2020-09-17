# babel
Babel 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码，从而在老版本的浏览器执行。

# polyfill
Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API，
比如Iterator、Generator、Set、Map、Proxy、Reflect、Symbol、Promise等全局对象，
以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。

# let
let声明的变量只在它所在的代码块有效。<br/>
for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
```javascript
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
```

不存在变量提升 

```javascript
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

# 数组的解构赋值 
```javascript
// 以前，为变量赋值，只能直接指定值。

let a = 1;
let b = 2;
let c = 3;
// ES6 允许写成下面这样。

let [a, b, c] = [1, 2, 3];


// 如果解构不成功，变量的值就等于undefined。

let [foo] = [];
let [bar, foo] = [1];
//以上两种情况都属于解构不成功，foo的值都会等于undefined。

// 另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。

let [x, y] = [1, 2, 3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
```

## 默认值
解构赋值允许指定默认值。
```javascript
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```

注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。
所以，只有当一个数组成员严格等于undefined，默认值才会生效

```javascript
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null
```

## 对象的解构赋值
如果变量名与属性名不一致，必须写成下面这样。
```javascript
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'word
```


# 函数参数的默认值
```javascript
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
```

# promise
```javascript
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (success){ // 异步成功
    resolve(value);
  } else {
    reject(error);
  }
});

promise.then(function(value) {
  // success
}, function(error) {
  // failure
});


function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}

timeout(100).then((value) => {
  console.log(value);
});
```

# Iterator

Iterator 的作用有三个：<br/>
一是为各种数据结构，提供一个统一的、简便的访问接口；
二是使得数据结构的成员能够按某种次序排列；
三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。<br/>
Iterator 的遍历过程是这样的。

+（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

+（2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。

+（3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。

+（4）不断调用指针对象的next方法，直到它指向数据结构的结束位置

```javascript
//声明一个对象
        const banji = {
            name: "终极一班",
            stus: [
                'xiaoming',
                'xiaoning',
                'xiaotian',
                'knight'
            ],
            [Symbol.iterator]() {
                //索引变量
                let index = 0;
                //
                let _this = this;
                return {
                    next: function () {
                        if (index < _this.stus.length) {
                            const result = { value: _this.stus[index], done: false };
                            //下标自增
                            index++;
                            //返回结果
                            return result;
                        }else{
                            return {value: undefined, done: true};
                        }
                    }
                };
            }
        }

```

# Generator
执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，
还是一个遍历器对象生成函数。
返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。<br/>

异步调用 <br/>

形式上，Generator 函数是一个普通函数，但是有两个特征。
一是，function关键字与函数名之间有一个星号；
二是，函数体内部使用yield表达式，定义不同的内部状态 <br/>

```javascript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();

hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数。<br/>
函数f如果是普通函数，在为变量generator赋值时就会执行。
但是，函数f是一个 Generator 函数，就变成只有调用next方法时，函数f才会执行。
```javascript
function* f() {
  console.log('执行了！')
}

var generator = f();

setTimeout(function () {
  generator.next()
}, 2000);


//----

var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function* (a) {
  var length = a.length;
  for (var i = 0; i < length; i++) {
    var item = a[i];
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  }
};


// flat(arr) 返回generator ,generator 有自己的 iterable 所以输出的是 。。。。
for (var f of flat(arr)) {
  console.log(f);
}
```

## next 方法的参数
yield表达式本身没有返回值，或者说总是返回undefined。
next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。<br/>
注意，由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的。
```javascript
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```

# async
async函数返回一个 Promise 对象，可以使用then方法添加回调函数。
当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

```javascript
async function test (){

    //  等待状态改变,自动执行到下一个wait处
 var flag =  await  new Promise((resolve,reject)=>{
    
            setTimeout(function(){
            
            // 状态改变
            resolve(data); //这里面的值传递给flag
            },1000)
   })
   //通过flag传递数据
 flag =  await  new Promise((resolve,reject)=>{
    
            setTimeout(function(flag){
            
            // 状态改变
            resolve(flag);
            },1000,flag)
   })
}

test().catch(function(err){
        //处理异常
});
```

# class
构造函数的prototype属性，在 ES6 的“类”上面继续存在。
事实上，类的所有方法都定义在类的prototype属性上面。<br/>

由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。
Object.assign方法可以很方便地一次向类添加多个方法。<br/>

另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）。
```javascript
class Point {
  constructor(){
    // ...
  }
}

Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
```
## 静态属性方法与实例属性方法
```javascript
// 老写法
class Foo {
  // ...
}
Foo.prop = 1;

// 新写法
class Foo {
  static prop = 1;
}

//---------
class Phone{
    //静态属性
    static name = '手机';
    static change(){
        console.log("我可以改变世界");
    }
}

let nokia = new Phone();
console.log(nokia.name); // undefined
console.log(Phone.name); // 手机
```

# Module