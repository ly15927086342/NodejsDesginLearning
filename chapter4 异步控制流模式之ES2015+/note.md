### Chapter4

#### Promise

ES2015 promise

**创建Promise实例**

	Constructor(new Promise((resolve,reject)=>{}))

**Promise对象的静态方法**

创建新的promise

	Promise.resolve(obj)

创建一个被拒绝的promise

	Promise.reject(err)

创建一个promise，所有项目执行完成，执行then，任何一个项目被拒绝，以第一个拒绝理由执行拒绝操作catch。

	Promise.all(iterable)

返回一个promise，只要有一个项目执行完成或被拒绝，就then或者catch。

	Promise.race(iterable)

**Promise实例的方法**

promise基本方法，与Promise/A+标准兼容

	promise.then(onFulfilled,onRejected)

promise.then(undefined,onRejected)的语法糖

	promise.catch(onRejected)

#### generator(semi-coroutines)

类似一个于一个函数，此外，可以挂起（使用yield语句），然后再稍后恢复。

	function* testGenerator(){
		yield '1';
		yield '2';
		return '3';
	}
	const newtest = testGenerator();
	console.log(newtest.next());//{value:'1',done:false}
	console.log(newtest.next());//{value:'2',done:false}
	console.log(newtest.next());//{value:'3',done:true}

返回一个对象

	{
		value:<yielded value>,
		done:<true if the execution reached the end>
	}
