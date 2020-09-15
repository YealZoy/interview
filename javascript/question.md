# 思维导图
![](image/dom.png)

# EventTarget
DOM 的事件操作（监听和触发），都定义在EventTarget接口。
所有节点对象都部署了这个接口，其他一些需要事件通信的浏览器内置对象 <br/>

该接口主要提供三个实例方法。
+ addEventListener：绑定事件的监听函数
+ removeEventListener：移除事件的监听函数
+ dispatchEvent：触发事件

# 介绍DOM事件级别？
```javascript
// DOM0
element.onclick = function () {}

//------------------------------------------
// DOM2
element.addEventListener('click', function () {
    //false冒泡阶段，true捕获阶段
}, false); 

//------------------------------------------
// DOM3(增加了事件类型)
element.addEventListener('keyup', function () {

}, false);

```

# 请封装事件监听和解绑的兼容写法？
```javascript
var myEventUtil = {
    addEvent : function (ele,event,func) {
        //用能力检测进行跨浏览器兼容处理
        if(ele.addEventListener) {
            //false表示冒泡事件模型
            ele.addEventListener(event,func,false);
        }else if(ele.attachEvent){
            ele.attachEvent('on'+event,func);
        }else{
            ele['on'+event]=func;
        }
    },
    delEvent : function (ele,event,func) {
        if(ele.removeEventListener){
            ele.removeEventListener(event,func,false);
        }else if(ele.detachEvent){
            ele.detachEvent('on'+event,func);//IE
        }else {
            ele['on'+event]=null;
        }
    }
}
```

# 介绍下事件模型？
捕获、冒泡

# 介绍下事件流？
+ 定义：用户与浏览器当前页面的交互过程
+ 三个阶段：捕获阶段、目标阶段、冒泡阶段

# DOM事件捕获的具体流程是怎样的？
window => document => html => body => ... => 目标元素

# Event 对象有哪些常用应用？
事件发生以后，会产生一个事件对象，作为参数传给监听函数。
+ 阻止默认事件：event.preventDefault()
+ 阻止冒泡：event.stopPropagation()
+ 阻止调用相同事件的其他侦听器(事件响应优先级)：event.stopImmediatePropagation()
+ 当前绑定事件的元素：event.currentTarget
+ 当前被点击的元素：event.target

# 如何自定义事件？
```javascript
var event = new Event('custome');
dom.addEventListener('custome', funcion () {});
dom.dispatchEvent(event);
```

