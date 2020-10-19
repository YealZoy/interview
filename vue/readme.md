# 数组更新检测
Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：
+ push()
+ pop()
+ shift()
+ unshift()
+ splice()
+ sort()
+ reverse()

# 事件修饰符
在事件处理程序中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。
尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。
为了解决这个问题，Vue.js 为 v-on 提供了事件修饰符。之前提过，修饰符是由点开头的指令后缀来表示的。
+ .stop
+ .prevent
+ .capture
+ .self
+ .once
+ .passive
```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

# 按键修饰符
```html
<input v-on:keyup.enter="submit">
```

# 源码分析
## flow
Flow 是 facebook 出品的 JavaScript 静态类型检查工具。Vue.js 的源码利用了 Flow 做了静态类型检查


## Vue.js 源码目录设计
```
src
├── compiler        # 编译相关 它包括把模板解析成 ast 语法树，ast 语法树优化，代码生成等功能
├── core            # 核心代码  包括内置组件、全局 API 封装，Vue 实例化、观察者、虚拟 DOM、工具函数等等。
├── platforms       # 不同平台的支持 Vue.js 是一个跨平台的 MVVM 框架，它可以跑在 web 上，也可以配合 weex 跑在 native 客户端上。platform 是 Vue.js 的入口，2 个目录代表 2 个主要入口，分别打包成运行在 web 上和 weex 上的 Vue.js。
├── server          # 服务端渲染 Vue.js 2.0 支持了服务端渲染，所有服务端渲染相关的逻辑都在这个目录下
├── sfc             # .vue 文件解析 通常我们开发 Vue.js 都会借助 webpack 构建， 然后通过 .vue 单文件来编写组件
├── shared          # 共享代码
```


[参考文档](https://ustbhuangyi.github.io/vue-analysis/v2/prepare/)
[参考文档](https://www.vue-js.com/learn-vue/start/)

# 面试
[https://juejin.im/post/6844904084374290446](https://juejin.im/post/6844904084374290446)