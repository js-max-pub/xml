

import * as xml from './functions.js'

export class XML {


	static parse(s) {
		return new XML(xml.parse(s))
	}

	constructor(p) {
		if (typeof p == 'string')
			this.json = { tag: '_text_', children: [p] }
		else
			this.json = p
	}
	get name() { return this.json?.tag }
	get attributes() { return this.json?.attributes ?? {} }
	get children() { return (this.json?.children ?? []).map(x => new XML(x)) }



	deep() { return xml.deep(this.json).map(x => new XML(x)) }
	text(options = {}) {
		let text = xml.text(this.json)
		return options.raw ? text : text.map(x => x.trim())
	}

	tags(name) { return this.deep().filter(tag => tag.name != '_text_' && (!name || tag.name == name)) }
	ids(value) { return this.deep().filter(tag => tag.attributes.id && (!value || tag.attributes.id == value)) }

	id(value) { return this.ids(value)[0] }
	classes(value) { return this.deep().filter(tag => tag.attributes.class && (!value || tag.attributes.class.split(' ').includes(value))) }

}


// function* deepClass(json) {
// 	for (let item of xml.deep(json))
// 		yield new XML(item)
// }


// export function* tags(json) {

// }
