const fs = require('fs');
const ermahnung = "Lass dir das von Marcel nochmal erklären!";

const mainFnRegex = /test/g;
const fnRegex = /test/g;
const variableRegex = /test/g;


/*
    Example Func:
        .Funktion (param1) HelloWorld{
            println("Hello World");
        }.
*/

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
    w += main;
    // Search for Funcs
    const functions = replaceLineBreaks(code).match(fnRegex);
    w += functions;

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