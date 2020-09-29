// 设计模式
// 单例
// 普通实现
function Singleton(){
    this.instance = null;
}
Singleton.getInstance = function () {
    if(this.instance){
        return this.instance;
    }else {
        this.instance = new Singleton();
        return this.instance;
    }
}

// 闭包实现
function Singleton() {

}

Singleton.getInstance = (function () {
    let instance = null;
    return function () {
        if(instance){
            return instance
        }
        instance = new Singleton();
        return instance;
    }
})()

// 观察者
// 目标对象
var obj = {
    data: { list: [] },
}

Object.defineProperty(obj, 'list', {
    get() {
        return this.data['list']
    },
    set(val) {
        console.log('值被更改了')
        this.data['list'] = val
    }
})

// ------
var obj = {
    value: 0
}

// 发布/订阅
var Event = function() {
    this.obj = {}
}

Event.prototype.on = function(eventType, fn) {
    if (!this.obj[eventType]) {
        this.obj[eventType] = []
    }
    this.obj[eventType].push(fn)
}

Event.prototype.emit = function() {
    var eventType = Array.prototype.shift.call(arguments)
    var arr = this.obj[eventType]
    for (let i = 0; i < arr.length; i++) {
        arr[i].apply(arr[i], arguments)
    }
}

var ev = new Event()

ev.on('click', function(a) { // 订阅函数
    console.log(a) // 1
})

ev.emit('click', 1)          // 发布函数

// --------------------

// 手写promise
function Promise(fn,success) {
    let result = fn();
    if(result){
        return  callback();
    }else {
        
    }
}

// -------------------


// 原型继承


// 构造继承


// 防抖



// 节流


// 自定义事件

// 事件兼容

// 检测类型

// 函数柯里化


// 自定义异常


// 类型 检测

// sleep

// 执行一次的函数

// 深度克隆

// 代理 proxy

// Node Event 模块

