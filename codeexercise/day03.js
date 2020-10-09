// 设计模式
// 工厂
class Person{
    constructor(name,age) {
        this.name = name;
        this.age = age;
    }
}

class Factory{
    constructor() {
    }
    ceatePerson(name,age){
        return new Person(name,age);
    }
}


// 单例
function Singleton() {

}
Singleton.getInstance = function () {
    let instance;
    return function () {
        if(instance) return instance;
        return new Singleton();
    }
}


// 适配器
// 为多个类提供统一的方法接口，解决兼容性问题
class Adapte{
    constructor() {
    }
    request(){
        // dosomething
    }
}

class Apdaptor {
    constructor(adapte) {
        this.adapte = adapte;
    }
    adapteRequest(){
        // ...
        this.adapte.request();
        // ....
    }
}

// 代理
// 为不能直接访问的类 提供访问 同时可以修改返回值什么的
class RealImage{
    constructor(width,height) {
        this.width = width;
        this.height = height;
    }
    loadImage(){}
    getWidth(){
        return this.width;
    }
    getHeight(){
        return this.height;
    }
    setWidth(width){
        this.width = width;
    }
    setHeight(height){
        this.height = height;
    }
}
class ProxyImage{
    constructor(realImage) {
        this.realImage = realImage;
    }
    getWidth(){
        return this.realImage.width + 1;
    }
    getHeight(){
        return this.realImage.height + 1;
    }
    setWidth(width){
        this.this.realImage = width + 1;
    }
    setHeight(height){
        this.this.realImage = height + 1;
    }
    loadImage() {
        this.realImage.loadImage();
    }
}


// 装饰器
//为对象添加属性和方法 不改变原来的结构
class A{
    
}

@attr1
class A{
}

function attr1() {
    A
}

// 观察者
class Subject{
    constructor() {
        this.observers = [];
        this.state = 0;
    }
    attachObserver(observer){
        this.observers.push(observer);
    }
    setState(state){
        this.state = state;
        this.notifyAll();
    }
    notifyAll(){
        this.observers.forEach(item=>{
            item.update();
        })
    }
}

class Observer{
    constructor(name,subject) {
        this.name = name;
        this.subject = subject;
        this.subject.attachObserver(this);
    }

    update(){
        consle.log(`${this.subject.state}`);
    }
}

let subject = new Subject();
let o1 = new Observer('o1',subject);
let o2 = new Observer('o2',subject);

subject.setState(2);

//  手写promise
let p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(1);
    },0)
})
class Promise{

    PENDING = 'pending';
    REJECT = 'reject';
    FULLID = 'fullid';

    constructor(excute) {
        this.state = PENDING;

        this.value = undefined;
        this.reason = undefined;
        this.onFullid = [];
        this.onReject = [];

        let _this = this;
        function resolve() {
            if(_this.state == PENDING){

                _this.state = FULLID;
                _this.value = arguments;

                if(_this.onFullid.length > 0){
                    _this.onFullid.forEach(item=>{
                        item(item.arguments);
                    })
                }
            }
        }
        function reject() {
            if(_this.state == PENDING){
                _this.state = REJECT;
                _this.resaon = arguments;

                if(_this.onReject.length > 0){
                    _this.onReject.forEach(item=>{
                        item(item.arguments);
                    })
                }
            }
        }

        try {
            excute(resolve,reject);
        }catch (e) {
            reject();
        }
    }

    then(onFullid,onReject){
        if(this.state == FULLID){
            this.value = onFullid(this.value);
            return this;
        }
        if(this.state == REJECT){
            this.value = onReject(this.value);
            return this;
        }

        if(this.state == PENDING){
            this.onFullid.push(onFullid);
            this.onReject.push(onReject);
        }

    }

    catch(onReject){
        onReject(this.reason);
        return this;
    }
}


// 防抖
function debounce(fn,delay) {
    let timer;
    return function () {
        let context = this;
        let args = arguments;
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(fn.call(context,args),delay);
    }
}

// 节流
function throllte(fn,delay) {
    let flag = false;
    let timer;
    return function () {
        let context = this;
        let args = arguments;
        if(!flag){
            timer = setTimeout(function () {
                flag = true;
                fn.call(context,args);
                clearTimeout(timer);
            },delay);
        }
    }
}



// 事件兼容



// 函数柯里化
let curry = (fn,arr=[]) => fn.length === arr.length ? fn(...arr) : arr => curry(fn,[arguments,...arr]);


// 类型检查
// typeof
// instance 原型链
// constructor


// sleep实现

 


// 自定义异常

 


// 手写proxy

 


// 深度克隆

 


// 手写NodeEvent

 
