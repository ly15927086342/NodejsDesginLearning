const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
const crypto = require('crypto');
const file = process.argv[2];//命令行第三个参数，第一个是node，第二个是文件路径
const server = process.argv[3];//第四个参数

const options = {
	hostname:server,
	port:3000,
	path:'/',
	method:'PUT',
	headers:{
		filename:path.basename(file),
		'Content-Type':'application/octet-stream',
		'Content-Encoding':'gzip'
	}
};

const req = http.request(options,res=>{
	console.log('Server response: '+res.statusCode);
});

fs.createReadStream(file)//读取文件
.pipe(zlib.createGzip())//压缩
.pipe(crypto.createCipher('aes192','a_shared_secret'))
.pipe(req)//发送到服务器
.on('finish',()=>{
	req.end()
	console.log('File successfully sent');
});