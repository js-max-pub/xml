import {XML} from './raw.js';
import test from 'https://js.max.pub/test/raw.js'
// import file from 'https://js.max.pub/fs/file/deno.js'
import FS from 'https://js.max.pub/fs/deno.js'



test.equal('a', XML.parse(FS.file('test/a.xml').text), FS.file('test/a.json').json)


