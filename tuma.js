const fs = require('fs');
const ermahnung = "Lass dir das von Marcel nochmal erklären!";

const mainFnRegex = /\.Funktion.*\./g;
const fnRegex = /\.Main.*\./g;
const variableRegex = /\.Variable\s.*?\./g;


/*
    Example Func:
        .Funktion (param1) HelloWorld {
            println("Hello World");
        }.

    Example Variable:
        .Variable test = "Hello World".
*/

function tumaFunToJsFun(code) {
    let jsFun = "";

    return jsFun;
}


function tumaVarToJsVar(code) {
    let jsVar = "let";
    let i = code.match(/.*=.*/)[0];
    i = i.replace(/\./g, "");
    i = i.replace(/Variable/g, "");
    jsVar += i + ";";
    return jsVar;
}

function replaceLineBreaks(code) {
    return code.replace(/\r\n/g, '');
}

function writeCodeToFile(code) {
    if (code) {
        fs.writeFile('out.js', code, { flag: 'wx' }, err => {
            if (err) {
                console.error(err);
            }
        });
    }
}

function compile(code) {
    let w = "";
    //Search for main
    const main = replaceLineBreaks(code).match(mainFnRegex);
    // Search for Funcs
    const functions = replaceLineBreaks(code).match(fnRegex);
    // Search for Variables
    const variables = replaceLineBreaks(code).match(variableRegex);
    variables.forEach(element => {
        w += tumaVarToJsVar(element);
    });
    //Finally write to file
    writeCodeToFile(w);
}


function main() {
    let args = process.argv.slice(2);
    if (args.length !== 1) {
        console.log("Nur eine Datei ist Abitur relevant!");
        return;
    }
    const filename = args[0];
    try {
        const data = fs.readFileSync(filename, 'utf8');
        compile(data);
    } catch (err) {
        console.error(err);
    }
}

main();