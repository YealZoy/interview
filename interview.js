
/**
 * 1.	给Object扩展一个方法clone，实现深度克隆对象。
 * @param obj object | array
 * @return object | array
 */
function deepClone(obj) {
    let result = obj instanceof Array ? []:{};

    for(let item in obj){
        let temple= typeof obj[item] == 'object' ? deepClone(obj[item]):obj[item];
        result[item] = temple;
    }

    return result;
}

// test
let testObj = {
    a:{
        b:{
            c:1,
            d:[1,2,2,{e:5}]
        }
    }
}

console.log(JSON.stringify(deepClone(testObj)))


/**
 * 2. 有这样一个URL，http://mail.163.com/?a=1&b=2&c=3&d=xxx&e。写一个函数QuerySearch()，入参name，输出其对应的value
 * @param name string
 * @return value string
 */
function QuerySearch(name) {
    // 规定字符串
    let url = 'http://mail.163.com/?a=1&b=2&c=3&d=xxx&e';

    let objArr = url.split('?')[1].split('&');

    let result = {};

    objArr.forEach(item=>{
        let tempArr = item.split('=');

        let key = tempArr[0];
        let value = tempArr[1];

        result[key] = value;
    })

    return result[name];
}

// test
console.log(QuerySearch('d'));
console.log(QuerySearch('e'));


/*
3.	如何点击每一列的时候alert其index?
<ul  id=”test”>
<li> 这是第一条<li/>
<li> 这是第二条<li/>
<li> 这是第三条<li/>
<ul>
*/
(function ciclkLi() {
    try {
        let li = document.getElementById('test').getElementsByTagName('li');

        li.forEach((item,index) => {
            li.click(function () {
                alert(index);
            });
        })

    }catch (e) {
        console.log('node 测试环境 不支持DOM')
    }
})()


/**
 * 4. 把数组 arr=[1,23,12,7,3,28,2,14]按正序的方式排序(不要用sort方法排序)
 * @param arr Array
 * @return arr Array
 */
function sort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            // 交换
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    return arr;
}

// test
console.log(sort([1,23,12,7,3,28,2,14]))



/*
5.	输入两个数字，输出这两个数字的最大公约数。
（比如：16，4输出4。）
*/
function maxDivisor(a,b) {

    if(a % b == 0){
        return b;
    }

    return maxDivisor(b, a % b);
}

// test
console.log(maxDivisor(16,4));
console.log(maxDivisor(15,4));


