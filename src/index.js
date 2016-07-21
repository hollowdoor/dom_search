import nodeToString from 'dom-node-tostring';
import isRegexp from 'is-regexp';

function domSearch(doc, pattern, options){

    const search = typeof options === 'object' ?  Object.create(options) : {};
    search.all = typeof search.all === 'boolean' ? search.all : false;
    search.type = getPatternType(pattern);
    search.result = [];
    search.pattern = pattern;

    if(doc.nodeType === Node.ELEMENT_NODE){
        return searchDoc(doc, search);
    }else if(doc.nodeType === Node.TEXT_NODE){
        if(doc.children.length){
            return searchDoc(doc, search);
        }else{
            return checkTextNode(doc, search);
        }
    }

}

function searchDoc(doc, search){

    searchChildren(doc, search);

    return search.result;
}

function searchChildren(doc, search){
    if(search.type === 'regexp'){
        return searchRegexp(doc, search);
    }

    return searchString(doc, search);
}

function searchString(doc, search){

    for(let i=0; i<doc.childNodes.length; i++){
        let child = doc.childNodes[i];

        if(child.nodeType === Node.TEXT_NODE){
            let str = nodeToString(child);

            if(str.indexOf(search.pattern) !== -1){

                search.result.push({
                    textNode: child,
                    parent: doc
                });

                if(!search.all){
                    break;
                }
            }
        }else{
            searchDoc(child, search);
        }
    }

    return search;
}

function searchRegexp(doc, search){

    for(let i=0; i<doc.childNodes.length; i++){
        let child = doc.childNodes[i];

        if(child.nodeType === Node.TEXT_NODE){

            let str = nodeToString(child);
            let match;

            if((match = str.match(search.pattern)) !== null){

                search.result.push({
                    textNode: child,
                    parent: doc,
                    match: match
                });

                if(!search.all){
                    break;
                }
            }
        }else{
            searchDoc(child, search);
        }
    }

    return search;
}

function checkTextNode(node, search){
    let str = nodeToString(node);

    if(search.type === 'string'){
        if(doc.indexOf(pattern) !== -1){
            return [{textNode: node, parent: node.parentNode}];
        }
    }else if(search.type === 'regexp'){
        let match;
        if(match = search.pattern.match(node)){
            return [{
                textNode: node,
                parent: node.parentNode,
                match: match
            }];
        }
    }

    return [];

}

function getPatternType(pattern){
    if(isRegexp(pattern)){
        return 'regexp';
    }

    return typeof pattern;
}

export default domSearch;

/*
git remote add origin https://github.com/hollowdoor/dom_search.git
git push -u origin master
*/
