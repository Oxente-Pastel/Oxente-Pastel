const fs = require('fs');

console.log("Fixing categories and buttons...");

const buttonsHtml = `          <button onclick="window.filterCategory('Todos')"
            class="cat-btn active px-6 py-2.5 rounded-full text-xs font-black bg-brand-900 text-white shadow-lg whitespace-nowrap active:scale-95 transition-all"
            data-cat="Todos">Todos</button>
          <button onclick="window.filterCategory('Pastéis')"
            class="cat-btn px-6 py-2.5 rounded-full text-xs font-black bg-white text-slate-500 border border-slate-200 whitespace-nowrap active:scale-95 transition-all"
            data-cat="Pastéis">Pastéis</button>
          <button onclick="window.filterCategory('Pastelão')"
            class="cat-btn px-6 py-2.5 rounded-full text-xs font-black bg-white text-slate-500 border border-slate-200 whitespace-nowrap active:scale-95 transition-all"
            data-cat="Pastelão">Pastelão</button>
          <button onclick="window.filterCategory('Hambúrgueres')"
            class="cat-btn px-6 py-2.5 rounded-full text-xs font-black bg-white text-slate-500 border border-slate-200 whitespace-nowrap active:scale-95 transition-all"
            data-cat="Hambúrgueres">Hambúrgueres</button>
          <button onclick="window.filterCategory('Gourmet')"
            class="cat-btn px-6 py-2.5 rounded-full text-xs font-black bg-white text-slate-500 border border-slate-200 whitespace-nowrap active:scale-95 transition-all"
            data-cat="Gourmet">Gourmet</button>
          <button onclick="window.filterCategory('Porções')"
            class="cat-btn px-6 py-2.5 rounded-full text-xs font-black bg-white text-slate-500 border border-slate-200 whitespace-nowrap active:scale-95 transition-all"
            data-cat="Porções">Porções</button>
          <button onclick="window.filterCategory('Açaí')"
            class="cat-btn px-6 py-2.5 rounded-full text-xs font-black bg-white text-slate-500 border border-slate-200 whitespace-nowrap active:scale-95 transition-all"
            data-cat="Açaí">Açaí</button>
          <button onclick="window.filterCategory('Bebidas')"
            class="cat-btn px-6 py-2.5 rounded-full text-xs font-black bg-white text-slate-500 border border-slate-200 whitespace-nowrap active:scale-95 transition-all"
            data-cat="Bebidas">Bebidas</button>`;

function processFile(filepath) {
    if (!fs.existsSync(filepath)) return;
    let content = fs.readFileSync(filepath, 'utf8');

    // Replace old buttons structure
    const pattern = /<button onclick="window.filterCategory\('Todos'\)[\s\S]*?<button onclick="window.filterCategory\('Bebidas'\)[\s\S]*?Bebidas<\/button>/;
    if (pattern.test(content)) {
        content = content.replace(pattern, buttonsHtml);
        console.log("Replaced buttons in", filepath);
    }

    // Replace logic where "Monte o Seu" triggered the Pastel Modal
    if (content.includes("item.category === 'Monte o Seu'")) {
        content = content.split("item.category === 'Monte o Seu'").join("item.category === 'Pastelão'");
        console.log("Replaced Monte o Seu -> Pastelão trigger in", filepath);
    }

    fs.writeFileSync(filepath, content, 'utf8');
}

processFile('index.html');
processFile('js/client.js');
console.log("Done");
