const fs = require('fs');

console.log("Fixing admin.html...");
let adminContent = fs.readFileSync('admin.html', 'utf8');
adminContent = adminContent.replace('<script type="module">`nimport', '<script type="module">\nimport');
adminContent = adminContent.replace('`n</script>', '\n</script>');
fs.writeFileSync('admin.html', adminContent, 'utf8');

console.log("Fixing index.html...");
let indexContent = fs.readFileSync('index.html', 'utf8');
let clientJs = fs.readFileSync('js/client.js', 'utf8');
let replacement = '<script type="module">\n' + clientJs + '\n</script>';
indexContent = indexContent.replace('<script type="module" src="inject.js"></script>', replacement);
fs.writeFileSync('index.html', indexContent, 'utf8');
console.log("Done");
