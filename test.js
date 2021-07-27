import { XML } from './mod.js';
// import * as xml from './src/functions.js'
import test from 'https://jsv.max.pub/test/2021-07/mod.js'
// import file from 'https://js.max.pub/fs/file/deno.js'
import { FS } from 'https://jsv.max.pub/fs/2021/deno.js'

let f = FS.folder('test', import.meta)
// console.log(f.list)

test.equal('test 1', XML.parse(f.file('a.xml').text), FS.file('test/a.json', import.meta).json)

let b = FS.file('test/b.xml', import.meta).text
// console.log('b', b)
// let c = xml.parse(b)
// for (let tag of xml.deep(c))
// 	console.log('deep', tag)





b = XML.parse(b)

// console.log(b.deep().toString())

// console.log('\n--------------\n')

// console.log(b.tags('a').toString())

console.log('\n--------------\n')

console.log(b.tags('a', 2).toString())

console.log('\n--------------\n')

console.log(b.tags('a').tags('aa').toString())

console.log('\n--------------\n')

console.log(b.tags('a').tags('aa').text())

console.log('\n--------------\n')

console.log(b.classes('good').text({ maxDepth: 1 }))

console.log('\n--------------\n')

console.log(b.id(2).text())

// for (let tag of b.tags())
// 	console.log(tag.name)

// console.log('----')

// for (let tag of b.tags('aa'))
// 	console.log(tag.attributes)

// console.log('----')

// for (let text of b.text())
// 	console.log('text', text)

// console.log('----')

// console.log('id test', b.id('2')?.text({ raw: true }))

// console.log('----')

// for (let tag of b.classes('good'))
// 	console.log('tag', tag.name)
// console.log(tag.tag ? 'tag:' + tag.tag : 'txt:' + tag)
// console.log('b', b)
// for (let tag of XML.deep(b))
// 	console.log(tag.tag ? 'tag:' + tag.tag : 'txt:' + tag)

// console.log('----')
// for (let tag of XML.wide(b))
// 	console.log(tag.tag ? 'tag:' + tag.tag : 'txt:' + tag)


// XML('<a/>').deep

// XML.deep(b).map(x => console.log(x))
// new XML()
// new XML()