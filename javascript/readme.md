# 数据类型
Number 类型 <br/>
BigInt 类型 <br/>
String 类型 <br/>
Boolean 类型（逻辑类型）<br/>
Null  => typeof null 为 object <br/>
Undefined <br/>
Object => typeof function  为function <br/>
Symble <br/>

# 代码风格


# polyfill

# 对象拷贝，引用
```javascript
let user = { name: 'John' };

let admin = user;

admin.name = 'Pete'; // 通过 "admin" 引用来修改

alert(user.name); // 'Pete'，修改能通过 "user" 引用看到


let a = {};
let b = a; // 拷贝引用

alert( a == b ); // true，都引用同一对象
alert( a === b ); // true
```

# 克隆与合并，Object.assign
```javascript
let user = {
  name: "John",
  age: 30
};

let clone = {}; // 新的空对象

// 将 user 中所有的属性拷贝到其中
for (let key in user) {
  clone[key] = user[key];
}

// 现在 clone 是带有相同内容的完全独立的对象
clone.name = "Pete"; // 改变了其中的数据

alert( user.name ); // 原来的对象中的 name 属性依然是 John


// Object.assign(dest, [src1, src2, src3...])
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// 将 permissions1 和 permissions2 中的所有属性都拷贝到 user 中
Object.assign(user, permissions1, permissions2);

// 现在 user = { name: "John", canView: true, canEdit: true }
```

# 深层克隆
```javascript
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // true，同一个对象

// user 和 clone 分享同一个 sizes
user.sizes.width++;       // 通过其中一个改变属性值
alert(clone.sizes.width); // 51，能从另外一个看到变更的结果
```

#  箭头函数 this

#  symble

# Iterable object（可迭代对象）

# Map
它的方法和属性如下：
+ new Map() —— 创建 map。
+ map.set(key, value) —— 根据键存储值。
+ map.get(key) —— 根据键来返回值，如果 map 中不存在对应的 key，则返回 undefined。
+ map.has(key) —— 如果 key 存在则返回 true，否则返回 false。
+ map.delete(key) —— 删除指定键的值。
+ map.clear() —— 清空 map。
+ map.size —— 返回当前元素个数。

## Map 迭代
如果要在 map 里使用循环，可以使用以下三个方法：
map.keys() —— 遍历并返回所有的键（returns an iterable for keys），
map.values() —— 遍历并返回所有的值（returns an iterable for values），
map.entries() —— 遍历并返回所有的实体（returns an iterable for entries）[key, value]，for..of
```javascript
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// 遍历所有的键（vegetables）
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// 遍历所有的值（amounts）
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// 遍历所有的实体 [key, value]
for (let entry of recipeMap) { // 与 recipeMap.entries() 相同
  alert(entry); // cucumber,500 (and so on)
}
```

# Set
Set 是一个特殊的类型集合 —— “值的集合”（没有键），它的每一个值只能出现一次。<br/>
它的主要方法如下：<br/>
+ new Set(iterable) —— 创建一个 set，如果提供了一个 iterable 对象（通常是数组），将会从数组里面复制值到 set 中。
+ set.add(value) —— 添加一个值，返回 set 本身
+ set.delete(value) —— 删除值，如果 value 在这个方法调用的时候存在则返回 true ，否则返回 false。
+ set.has(value) —— 如果 value 在 set 中，返回 true，否则返回 false。
+ set.clear() —— 清空 set。
+ set.size —— 返回元素个数。
 
## Set 迭代（iteration）
```javascript
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// 与 forEach 相同：
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

# WeakMap and WeakSet（弱映射和弱集合）

# Rest 参数与 Spread 语法

# 装饰者模式和转发，call/apply

# this

# 对象属性配置

# 原型，继承

# 类
私有属性 方法

# Promise，async/await

# 模块

# 性能优化

# 打包

# vue

# react

# css

# Dom