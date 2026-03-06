const fs = require('fs');

console.log("Fixing Accompaniments data...");

function injectAccompaniments(filepath) {
    if (!fs.existsSync(filepath)) return;
    let content = fs.readFileSync(filepath, 'utf8');

    // Inside window.openPastelModal:
    // const acc = state.config.accompaniments || { base: [], queijos: [], extras: [] };
    // If base is empty, we should populate it immediately to fix the user's issue 
    // without them needing to open the admin panel.
    const fallbackAcc = `let acc = state.config.accompaniments;
  if (!acc || !acc.base || acc.base.length === 0 || acc.base.some(b => b.name === "Proteína 1")) {
      acc = {
        base: [
            { name: "Q. Coalho", available: true },
            { name: "Mussarela", available: true },
            { name: "C. Cheese", available: true },
            { name: "Cheddar", available: true },
            { name: "Catupiry", available: true },
            { name: "Cebola C.", available: true },
            { name: "Calabresa", available: true },
            { name: "Bacon", available: true },
            { name: "Presunto", available: true },
            { name: "Milho", available: true },
            { name: "Azeitona", available: true },
            { name: "Picles", available: true },
            { name: "Goiabada", available: true },
            { name: "Banana", available: true },
            { name: "Morango", available: true },
            { name: "Paçoca", available: true },
            { name: "Leite em Pó", available: true },
            { name: "Gotas", available: true }
        ],
        queijos: [
            { name: "Orégano", available: true },
            { name: "Churrasco", available: true },
            { name: "Alho Frito", available: true },
            { name: "Lemon Pepper", available: true },
            { name: "Pimenta C", available: true },
            { name: "Edu Guedes", available: true },
            { name: "Ana Maria", available: true },
            { name: "Páprica D.", available: true },
            { name: "Chipótle", available: true }
        ],
        extras: []
      };
      // Auto-save to firebase so it persists
      if (typeof window.saveConfigSafe === 'function') {
          setTimeout(() => window.saveConfigSafe({ accompaniments: acc }, true), 500);
      }
  }`;

    const pattern = /const acc = state\.config\.accompaniments \|\| \{ base: \[\], queijos: \[\], extras: \[\] \};/;
    if (pattern.test(content)) {
        content = content.replace(pattern, fallbackAcc);
        fs.writeFileSync(filepath, content, 'utf8');
        console.log("Injected fallback accompaniments in", filepath);
    }
}

injectAccompaniments('index.html');
injectAccompaniments('js/client.js');
console.log("Done");
