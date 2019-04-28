### Chapter2

#### 回调模式

##### CPS(Continuation Passing Style)

CPS：一个作为参数传递给另一个函数的函数，当操作完成时将调用该函数。

##### 同步CPS

	function add(a,b){
		return a+b;
	}

等效果于直接风格（direct style）

	function add(a,b,callback){
		callback(a+b);
	}

##### 异步CPS

	function additionAsync(a,b,callback){
		SetTimeout(() => callback(a+b),100);
	}

**Tip**

1. 同步函数会发生阻塞，异步函数会立即返回，并且在事件循环的后续周期将结果传递给处理程序。

#### Node.js回调约定

##### 回调函数置尾

	fs.readFile(filename,[options],callback)

##### 暴露错误优先

另外，错误必须始终为Error类型

	fs.readFile('foo.txt','utf8',(err,data){
		if(err){
			handleError(err);
		}else{
			processData(data);
		}
	})

##### 传播错误

异步中可以用return callback(err)把错误传播到链的下一个回调来进行正确的错误传播。

##### 未捕获异常

未捕获异常使程序处于不能保证一致性的状态，可能导致无法预料的问题。

#### 模块系统及其模式

##### Node.js模块解释

CommonJS让每个模块在私有作用域中运行，以便本地定义的每个变量不会污染全局命名空间。

#### 模块定义模式

##### 命名导出（Named exports）

	//file logger.js
	exports.info = (message)=>{
		console.log('info:' + message);
	}
	//file main.js
	const logger = require('./logger');
	logger.info('test');//info:test

##### 导出函数

单一责任原则（Single Responsibility Principle,SRP)：每个模块应该对单个功能负责，该责任应完全由模块封装。

	//file logger.js
	module.exports = (message)=>{
		console.log('info:' + message);
	}
	module.exports.verbose = (message)=>{
		console.log('verbose:' + message);
	}
	//file main.js
	const logger = require('./logger');
	logger('test');//info:test
	logger.verbose('test');//verbose:test

##### 导出构造函数

	//file logger.js
	function A(name){
		this.name = name;
	}
	A.prototype.log = function(message){
		console.log(`[${this.name}] $message`);
	}
	A.prototype.info = function(message){
		this.log(`info: ${message}`);
	}
	module.exports = A;
	//file main.js
	const Aclass = require('./logger');
	const a = new Aclass('DB');
	a.info('test');//[DB] info: test

同样的，可以导出ES2015的类：

	class A{
		constructor(name){
			this.name = name;
		}
		log(message){
			console.log(`[${this.name}] $message`);
		}
		info(message){
			this.log(`info: ${message}`);
		}
	} 
	module.exports = A;

##### 导出实例

因为模块被缓存，每个引用logger模块的模块实际上总是得到对象的同一个实例，从而共享状态。

	//file logger.js
	function Logger(name){
		this.count = 0;
		this.name = name;
	}
	Logger.prototype.log = function(message){
		this.count++;
		console.log(`${this.name}: ${message}`);
	}
	module.exports = new Logger('DEFAULT');//实例
	//file main.js
	const logger = require('./logger');
	logger.log('test');

#### 修改其他模块或全局作用域

猴子补丁（monkey patching），有风险

	//file patcher.js
	require('./logger').customMessage = ()=>{console.log('This is a new function')};
	//file main.js
	require('./patcher');
	const logger = require('./logger');
	logger.custiomMessage();//This is a new function

