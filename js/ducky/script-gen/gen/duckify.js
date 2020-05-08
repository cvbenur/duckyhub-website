// Define array of keypresses
export const keypresses = [
    'GUI',
    'WINDOWS',
    'APP',
    'MENU',
    'SHIFT',
    'ALT',
    'CTRL',
    'CONTROL',
    'DOWNARROW',
    'DOWN',
    'UPARROW',
    'UP',
    'LEFTARROW',
    'LEFT',
    'BREAK',
    'PAUSE',
    'CAPSLOCK',
    'DELETE',
    'DEL',
    'END',
    'ENTER',
    'ESCAPE',
    'HOME',
    'INSERT',
    'NUMLOCK',
    'PAGEUP',
    'PAGEDOWN',
    'PRINTSCREEN',
    'SCROLLLOCK',
    'SPACE',
    'TAB'
];

// Converting comments into 'REM' strings
function duckyREM (phrase) { return "REM " + phrase }



// Converting line with parameters into their type in Ducky
function duckyDelay (number) { return "DELAY " + number }
function duckyDefaultDelay (number) { return "DEFAULTDELAY " + number }
function duckyRepeat (number) { return "REPEAT " + number }
function duckyString (phrase) { return "STRING " + phrase }



// Converting keypress combinations into Ducky
function duckyPressKeys (parts) {

    let duckyKeyString = '';


    for (const part of parts) {

        const found = keypresses.find(k => k === part.toUpperCase());

        if (found !== undefined) {
            duckyKeyString += found + ' ';
        }
    }


    return duckyKeyString.trim();
}



// Concatenating all lines into the final script in the form of a String
export function duckifyAndCodify (lines) {
    
    let duckified = "";

    for (let i = 0; i < lines.length; i ++) {


        let currentLine = '';

        switch (lines[i].instruction) {

            case 'rem':
                currentLine = duckyREM(lines[i].body);
                break;
            
            case 'delay':
                currentLine = duckyDelay(lines[i].body);
                break;

            case 'defaultdelay':
                currentLine = duckyDefaultDelay(lines[i].body);
                break;

            case 'repeat':
                currentLine = duckyRepeat(lines[i].body);
                break;
            
            case 'string':
                currentLine = duckyString(lines[i].body);
                break;
            
            case 'key':
                currentLine = duckyPressKeys(lines[i].body.split(' '));
                break;

            default:
        }

        duckified += `${currentLine.replace(/\\/g, '\\\\')}\n`;
        codifyLine(currentLine, lines[i].instruction);
    }


    return  watermarkScript(duckified);
}




// Define watermark to go on top of scripts
const watermark = {
    start: [
        'REM    #    Script généré sur DuckyHub - (C) 2020 Copyright : DuckyHub',
        'REM    #    https://duckyhub.efrei.tech',
        'REM    #',
        "REM    #    Merci d'utiliser DuckyHub :)",
        'REM    #',
        'REM    #    DEBUT DU SCRIPT',
    ],
    end: [
        'REM    #    FIN DU SCRIPT'
    ]
}

// Add watermark to generated script
function watermarkScript (script) {

    let watermarked = '';


    // Add prefix watermark to script
    for (const line of watermark.start) {
        watermarked += line + '\n';
    }


    watermarked += '\n' + script + '\n';


    // Add suffix watermark to script
    for (let i = 0; i < watermark.end.length; i++) {
        watermarked += watermark.end[i];

        if (i === watermark.end.length - 1) {
            watermarked += '\n'
        }
    }


    return watermarked;
}



// Defining the render destination for the line script
const renderedLine = document.getElementById('line-script-render');

// Codify line
function codifyLine (line, type) {

    let spanLine = document.createElement('span');
    spanLine.className = 'new-line';
    let codified = '';

    switch (type) {

        case 'string':
            codified = `<span class="cyan-text">STRING </span>${line.split('STRING ')[1]}`;
            break;

        case 'rem':
            codified = `<span class="grey-text">${line}</span>`;
            break;

        case 'delay':
            codified = `<span class="orange-text">DELAY </span>${line.split('DELAY ')[1]}`;
            break;

        case 'repeat':
            codified = `<span class="orange-text">REPEAT </span>${line.split('REPEAT ')[1]}`;
            break;

        case 'key':
            codified = `<span class="blue-text">${line}</span>`;
            break;

        default:
    }

    spanLine.innerHTML = codified;
    renderedLine.appendChild(spanLine);
}
