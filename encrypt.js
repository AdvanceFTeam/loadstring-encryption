function encryptScript() {
    const script = document.getElementById('script').value;
    const method = document.getElementById('method').value;

    if (!script) {
        alert('please enter a Loadstring script.');
        return;
    }

    let encryptedScript = '';

    switch (method) {
        case 'loadstringobfuscation':
            encryptedScript = loadstringobfuscation(script);
            break;
        default:
            alert('Invalid encryption method.');
            return;
    }

    document.getElementById('encrypted-script').textContent = encryptedScript;
}

function loadstringobfuscation(script) {
    const getRandomOffset = () => Math.floor(Math.random() * 10) + 1;

    let minifiedScript = script.replace(/--.*$/gm, '').replace(/\s+/g, ' ');

    let obfuscatedScript = "";
    let encodedParts = [];
    let randomOffsets = [];

    //  generate random variable/function names
    function generateRandomName() {
        const length = Math.floor(Math.random() * 5) + 5; // Random length
        let name = "";
        const possibleChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        name += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
        const validChars = possibleChars + "0123456789_";
        for (let i = 1; i < length; i++) {
            name += validChars.charAt(Math.floor(Math.random() * validChars.length));
        }
        return name;
    }

    for (let i = 0; i < minifiedScript.length; i++) {
        let charCode = minifiedScript.charCodeAt(i);
        let offset = getRandomOffset();
        randomOffsets.push(offset);
        encodedParts.push((charCode + offset) % 256); 
    }

    // Generates random stuff
    let tableAName = generateRandomName();
    let tableBName = generateRandomName();
    let loopVarName = generateRandomName();
    let stringVarName = generateRandomName();

    obfuscatedScript += `
        local ${tableAName} = {
            ${encodedParts.join(', ')}
        }
        local ${tableBName} = {
            ${randomOffsets.join(', ')}
        }
        local ${stringVarName} = ""
        for ${loopVarName} = 1, #${tableAName} do
            ${stringVarName} = ${stringVarName} .. string.char(${tableAName}[${loopVarName}] - ${tableBName}[${loopVarName}])
        end
        assert(loadstring(${stringVarName}))()
    `;

    // Added useless code 
    obfuscatedScript += `
        local YdUIGkTA = {
            116, 115, 108, 117, 123, 46, 44, 126, 106, 120, 119, 107, 116, 112, 40, 121, 106, 104, 123, 123, 107, 102, 126, 106, 113, 111, 38, 45
        }
        local C89Nongl = {
            4, 1, 3, 7, 7, 6, 10, 10, 5, 5, 3, 2, 6, 9, 8, 10, 8, 2, 6, 8, 8, 5, 10, 1, 2, 1, 4, 4
        }
        local gnr3wuighreg = {
            ${Array.from({ length: 20 }, () => Math.floor(Math.random() * 256)).join(', ')}
        }
    `;

    return obfuscatedScript;
}
