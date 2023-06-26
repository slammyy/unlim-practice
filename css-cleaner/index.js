const fs = require('fs');
const csstree = require('css-tree');
const Css = require('json-to-css');
const cssbeautify = require('cssbeautify');

// read bootstrap file 
const bootstrap = fs.readFileSync('./libs/bootstrap.css', { encoding: 'utf8', flag: 'r' });
// make an object from bootstrap css file
const bootstrapObject = cssToObject(csstree.parse(bootstrap));

// read normalize file 
const normalize = fs.readFileSync('./libs/normalize.css', { encoding: 'utf8', flag: 'r' });
// make an object from normalize css file
const normalizeObject = cssToObject(csstree.parse(normalize));

// read style.css file
let css = fs.readFileSync('./style.css', { encoding: 'utf8', flag: 'r' });
// make an object from style.css
let cssObject = cssToObject(csstree.parse(css));

// compare style.css and bootstrap
let hasBootstrap = false;
for (let i = 0; i < Object.entries(cssObject).length; i++) {
    for (let j = 0; j < Object.entries(bootstrapObject).length; j++) {
        if (JSON.stringify(Object.entries(cssObject)[i]) == JSON.stringify(Object.entries(bootstrapObject)[j])) {
            const object = Object.entries(cssObject)[i][0];
            delete cssObject[object];
            // mark bootstrap presents in file
            hasBootstrap = true;
        }
    }
}

// compare style.css and normalize
let hasNormalize = false;
for (let i = 0; i < Object.entries(cssObject).length; i++) {
    for (let j = 0; j < Object.entries(normalizeObject).length; j++) {
        if (JSON.stringify(Object.entries(cssObject)[i]) == JSON.stringify(Object.entries(normalizeObject)[j])) {
            const object = Object.entries(cssObject)[i][0];
            delete cssObject[object];
            // mark normalize presents in file
            hasNormalize = true;
        }
    }
}

delete cssObject[":root"];

// check file if tailwind presents in it
let hasTailwind = false;
if (css.match(/@tailwind/)) {
    delete cssObject["@tailwind"];
    hasTailwind = true;
}

// convert json to css and format it
css = cssbeautify(Css.of(cssObject));

// write formatted css to file 'clear.css'
fs.writeFile('clear.css', css, (err) => {
    if (err) throw err;
    console.log('File "clear.css" has been saved.');
});

const dependencies = {
    "css": {}
};

// add bootstrap to dependencies if it presents in file
if (hasBootstrap) {
    Object.assign(dependencies["css"], { "bootstrap": "css/bootstrap.css" });
}

// add tailwind to dependencies if it presents in file
if (hasTailwind) {
    Object.assign(dependencies["css"], { "tailwind": "css/tailwind" });
}

// write dependencies to dependencies.json and console.log it
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
