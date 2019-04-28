const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const crypto = require('crypto');

const server = http.createServer((req,res)=>{
	const filename = req.headers.filename;
	console.log('File requiest received: '+filename);
	req//接收数据
	.pipe(crypto.createDecipher('aes192','a_shared_secret'))
	.pipe(zlib.createGunzip())//解压缩
	.pipe(fs.createWriteStream(filename))//写入磁盘
	.on('finish',()=>{
		res.writeHead(201,{'Content-Type':'text/plain'});
		res.end("That's it\n");
		console.log(`File saved: ${filename}`);
	})
})

server.listen(3000,()=>console.log('Listening'));