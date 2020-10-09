# 设计模式
## 工厂
```javascript
class Person{
    constructor(name) {
        this.name = name;
    }
}

class Factory{
    constructor() {}
    createPerson(name){
        return new Person(name);   
    }    
}
```

## 单例
```javascript
class Singleton{
    constructor(name) {
        this.name = name;
    }
}
Singleton.getInstance = (function(name) {
  let instance;
  return function() {
    if(instance){
        return instance;
    }
    return new Singleton(name);
  }
})()
```

## 适配器
```javascript
class Adapte{
    constructor() {}
    request(){}
}
class Adaptor{
    constructor(adapte) {
        this.adapte = adapte;
    }
    requestA(){
        // ---- somecode
        this.adapte.request();
        // ----some code
    }
}

```

## 代理
```javascript
class RealImage{
    
    constructor(width,height) {
        this.width = width;
        this.height = height;
    }
    
    load(){}
}
class ProxyImage{
    constructor(width,height) {
        this.RealImage = new RealImage(width,height);
    }
    
    getWidth(){
       return this.RealImage.width;
    }
}


 
```

## 装饰器
```javascript

 
```

## 观察者
```javascript
class Subject{
    constructor(name) {
        this.name = name;
        this.observers = [];
        this.state = 0;
    }
    getState(){
        return this.state;
    }
    
    setState(state){
        this.state = state;
        this.notifyAll();
    }
    notifyAll(){
        this.observers.forEach(item => {
            item.update();
        })
    }
    attach(observer){
        this.observers.push(observer);
    }
}
class Observer{
    constructor(name,subject) {
        this.name = name;
        this.subject = subject;
        this.subject.attach(this);
    }
    update(){
        console.log(`subject状态发生变化了`);
    }   

}

let s = new Subject('1');
let o = new Observer('1',s);
s.setState(1);
```

#  手写promise
```javascript
let p = new Promise(reslove,reject=>{
    if(true){
        reslove();
    }
    reject();
});


class MyPromise{
    PENDING = 'pending'
    FULFILLED = 'fulfilled'
    REJECTED = 'rejected'
    constructor(fu) {
        this.state = PENDING;
        this.excute = fu;
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilled = [];
        this.onRejected = [];
        let _this = this;
        function reslove(value){
            if(_this.state == PENDING){
                _this.value = value;
                _this.state == FULFILLED;
                
                if(this.onFulfilled.length > 0){
                    _this.onFulfilled.forEach(fn => fn(value))
                }   

            }            
        };
        function reject(reason){
            if(_this.state == PENDING){
                _this.reason = reason;
                _this.state == REJECTED;
                
                if(this.onRejected.length > 0){
                    _this.onRejected.forEach(fn => fn(value))
                }  

            }   
        };
        try {
          fu(reslove,reject);
        }catch (e) {
          reject(this.reason)
        }
    }
    
    then(onFulfilled,onRejected){
       if(this.state == FULFILLED){
            //this.value = fu.arguments;
            this.value = onFulfilled(this.value);
            return this;
       }else if(this.state == REJECTED){
            onRejected(this.reason);
       }else if(this.state == PENDING){
            this.onFulfilled.push(onFulfilled);
            this.onRejected.push(onRejected);
            return this;
       }
    }
    
    catch(error){
        throw new Error(error);
        return this;
    }
}
```

# 防抖
```javascript
function debounce(fn,wait) {
  let timer;
  let args = arguments;
  let context = this;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.call(context,args);
    },wait);
  }
}
```

# 节流
```javascript
function throllte(fn,wait) {
  let args = arguments;
  let context = this;
  let prev = 0;
  return function() {
    let now = +new Date();
    if(now - prev >= wait){
        fn.call(context,args);
        prev = now;
    }
  }
}
 
```

# 事件兼容
```javascript
 function addEvent(type,fn,mp){
    if(window.addEventListener){
        return window.addEventListener(type,fn,mp)
    }
    if(Window.attachEvent){
        // type + on
        return window.attachEvent('on'+ type,fn);
    }
 }
```

# 函数柯里化
```javascript
var curry = fn =>
    judge = (...args) =>
        args.length === fn.length? fn(...args): (...arg) => judge(...args, ...arg)
```

# 类型检查
```javascript
 
```

# sleep实现
```javascript
 
```

# 自定义异常
```javascript
function MyException(name,msg) {
  this.name = name;
  this.msg = msg;
}
MyException.prototype = new Error();
MyException.constructor = MyException;
```

# 深度克隆
```javascript

```

# 手写NodeEvent
```javascript
 
```