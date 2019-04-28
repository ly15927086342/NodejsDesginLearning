### Chapter5

见js/gzipReceive.js 和 gzipSend.js

运行gzipReceive.js

	node gzipReceive.js

运行gzipSend.js

	node gzipSend.js filename localhost

#### 流的分类

Node.js中每个流实例都是steam模块提供的四个基本抽象类之一的实现：

1. stream.Readable
2. stream.Writeable
3. stream.Duplex
4. stream.Transform

流支持两种模式：

1. 二进制模式（Binary mode）:流中数据以块的形式存在
2. 对象模式（Object mode）：流中数据被看作一系列独立的对象

#### 可读流

从可读流获取数据有两种模式：

1. 非流动模式（non-flowing）:添加一个对于readable事件的监听器，在读取新的数据时进行通知
2. 流动模式（flowing）：给data事件添加一个监听器

**Tip**

Windows下用流的方式查看文件内容：

	type filename | node readStdin.js

##### 背压（Back-pressure）

内存超过highWaterMark限制时，writable.write()会返回false

