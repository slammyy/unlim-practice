const fs = require('fs');
const csstree = require('css-tree');
const Css = require('json-to-css');
const cssbeautify = require('cssbeautify');

// read bootstrap file 
const bootstrap = fs.readFileSync('./bootstrap/css/bootstrap.css', { encoding: 'utf8', flag: 'r' });
// make an object from bootstrap css file
const bootstrapObject = cssToObject(csstree.parse(bootstrap));

// read style.css file
let css = fs.readFileSync('./style.css', { encoding: 'utf8', flag: 'r' });
// make an object from style.css
let cssObject = cssToObject(csstree.parse(css));

// conpare style.css and bootstrap
for (let i = 0; i < Object.entries(cssObject).length; i++) {
    for (let j = 0; j < Object.entries(bootstrapObject).length; j++) {
        if (JSON.stringify(Object.entries(cssObject)[i]) == JSON.stringify(Object.entries(bootstrapObject)[j])) {
            const object = Object.entries(cssObject)[i][0];
            delete cssObject[object];
        }
    }
}

delete cssObject[":root"];
delete cssObject["@tailwind"];

// convert json to css and format it
css = cssbeautify(Css.of(cssObject));

// write formatted css to file 'clear.css'
fs.writeFile('clear.css', css, (err) => {
    if (err) throw err;
    console.log('File "clear.css" has been saved.');
});

const dependencies = {
    bootstrap: 5.1
};

fs.writeFile('dependencies.json', JSON.stringify(dependencies, null, 4), (err) => {
    if (err) throw err;
    console.log('Dependencies has been saved to dependencies.');
});

function cssToObject(ast) {
    const obj = {};
    csstree.walk(ast, node => {
        if (node.type === 'Rule') {
            const selectors = getSelectors(node.prelude);
            const styles = {};
            csstree.walk(node.block, styleNode => {
                if (styleNode.type === 'Declaration') {
                    const property = styleNode.property;
                    const value = csstree.generate(styleNode.value);
                    styles[property] = value;
                }
            });
            selectors.forEach(selector => {
                if (!obj[selector]) {
                    obj[selector] = {};
                }
                Object.assign(obj[selector], styles);
            });
        }
    });
    return obj;
}

function getSelectors(prelude) {
    const selectors = [];
    csstree.walk(prelude, node => {
        if (node.type === 'Selector') {
            selectors.push(csstree.generate(node));
        }
    });
    return selectors;
}
