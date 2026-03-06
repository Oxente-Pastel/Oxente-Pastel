const fs = require('fs');

console.log("Starting accompaniments fix...");
function processFile(filepath) {
    if (!fs.existsSync(filepath)) return;
    let content = fs.readFileSync(filepath, 'utf8');

    // Replace renderSection labels
    content = content.replace('renderSection("Proteínas", acc.base', 'renderSection("Acompanhamentos Grátis", acc.base');
    content = content.replace('renderSection("Queijos", acc.queijos', 'renderSection("Temperos", acc.queijos');

    // Replace renderCat labels in admin
    content = content.replace('renderCat("Proteínas", acc.base', 'renderCat("Acompanhamentos Grátis", acc.base');
    content = content.replace('renderCat("Queijos", acc.queijos', 'renderCat("Temperos", acc.queijos');

    // Update the help text
    content = content.replace('Escolha até 4 itens (Proteínas, Queijos ou Extras)', 'Escolha até 4 acompanhamentos');

    // Update seedMenuIfEmpty
    const oldSeed = `window.seedMenuIfEmpty = async () => {
    if (!db) return;
    const currentSizes = state.config.sizes || [];
    // Force re-seed to update category names with accents
    if (currentSizes.length > 200) return; // Will always proceed since we have 138 items
    console.log("Seeding full menu to Firestore...");
    await window.saveConfigSafe({ sizes: FULL_MENU }, true);
    window.toast("Cardapio carregado! " + FULL_MENU.length + " itens.");
    console.log("Menu seeded:", FULL_MENU.length, "items.");
};`;

    const oldSeed2 = `window.seedMenuIfEmpty = async () => {
    if (!db) return;
    const currentSizes = state.config.sizes || [];
    // Force re-seed to update category names with accents
    if (currentSizes.length > 200) return; // Will always proceed since we have 138 items
    console.log("Seeding full menu to Firestore...");
    await window.saveConfigSafe({ sizes: FULL_MENU }, true);
    window.toast("Cardapio carregado! " + FULL_MENU.length + " itens.");
    console.log("Menu seeded:", FULL_MENU.length, "items.");
  };`;

    const newSeed = `window.seedMenuIfEmpty = async () => {
    if (!db) return;
    const currentSizes = state.config.sizes || [];
    if (currentSizes.length > 200) return; 
    console.log("Seeding full menu to Firestore...");

    const accompaniments = {
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

    await window.saveConfigSafe({ sizes: FULL_MENU, accompaniments }, true);
    window.toast("Cardapio e Acompanhamentos carregados!");
    console.log("Menu seeded");
};`;

    if (content.includes('window.seedMenuIfEmpty')) {
        let pattern = /window\.seedMenuIfEmpty = async \(\) => \{[\s\S]*?console\.log\("Menu seeded:", FULL_MENU\.length, "items\."\);\n\s*\};/;
        if (pattern.test(content)) {
            content = content.replace(pattern, newSeed);
        }
    }

    fs.writeFileSync(filepath, content, 'utf8');
}

processFile('admin.html');
processFile('index.html');
console.log("Done");
