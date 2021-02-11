import XML from './raw.js';
import test from 'https://js.max.pub/test/raw.js'
import file from 'https://js.max.pub/fs/file/deno.js'



test.equal('a', XML.parse(file('test/a.xml').text), file('test/a.json').json)


