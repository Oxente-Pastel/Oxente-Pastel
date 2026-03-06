const fs = require('fs');

console.log("Fixing categories and menu...");

function processFile(filepath) {
    if (!fs.existsSync(filepath)) return;
    let content = fs.readFileSync(filepath, 'utf8');

    // Make "Extra: " items category "Hambúrgueres" instead of "Adicionais"
    // Wait, if they are "Hambúrgueres", they will just show up in the Hambúrgueres tab grid!
    // And what about Açaí items? If we keep them as "Adicionais" they won't show anywhere but in the Açaí modal because renderMenu filters out `n.startsWith('Adicional:')` and `n.startsWith('Calda:')` AND there is no Adicionais tab!

    // In admin.html and js/admin.js we have the FULL_MENU constant
    let newMenu = content;

    // Burger extras
    newMenu = newMenu.replace('{ name: "Extra: Hambúrguer", description: "Adicional", price: 3.99, category: "Adicionais" }', '{ name: "Extra: Hambúrguer", description: "Adicional p/ Hambúrguer", price: 3.99, category: "Hambúrgueres" }');
    newMenu = newMenu.replace('{ name: "Extra: Ovos", description: "Adicional", price: 1.99, category: "Adicionais" }', '{ name: "Extra: Ovos", description: "Adicional p/ Hambúrguer", price: 1.99, category: "Hambúrgueres" }');
    newMenu = newMenu.replace('{ name: "Extra: Cheddar", description: "Adicional", price: 2.99, category: "Adicionais" }', '{ name: "Extra: Cheddar", description: "Adicional p/ Hambúrguer", price: 2.99, category: "Hambúrgueres" }');
    newMenu = newMenu.replace('{ name: "Extra: C. Cheese", description: "Adicional", price: 2.99, category: "Adicionais" }', '{ name: "Extra: C. Cheese", description: "Adicional p/ Hambúrguer", price: 2.99, category: "Hambúrgueres" }');
    newMenu = newMenu.replace('{ name: "Extra: Catupiry", description: "Adicional", price: 3.99, category: "Adicionais" }', '{ name: "Extra: Catupiry", description: "Adicional p/ Hambúrguer", price: 3.99, category: "Hambúrgueres" }');
    newMenu = newMenu.replace('{ name: "Extra: Mussarela", description: "Adicional", price: 1.99, category: "Adicionais" }', '{ name: "Extra: Mussarela", description: "Adicional p/ Hambúrguer", price: 1.99, category: "Hambúrgueres" }');
    newMenu = newMenu.replace('{ name: "Extra: Calabresa", description: "Adicional", price: 3.99, category: "Adicionais" }', '{ name: "Extra: Calabresa", description: "Adicional p/ Hambúrguer", price: 3.99, category: "Hambúrgueres" }');
    newMenu = newMenu.replace('{ name: "Extra: Coração", description: "Adicional", price: 4.99, category: "Adicionais" }', '{ name: "Extra: Coração", description: "Adicional p/ Hambúrguer", price: 4.99, category: "Hambúrgueres" }');
    newMenu = newMenu.replace('{ name: "Extra: Bacon", description: "Adicional", price: 3.99, category: "Adicionais" }', '{ name: "Extra: Bacon", description: "Adicional p/ Hambúrguer", price: 3.99, category: "Hambúrgueres" }');
    newMenu = newMenu.replace('{ name: "Extra: Filé", description: "Adicional", price: 5.99, category: "Adicionais" }', '{ name: "Extra: Filé", description: "Adicional p/ Hambúrguer", price: 5.99, category: "Hambúrgueres" }');
    newMenu = newMenu.replace('{ name: "Extra: Costela", description: "Adicional", price: 5.99, category: "Adicionais" }', '{ name: "Extra: Costela", description: "Adicional p/ Hambúrguer", price: 5.99, category: "Hambúrgueres" }');
    newMenu = newMenu.replace('{ name: "Extra: Frango", description: "Adicional", price: 4.99, category: "Adicionais" }', '{ name: "Extra: Frango", description: "Adicional p/ Hambúrguer", price: 4.99, category: "Hambúrgueres" }');

    // Add rendering icon colors for Batata Frita in renderMenu
    if (newMenu.includes("const isPorcoes = item.category === 'Porções';")) {
        newMenu = newMenu.replace("const isPorcoes = item.category === 'Porções';", "const isPorcoes = item.category === 'Porções' || item.category === 'Batata Frita';");
    }

    // In admin.html, update the categorical selection filter inside "Controle de Estoque"
    if (newMenu.includes("'Porções'")) {
        newMenu = newMenu.replace(/Porções/g, "Batata Frita");
        newMenu = newMenu.replace(/PorÃ§Ãµes/g, "Batata Frita");
    }

    if (content !== newMenu) {
        fs.writeFileSync(filepath, newMenu, 'utf8');
        console.log("Updated FULL_MENU extras & Porcoes in " + filepath);
    }
}

processFile('admin.html');
processFile('index.html');
processFile('js/admin.js');
processFile('js/client.js');

console.log("Done");
