### Chapter 6

#### 工厂模式

	function A(name){
		const privateProp = {};
		const person = {
			setName:name=>{
				if(!name) throw new Error('A person must have a name');
				privateProp.name = name;
			},
			getName:()=>{
				return privateProp.name;
			}
		};
		person.setName(name);
		return person;
	}

#### 揭示构造函数

	const a = new Promise(function(resolve,reject){
		//...
	});

#### 代理模式（替代模式）

##### 实现代理模式的方法

	function createProxy(subject){
		const proto = Object.getPrototypeOf(subject);
		function Proxy(subject){
			this.subject = subject;
		}
		Proxy.prototype = Object.create(protp);
		//代理方法
		Proxy.prototype.hello = function(){
			return this.subject.hello() + 'world!';
		};
		//委托方法
		Proxy.prototype.goodbye = function(){
			return this.subject.goodbye.apply(this.subject,arguments);
		};
		return new Proxy(subject);
	}
	module.exports = createProxy;

	function createProxy(subject){
		return {
			hello:()=>(subject.hello + 'world!'),
			goodbye:()=>(subject.goodbye.apply(subject,arguments))
		};
	}

##### ES2015中的Proxy对象

	const scientist = {
		name:'a',
		surname:'b'
	};
	const uppercaseScientist = new Proxy(scientist,{
		get:(target,property)=>target[property].toUpperCase()
	});
	console.log(uppercaseScientist.name,uppercaseScientist.surname);
	//A B

#### 装饰者模式

动态为现有对象添加一些额外行为。与继承的区别在于，额外行为不是添加到同一`类对象`上，而仅仅添加到明确被装饰的`对象实例`上。

##### 实现装饰者模式的方法

组合

	function decorate(component){
		const proto = Object.getPrototypeOf(component);
		function Decorator(component){
			this.component = component;
		}
		Decorator.prototype = Object.create(proto);
		//新增方法
		Decorator.prototype.greetings = function(){
			return 'Hi';
		};
		//委托方法
		Decorator.prototype.hello = function(){
			return this.component.hello.apply(this.component,arguments);
		}
		return new Decorator(component);
	}

对象增强

	function decorate(component){
		component.greetings = ()=>{
			//...
		};
		return component;
	}

#### 策略模式（Strategy）

允许一个称为上下文（Context）的对象，将变量部分提取到独立的、可变换的策略（Strategy）对象中，从而支持逻辑中的变化。

	class Config{
		constructor(strategy){
			this.data = {};
			this.strategy = strategy;
		}
		get(path){
			return objectPath.get(this.data,path);
		}
		set(path,value){
			return objectPath.set(this.data,path,value);
		}
		read(file){
			this.data = this.strategy.seserialize(fs.readFileSync(file,'utf-8'));
		}
		save(file){
			fs.writeFileSync(file,this.strategy.serialize(this.data));
		}
	}
	module.exports = Config;

#### 状态模式

#### 模板模式（Template）

由定义好的抽象伪类组成，描述一个算法骨架，一些具体步骤没有被实现。子类通过实现缺失的步骤，来完善整个算法。

	class ConfigTemplate{
		read(file){
			this.data = this._deserialize(fs.readFileSync(file,'utf-8'));
		}
		save(file){
			fs.writeFileSync(file,this._serialize(this.data));
		}
		get...
		set...
		_serialize(){
			throw new Error('_serialize() must be implemented');
		}
		_deserialize(){
			throw...
		}
	}
	module.exports = ConfigTemplate;

	class JsonConfig extends ConfigTemplate{
		_deserialize(data){
			return JSON.parse(data);
		};
		_serialize(data){
			return JSON.stringify(data,null,'');
		}
	}
	module.exports = JsonConfig;

#### 命令模式（Command）

封装了即将要执行操作所需信息的对象。

任务模式

	function createTask(target,args){
		return ()=>{
			target.apply(null,args);
		}
	}