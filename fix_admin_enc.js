const fs = require('fs');
let content = fs.readFileSync('admin.html', 'utf8');
content = content.replace('renderCat("ProteÃ­nas", acc.base', 'renderCat("Acompanhamentos Grátis", acc.base');
content = content.replace('renderCat("Temperos", acc.queijos', 'renderCat("Temperos", acc.queijos'); // Wait, already Queijos?
// Let's just do a generic replace
content = content.replace('"ProteÃ­nas"', '"Acompanhamentos Grátis"');
fs.writeFileSync('admin.html', content, 'utf8');
console.log("Fixed admin");
