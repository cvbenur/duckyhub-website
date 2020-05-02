// Converting comments into 'REM' strings
function duckyREM(phrase) { return "REM " + phrase }



// Converting line with parameters into their type in Ducky
function duckyDelay(number) { return "DELAY " + number }
function duckyDefaultDelay(number) { return "DEFAULTDELAY " + number }
function duckyRepeat(number) { return "REPEAT " + number }
function duckyString(phrase) { return "STRING " + phrase }



// Returning the Ducky key as a String
function getKey(key) {
    if (key === "gui")              { return "GUI"; }
    else if (key === "windows")     { return "WINDOWS"; }
    else if (key === "app")         { return "APP"; }
    else if (key === "menu")        { return "MENU"; }
    else if (key === "shift")       { return "SHIFT"; }
    else if (key === "alt")         { return "ALT"; }
    else if (key === "ctrl")        { return "CTRL"; }
    else if (key === "dwn")         { return "DOWNARROW"; }
    else if (key === "up")          { return "UPARROW"; }
    else if (key === "lft")         { return "LEFTARROW"; }
    else if (key === "rght")        { return "RIGHTARROW"; }
    else if (key === "brk")         { return "BREAK"; }
    else if (key === "pause")       { return "PAUSE"; }
    else if (key === "caps")        { return "CAPSLOCK"; }
    else if (key === "del")         { return "DELETE"; }
    else if (key === "end")         { return "END"; }
    else if (key === "enter")       { return "ENTER"; }
    else if (key === "esc")         { return "ESCAPE"; }
    else if (key === "home")        { return "HOME"; }
    else if (key === "insrt")       { return "INSERT"; }
    else if (key === "nmlck")       { return "NUMLOCK"; }
    else if (key === "pgup")        { return "PAGEUP"; }
    else if (key === "pgdwn")       { return "PAGEDOWN"; }
    else if (key === "prntscrn")    { return "PRINTSCREEN"; }
    else if (key === "scrlllck")    { return "SCROLLLOCK"; }
    else if (key === "spc")         { return "SPACE"; }
    else if (key === "tab")         { return "TAB"; }
}



// Converting keypress combinations into Ducky
function duckyPressKeys(parts) {
    var duckyKeyString = '';
    
    let i=0;
    parts.forEach(part => function() {
        duckyKeyString += getKey(part);

        if (i < parts.length()) { duckyKeyString += ' '; }
    });

    return duckyKeyString;
}



// Concatenating all lines into the final script in the form of a String
export function duckify(lines) {
    var duckyfied = "";

    lines.forEach(line => function() {
        let parts = line.split(';');

        if (parts[0] === "rem")                 { duckified += duckyREM(parts[1]); }
        else if (parts[0] === "delay")          { duckified += duckyDelay(parts[1]); }
        else if (parts[0] === "defaultdelay")   { duckified += duckyDefaultDelay(parts[1]); }
        else if (parts[0] === "repeat")         { duckified += duckyRepeat(parts[1]); }
        else if (parts[0] === "string")         { duckified += duckyString(parts[1]); }
        else if (parts[0] === /"(gui|windows|app|menu|shift|alt|ctrl|dwn|up|lft|rght|brk|pause|caps|del|end|enter|esc|home|insrt|nmlck|pgup|pgdwn|prntscrn|scrlllck|spc|tab)"/) {
            duckified += duckyPressKeys(parts);
        }

        duckified += '\n';
    });

    return duckified;
}