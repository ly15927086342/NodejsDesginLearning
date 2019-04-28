### Chapter3

#### 异步编程的困难

##### 回调地狱

大量的闭包和就地定义的回调函数使代码变得不可读并难以控制的情况被称为回调地狱（callback hell）

典型结构：

	asyncFoo(err=>{
		asyncBar(err=>{
			asyncFooBar(err=>{
				//...
			});
		});
	});

代码由于深层嵌套而呈金字塔的形状，也被俗称为末日金字塔（pyramid of doom）。

#### 使用纯JavaScript

##### 回调规则

1. 必须尽快地退出。用return,continue或break，有助于保持更浅的代码层级。
2. 需要为回调创建命名函数，将它们保持在闭包外，并将中间结果作为参数传递。
3. 需要对代码进行模块化。

##### 应用回调函数

优化1

	if(err){
		callback(err);
	}else{
		//...
	}

修改为

	if(err){
		return callback(err);
	}
	//...

优化2

识别可重用代码段，写为通用函数

#### async库

##### 顺序执行

	npm async 

	const async = require('async');

