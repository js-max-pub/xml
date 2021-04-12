
// https://caniuse.com/?search=dotall
export function parse(s) {
	// let res = [...s.matchAll(/\<\/?[a-z]+/gi)]
	// let output = [];
	let res = [...s.matchAll(/([\s\S]*?)\<(\/?[a-z\:]+)([\s\S]*?)(\/?)\>/gim)]
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
				let p = [...attr.matchAll(/([a-z\:]+)\s?\=\s?[\"\']([\s\S]*?)[\"\']/gim)]
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


export const XML = {
	parse
}

export default XML
