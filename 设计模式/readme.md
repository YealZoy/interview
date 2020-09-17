# 单例模式
```javascript
const singleton = function(name) {
  this.name = name
  this.instance = null
}

singleton.prototype.getName = function() {
  console.log(this.name)
}

singleton.getInstance = function(name) {
  if (!this.instance) { // 关键语句
    this.instance = new singleton(name)
  }
  return this.instance
}

// test
const a = singleton.getInstance('a') // 通过 getInstance 来获取实例
const b = singleton.getInstance('b')
console.log(a === b)
```

# 发布/订阅模式
```javascript
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
```

# 观察者模式
```javascript
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

var proxy = new Proxy(obj, {
  set: function(target, key, value, receiver) { // {value: 0}  "value"  1  Proxy {value: 0}
    console.log('调用相应函数')
    Reflect.set(target, key, value, receiver)
  }
})

proxy.value = 1 // 调用相应函数
```