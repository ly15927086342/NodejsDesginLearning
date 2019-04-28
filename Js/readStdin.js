
//非流动模式
// process.stdin
// .on('readable',()=>{
// 	let chunk;
// 	console.log('new data available');
// 	while((chunk = process.stdin.read())!==null){
// 		console.log(`
// 			chunk read: (${chunk.length}) "${chunk.toString()}"
// 			`);
// 	}
// })
// .on('end',()=>process.stdout.write('end of stream'));

//流动模式
process.stdin
.on('data',chunk=>{
	console.log('new data available');
	console.log(`
		chunk read: (${chunk.length}) "${chunk.toString()}"
	`)
})
.on('end',()=>process.stdout.write('end of stream'));