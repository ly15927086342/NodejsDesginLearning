### Chapter1

#### 认识Node.js 6和ES2015

##### let和const关键字

	const b = {
		a:'d',
		c:'f'
	};
	b = 2;//错误
	b.a = 'c';//正确
	b.q = 'e';//正确

##### 箭头函数

过滤器例子

	const a = [1,2,3,4];
	const b = a.filter(function(x){
		return x%2 === 0;
	});

箭头函数重写
	
	const a = [1,2,3,4];
	const b = a.filter(x => x%2 === 0);

**Tip**

1. 当函数主体是一行时，没必要写return关键字，因为它是隐式应用的。
2. 箭头函数是绑定到他们的词法作用域内的，意味着箭头函数内的`this`的值和父块中的值是相同的。

##### 类语法

**Tip**

1. 静态方法（static 方法名）指类之间可以调用的方法，而不是通过类的实例调用。

##### Map和Set集合

Map示例

	let a = new Map();
	a.set('id',1);
	a.set('ok',2);
	a.set('no',3);
	a.size;//1
	a.has('id');//true
	a.get('id');//1
	a.delete('id');
	for(let b of a){
		console.log(b);//['ok',2]\n['no',3]
	}

有趣的一点，Map的key可以是一个函数！可以利用次功能建立一个微测试框架

	let tests = new Map();
	tests.set(() => 2+2,4);
	tests.set(() => 2*2,4);
	tests.set(() => 2/2,1);
	for(const entry of tests){
		console.log((entry[0]() === entry[1]) ? 'PASS' : 'FAIL');
	}

Set示例

	let a = new Set([0,1,2,3]);
	a.add(3);//will not be added
	a.size;//4
	a.delete(0);
	a.has(0);//false
	for(let b of a){
		console.log(b);
	}

**Tip**

1. Map迭代时，遵循条目被插入的顺序。
2. Map的key可以是一个函数！可以利用次功能建立一个微测试框架。
3. Set的集合不会重复。

##### WeakMap和WeakSet集合

WeakMap示例

	let obj = {};
	let map = new WeakMap();
	map.set(obj,{'key':'some_value'});
	console.log(map.get(obj));//{'key':'some_value'}
	obj = undefined;//此时map对象中已经删除了key为obj的条目

**Tip**

1. WeakMap的key只能是对象，不能迭代所有条目，且当对象为undefined时，会进行垃圾回收。
2. WeakSet与WeakMap特性类似，只允许存储对象且不能重复，允许内部对象在只剩下引用的时候被垃圾回收。

##### 模板字面量

使用反引号\`作为分隔符，优势包括：1.允许在字符串内使用${expression}插入变量或表达式；2.单个字符串可以写在多行。

#### Reactor模式

Reactor模式是Node.js异步特性的核心。

阻塞I/O和非阻塞I/O效率都不高，前者占用线程时间，后者通过轮询消耗CPU时间来对不可用的资源进行迭代。

##### 事件多路分解器（Event Demultiplexer）

优势：线程总空闲时间最小化

##### Reactor模式简介

Node.js的核心定义模式：模式（reactor）通过阻塞来处理I/O，直到一组被观察资源的新时间可用，然后将每个事件分派到相关联的处理程序来做出反应。

