import {XML} from './mod.js';
import test from 'https://js.max.pub/test/raw.js'
// import file from 'https://js.max.pub/fs/file/deno.js'
import FS from 'https://js.max.pub/fs/deno.js'



test.equal('test 1', XML.parse(FS.file('test/a.xml',import.meta).text), FS.file('test/a.json',import.meta).json)


