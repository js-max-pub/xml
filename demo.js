import XML from './mod.js';


let c = XML.parse(`<pat>a<more b="c"> c
dd</more>aa<test a="1" b='2 4'
c=' dd d'/> <ns:x><y>z</y></ns:x></pat>`)
console.log(JSON.stringify(c, 0, 4))

// [
// 	{tag:'pat', children:[
// 		'a',
// 		{tag:'more', attributes:{b:'c'}, children:[
// 			' cdd'
// 		]},
// 		'aa',
// 		{tag:'test', attributes:{a:'1',b:'2'}}
// 	]}
// ]