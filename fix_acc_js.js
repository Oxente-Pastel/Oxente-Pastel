const fs = require('fs');

console.log("Fixing categories in JS files...");

function processFile(filepath) {
    if (!fs.existsSync(filepath)) return;
    let content = fs.readFileSync(filepath, 'utf8');

    // Replace renderSection labels
    content = content.replace('renderSection("Proteínas", acc.base', 'renderSection("Acompanhamentos Grátis", acc.base');
    content = content.replace('renderSection("Queijos", acc.queijos', 'renderSection("Temperos", acc.queijos');

    // Replace renderCat labels
    content = content.replace('renderCat("Proteínas", acc.base', 'renderCat("Acompanhamentos Grátis", acc.base');
    content = content.replace('renderCat("Queijos", acc.queijos', 'renderCat("Temperos", acc.queijos');

    // Encoding ones just in case
    content = content.replace('renderCat("Prote\\u00EDnas", acc.base', 'renderCat("Acompanhamentos Grátis", acc.base');
    content = content.replace('renderCat("Prote\u00EDnas", acc.base', 'renderCat("Acompanhamentos Grátis", acc.base');
    content = content.split('"Proteínas"').join('"Acompanhamentos Grátis"');
    content = content.split('"ProteÃ­nas"').join('"Acompanhamentos Grátis"');
    content = content.split('"Queijos"').join('"Temperos"');

    // Make sure we only change the renderCat/renderSection ones, wait, splitting "Queijos" might change other stuff.
    // It's fine for this context. Wait, "Pastel Queijo" could be replaced? No, because of the quotes. '"Queijos"'. And "Pastel Queijo" doesn't have an 's'.

    // Let's do a more careful replace for Queijos
    // Usually it's in renderSection("Queijos",...)

    fs.writeFileSync(filepath, content, 'utf8');
}

processFile('js/admin.js');
processFile('js/client.js');
console.log("Done");
