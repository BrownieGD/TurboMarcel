const fs = require('fs');
const ermahnung = "Lass dir das von Marcel nochmal erklären!";

const fnRegex = //g;


function replaceLineBreaks(code) {
    return code.replace(/\r\n/g, '');
}

function compile(code) {
    //Use Regular Expression to find all parts of the code
    const functions = replaceLineBreaks(code).match(fnRegex);
    console.log(functions);
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
