
// https://caniuse.com/?search=dotall

export function parse(s) {
	// let res = [...s.matchAll(/\<\/?[a-z]+/gi)]
	// let output = [];
	// console.log('jo')
	let res = [...s?.matchAll(/([\s\S]*?)\<(\/?[a-z\:_1-9]+)([\s\S]*?)(\/?)\>/gim) ?? []]
	// let res = [... s.matchAll(/\<(\/?[a-z]+)(\s+[a-z]+\s?\=\s?\".*?\")*(\/?)\>(.*?)/gim)]
	// for(let x of res) console.log(x)
	// console.log(res)
	var currentTag = { tag: 'ROOT' };
	var stack = [currentTag];

	for (let item of res) {
		// console.log(item)
		let [full, text, tag, attr, end] = item
		if (text.trim()) {
			if (!currentTag.children) currentTag.children = [];

			currentTag.children.push(text)
		}
		if (!tag.startsWith('/')) { // opening tag
			// console.log('OPEN', tag)
			let newTag = { tag };
			if (attr) {
				newTag.attributes = {};
				let p = [...attr.matchAll(/([a-z\:_1-9]+)\s?\=\s?[\"\']([\s\S]*?)[\"\']/gim)]
				for (let attr of p) {
					// console.log('attr', attr)
					newTag.attributes[attr[1]] = attr[2]
				}
				// console.log(p)
			}
			if (!currentTag.children) currentTag.children = [];
			currentTag.children.push(newTag)


			if (end.trim() == '/') { // self closing
				// console.log('CLOSE', tag)
			} else { // put on stack... wait for closing tag
				stack.push(currentTag)
				currentTag = newTag
			}
		} else { // closing tag
			tag = tag.slice(1)
			// console.log('CLOSE', tag)
			currentTag = stack.pop()
		}
		// if(text.trim()) output.push(text)
		// output.push({tag})
		// console.log('TAG',tag)

	}
	return currentTag.children;
}



export function text(tags, maxDepth) {
	return deep(tags, maxDepth).filter(x => typeof x == 'string')
}

function addProps(o, props = {}) {
	if (typeof o != 'object') return o
	for (let key in props)
		o[key] = props[key]
	return o
}
export function deep(tags, maxDepth = 100, depth = 0) {
	// console.log('deep-f', tags?.constructor?.name)
	if (tags?.constructor?.name == 'XML') tags = tags.json
	// console.log('tags', tags)
	if (depth > maxDepth) return []
	if (!tags?.length) tags = tags?.children ?? []
	return tags.map(tag => [addProps(tag, { depth }), deep(tag?.children, maxDepth, depth + 1)]).flat(10)
}


// export function* deep(tags) {
// 	if (!tags.length) tags = tags?.children ?? []
// 	for (let tag of tags) {
// 		yield tag
// 		if (tag.children?.length)
// 			yield* deep(tag.children)
// 	}
// }


// export function* wide(tags) { // not correct yet
// 	if (!tags.length) tags = tags?.children ?? []
// 	for (let tag of tags)
// 		yield tag

// 	for (let tag of tags)
// 		if (tag.children?.length)
// 			yield* wide(tag.children)
// }


// export function* text(json) {
// 	for (let item of xml.deep(json))
// 		if (typeof item == 'string')
// 			yield item
// }