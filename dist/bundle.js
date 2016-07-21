'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var nodeToString = _interopDefault(require('dom-node-tostring'));
var isRegexp = _interopDefault(require('is-regexp'));

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

function domSearch(doc, pattern, options) {

    var search = (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' ? Object.create(options) : {};
    search.all = typeof search.all === 'boolean' ? search.all : false;
    search.type = getPatternType(pattern);
    search.result = [];
    search.pattern = pattern;

    if (doc.nodeType === Node.ELEMENT_NODE) {
        return searchDoc(doc, search);
    } else if (doc.nodeType === Node.TEXT_NODE) {
        if (doc.children.length) {
            return searchDoc(doc, search);
        } else {
            return checkTextNode(doc, search);
        }
    }
}

function searchDoc(doc, search) {

    searchChildren(doc, search);

    return search.result;
}

function searchChildren(doc, search) {
    if (search.type === 'regexp') {
        return searchRegexp(doc, search);
    }

    return searchString(doc, search);
}

function searchString(doc, search) {

    for (var i = 0; i < doc.childNodes.length; i++) {
        var child = doc.childNodes[i];

        if (child.nodeType === Node.TEXT_NODE) {
            var str = nodeToString(child);

            if (str.indexOf(search.pattern) !== -1) {

                search.result.push({
                    textNode: child,
                    parent: doc
                });

                if (!search.all) {
                    break;
                }
            }
        } else {
            searchDoc(child, search);
        }
    }

    return search;
}

function searchRegexp(doc, search) {

    for (var i = 0; i < doc.childNodes.length; i++) {
        var child = doc.childNodes[i];

        if (child.nodeType === Node.TEXT_NODE) {

            var str = nodeToString(child);
            var match = void 0;

            if ((match = str.match(search.pattern)) !== null) {

                search.result.push({
                    textNode: child,
                    parent: doc,
                    match: match
                });

                if (!search.all) {
                    break;
                }
            }
        } else {
            searchDoc(child, search);
        }
    }

    return search;
}

function checkTextNode(node, search) {
    var str = nodeToString(node);

    if (search.type === 'string') {
        if (doc.indexOf(pattern) !== -1) {
            return [{ textNode: node, parent: node.parentNode }];
        }
    } else if (search.type === 'regexp') {
        var match = void 0;
        if (match = search.pattern.match(node)) {
            return [{
                textNode: node,
                parent: node.parentNode,
                match: match
            }];
        }
    }

    return [];
}

function getPatternType(pattern) {
    if (isRegexp(pattern)) {
        return 'regexp';
    }

    return typeof pattern === 'undefined' ? 'undefined' : _typeof(pattern);
}

module.exports = domSearch;
//# sourceMappingURL=bundle.js.map
