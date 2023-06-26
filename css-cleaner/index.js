const fs = require('fs');
const path = require('path');
const csstree = require('css-tree');
const Css = require('json-to-css');
const cssbeautify = require('cssbeautify');

// define variables
let bootstrapPath = "";
let normalizePath = "";
let hasBootstrap = false;
let hasNormalize = false;
let hasTailwind = false;
let dependencies = {
    "css": {}
};

// get all file paths recursively
const getAllFiles = function(dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath)
    arrayOfFiles = arrayOfFiles || []
    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file))
        }
    })
    return arrayOfFiles
}

// automatically find libs' paths
const allFiles = getAllFiles("./");
allFiles.forEach(file => {
    if (file.match(/bootstrap.css/)) {
        bootstrapPath = file;
    }
    if (file.match(/normalize.css/)) {
        normalizePath = file;
    }
});

// read bootstrap file 
const bootstrap = fs.readFileSync(bootstrapPath, { encoding: 'utf8', flag: 'r' });
// make an object from bootstrap css file
const bootstrapObject = cssToObject(csstree.parse(bootstrap));

const normalize = fs.readFileSync(normalizePath, { encoding: 'utf8', flag: 'r' });
const normalizeObject = cssToObject(csstree.parse(normalize));

let css = fs.readFileSync('./style.css', { encoding: 'utf8', flag: 'r' });
let cssObject = cssToObject(csstree.parse(css));

// compare style.css and bootstrap
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

// add bootstrap to dependencies if it presents in file
if (hasBootstrap) {
    Object.assign(dependencies["css"], { "bootstrap": "css/bootstrap.css" });
}

// add tailwind to dependencies if it presents in file
if (hasTailwind) {
    Object.assign(dependencies["css"], { "tailwind": "css/tailwind" });
}

// add normalize to dependencies if it presents in file
if (hasNormalize) {
    Object.assign(dependencies["css"], { "normalize": "css/tailwind" });
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
