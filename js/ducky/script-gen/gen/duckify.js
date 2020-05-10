// Define array of keypresses
export const keypresses = [
    // Special keys
    'GUI',
    'WINDOWS',
    'APP',
    'MENU',
    'SHIFT',
    'ALT',
    'CTRL',
    'CONTROL',
    'DOWNARROW', 'DOWN',
    'UPARROW', 'UP',
    'LEFTARROW', 'LEFT',
    'RIGHTARROW', 'RIGHT',
    'BREAK',
    'PAUSE',
    'CAPSLOCK',
    'DELETE', 'DEL',
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
    'TAB',

    // Alphabet
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',

    // Numbers
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',

    // F keys
    'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'
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
export function duckifyAndCodify (lines, script) {
    
    let duckified = "";

    for (let i = 0; i < lines.length; i ++) {


        let currentLine = '';

        switch (lines[i].instruction.toUpperCase()) {

            case 'REM':
                currentLine = duckyREM(lines[i].body);
                break;
            
            case 'DELAY':
                currentLine = duckyDelay(lines[i].body);
                break;

            case 'DEFAULTDELAY':
                currentLine = duckyDefaultDelay(lines[i].body);
                break;

            case 'REPEAT':
                currentLine = duckyRepeat(lines[i].body);
                break;
            
            case 'STRING':
                currentLine = duckyString(lines[i].body);
                break;
            
            case 'KEY':
                currentLine = duckyPressKeys(lines[i].body.split(' '));
                break;

            default:
        }

        duckified += `${currentLine.replace(/\\/g, '\\\\')}\n`;
        codifyLine(currentLine, lines[i].instruction, script);
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




// Codify line
function codifyLine (line, type, script) {

    let spanLine = document.createElement('span');
    spanLine.className = 'new-line';
    let codified = '';

    switch (type.toUpperCase()) {

        case 'STRING':
            codified = `<span class="cyan-text">STRING </span>${line.split('STRING ')[1]}`;
            break;

        case 'REM':
            codified = `<span class="grey-text">${line}</span>`;
            break;

        case 'DELAY':
            codified = `<span class="orange-text">DELAY </span>${line.split('DELAY ')[1]}`;
            break;

        case 'REPEAT':
            codified = `<span class="orange-text">REPEAT </span>${line.split('REPEAT ')[1]}`;
            break;

        case 'KEY':
            codified = `<span class="blue-text">${line}</span>`;
            break;

        default:
    }

    spanLine.innerHTML = codified;
    document.getElementById(`${script}-script-render`).appendChild(spanLine);
}
