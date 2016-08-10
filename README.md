dom-search
==========

Install
-------

`npm install --save dom-search`

Usage
-----

```javascript
const domSearch = require('dom-search');
//Alternatively with es2015
//import domSearch from 'dom-search'
const div = createDIV();

console.log('search 1', domSearch(div, 'one'));
console.log('search 2', domSearch(div, 'also'));
console.log('search 3', domSearch(div, /one/))
console.log('search 4', domSearch(div, 'para', {all: true}))

function createDIV(){
    const div = document.createElement('div');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    p1.innerHTML = 'This is one paragraph.';
    p2.innerHTML = 'This is also a paragraph.';
    div.appendChild(p1);
    div.appendChild(p2);
    return div;
}
```

API
---

### domSearch(node, pattern, options) -> result

`node` is any dom node with text children.

`pattern` can be string, or regexp to search with.

`result` is an array of objects with two fields:

-	textNode (the text node the pattern matched)
-	parent (the parent of the matching text node)

#### options.all

Set if all occurrences of the pattern should be matched.

The default is `false` which means the pattern will only be matched once.

About
-----

*dom-search* is a nice way to find a node, or two that have a text node that contains a certain pattern amongst the **text node** children of an element.

Use *browserify* with this module, or some other transpiler.
