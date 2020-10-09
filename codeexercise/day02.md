# 设计模式
## 工厂
```javascript
class Person{
    constructor(name,age) {
        this.name = name;
        this.age = age;
    }
}

class Factory{
    constructor() {}
    createPerson(name,age){
        return new Person(name,age);
    }
}
```

## 单例
```javascript
class Singleton{
    constructor() {}
}

Singleton.getInstance = (function() {
  let instance;
  return function() {
    if(instance){
        return instance
    }
    instance = new Singleton();
    return instance;
  }
})()
```

## 适配器
```javascript
// 一个类为多个类提供统一的方法，从而解决接口不兼容的问题
class Adapte{
    constructor() {}
    request(){}
}
class Adaptor{
    constructor() {}
    adrequest(){}
}
```

## 代理
```javascript
class RealImage{
    constructor(width,height) {}
    load(){}
}
class ProxyImage{
    constructor(realImage) {}
    load(){}
}
```

## 装饰器
```javascript
// 给对象添加属性和方法 不改变原有的结构流程

@addAttr
class B{
    
}
function addAttr(target) {
  
}

 
```

## 观察者
```javascript
class Subject{
    constructor(name) {
        this.name = name;
        this.observers = [];
        this.state = 0;
    }
    getState(){return this.state}
    setState(state){
        this.state = state;
        notifyAll();
    }
    notifyAll(){
        this.observers.forEach(item=>{
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
    update(){}
}
```

#  手写promise
```javascript
class Promise{

    PENDING = 'pending';
    FULLID = 'fullid';
    REJECT = 'reject';

    constructor(excuteor) {

        this.state = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onFullid = [];
        thiis.onReject = [];
        
        let _this = this;

        function resolve() {
            if(this.state == PENDING){
                this.state = FULLID;
                this.value = arguments;
                if(this.onFullid.length > 0){
                    this.onFullid.forEach(item=>{
                        _this.value = item(_this.value);
                    })
                }   
            }
                  
            
        }
        
        function reject(){
            if(this.state == PENDING){
                this.state = reject;
                this.reason = arguments;
                
                if(this.onReject.length > 0){
                    this.onReject.forEach(item=>{
                        _this.value = item(_this.value);
                    })
                }  
            }
            

            
        }   
        
        try {
          excuteor(resolve,reject)
        }catch (e) {
          reject(e)
        }


    }
    
    then(onFullid,onReject){
        if(this.state == FULLID){
            this.value = onFullid(this.value);
            return this;
        }else if(this.state == REJECT){
            onReject(this.reason);
            return ;
        }else if(this.state == PENDING){
            this.onFullid.push(onFullid);
            this.onReject.push(onReject);
            return this;
        }
    }
    
    catch(errorFun){
        errorFun(this.reason);
    }

}
```

# 防抖
```javascript
function debounce(func,delay) {
    let timer;
    return function(){
        let context = this;
        let args = func.arguments;
        clearTimeout(timer);
        timer = setTimeout(func.call(context,args),delay);
    }
}
```

# 节流
```javascript
function throllte(func,delay){
    let flag = true;
    return function() {
        if(!flag){
            return false;
        }
        let context = this;
        let args = func.arguments;
        flag = false;
        setTimeout(function() {
            flag = true;
            func.call(context,args);
        },delay)
    }
}
```

# 事件兼容
```javascript
let eventUtil = {
    addEvent: function(type,listen,b) {
      
    }
}
```

# 函数柯里化
```javascript
let curry = (fn,arr=[]) => 
    fn.length === arr.length ? fn.apply(...arr) : arr => curry(fn,[arguments,...arr]);
```

# 类型检查
```javascript
 
```

# sleep实现
```javascript
 
```

# 自定义异常
```javascript
 
```

# 手写proxy
```javascript
 
```

# 深度克隆
```javascript
 
```

# 手写NodeEvent
```javascript
 
```