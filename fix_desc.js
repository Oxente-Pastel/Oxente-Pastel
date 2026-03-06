const fs = require('fs');

console.log("Fixing description text...");

function processFile(filepath) {
    if (!fs.existsSync(filepath)) return;
    let content = fs.readFileSync(filepath, 'utf8');

    // Make FULL_MENU replacements

    // Replace description string
    content = content.split("Escolha acompanhamentos e tempero na observação").join("3 acompanhamentos + 1 tempero grátis");
    // Also "3 acompanhamentos grátis + 1 tempero. Informe na observação."
    content = content.split("3 acompanhamentos grátis + 1 tempero. Informe na observação.").join("3 acompanhamentos + 1 tempero grátis");

    fs.writeFileSync(filepath, content, 'utf8');
}

processFile('index.html');
processFile('js/admin.js');
processFile('js/client.js');
console.log("Done");
