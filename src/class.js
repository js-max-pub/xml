

import * as xml from './functions.js'

export class XML {

	/**
	 * parses an xml-string and returns a new XML instance
	 * @param {string} rawXML
	 * @returns {XML} 
	 */
	static parse(rawXML) {
		return new XML(xml.parse(rawXML))
	}


	/**
	 * creates a new XML instance 
	 * @param {any} p 
	 */
	constructor(p) {
		if (p instanceof XML)
			this.json = p.json
		else
			this.json = p
		// console.log('new XML', this.type, this.json?.length)
	}



	/**
	 * @returns {string} type of current reference
	 */
	get type() {
		if (typeof this.json == 'string') return 'text'
		if (Array.isArray(this.json)) return 'list'
		return 'node'
	}



	/**
	 * @returns {string} the tag-name 
	 */
	get name() {
		return this.json?.tag
	}



	/**
	 * @returns {object} tag-attributes as key-value pairs
	 */
	get attributes() {
		return this.json?.attributes ?? {}
	}



	/**
	 * @returns {XML}
	 */
	get children() {
		return new XML(this.json?.children ?? [])
	}
	get count() {
		if (this.type == 'list')
			return this.json.length
	}

	get #list() { return this.json.length ? this.json : this.children.json }
	at(index = 0) { return new XML(this.#list.slice(index)?.[0]) }
	get first() { return this.at(0) }
	get last() { return this.at(-1) }

	/**
	 * traversing xml-tree depth-first
	 * @param {number} maxDepth 
	 * @returns {XML}
	 */
	deep(maxDepth) {
		// console.log('deep', maxDepth, this.type);
		return new XML(xml.deep(this.json, maxDepth))
	}//.map(x => new XML(x))) }

	text(options = {}) {
		let text = xml.text(this.json, options.maxDepth)
		return options.raw ? text : text.map(x => x.trim())
	}

	tags(name, maxDepth) { return this.deep(maxDepth).filter(tag => tag.type == 'node' && (!name || tag.name == name)) }
	ids(value) { return this.deep().filter(tag => tag.attributes.id && (!value || tag.attributes.id == value)) }
	classes(value) { return this.deep().filter(tag => tag.attributes.class && (!value || tag.attributes.class.split(' ').includes(value))) }

	id(value) { return this.ids(value).first }

	map(...p) { return new XML(this.json.map(x => new XML(x)).map(...p)) }
	filter(...p) { return new XML(this.json.map(x => new XML(x)).filter(...p)) }



	get string() { return this.toString() }
	toString() {
		// console.log('log', this.type, this)
		switch (this.type) {
			case 'node': return `level ${this.json.depth} ${this.type}:   ${this.name.padEnd(10)}   a:${Object.keys(this.attributes).length}   c:${this.children.count}`
			case 'list': return this.#list.map(x => x.toString()).join('\n')
			case 'text': return '        text:   ' + this.json.trim()
		}

	}
}
