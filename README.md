# xml

```js
import XML from "https://js.max.pub/xml/raw.js";

let json = XML.parse(`<person name='Joe'>text</tag>`);

let xml = XML.stringify(`{ "tag": "person", "attributes": {"name": "Joe"}, "children": ["text"] }`)
```
