const fs = require('fs');

console.log("Fixing limits in client.js and index.html...");

const new_check_limits = `window.checkBuilderLimits = (checkbox) => {
  const type = checkbox.dataset.type;
  if (!type) return;

  // Limit: 3 Accompaniments (base), 1 Tempero (queijos)
  const limit = type === 'base' ? 3 : (type === 'queijos' ? 1 : 99);
  
  const sameTypeCheckboxes = document.querySelectorAll(\`.limit-global[data-type="\${type}"]\`);
  const checkedCount = Array.from(sameTypeCheckboxes).filter(cb => cb.checked).length;

  if (checkedCount >= limit) {
    sameTypeCheckboxes.forEach(cb => {
      if (!cb.checked) cb.disabled = true;
    });
  } else {
    sameTypeCheckboxes.forEach(cb => cb.disabled = false);
  }
};`;

function processFile(filepath) {
    if (!fs.existsSync(filepath)) return;
    let content = fs.readFileSync(filepath, 'utf8');

    // Make FULL_MENU replacements
    const pattern = /window\.checkBuilderLimits = \(checkbox\) => \{[\s\S]*?\}\s*else\s*\{[\s\S]*?cb\.disabled = false\);\s*\}\s*\};/;
    if (pattern.test(content)) {
        content = content.replace(pattern, new_check_limits);
        console.log("Replaced checkBuilderLimits in", filepath);
    }

    // Replace modal subtitle
    let p2 = /document\.querySelector\('#pastel-modal p'\)\.innerText = ".*?";/;
    if (p2.test(content)) {
        content = content.replace(p2, 'document.querySelector(\'#pastel-modal p\').innerText = "Escolha até 3 acompanhamentos e 1 tempero";');
    }

    content = content.replace(
        '<p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Escolha até 4 itens</p>',
        '<p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Escolha até 3 acomps + 1 temp</p>'
    );

    // Also "Escolha até 4 acompanhamentos"
    content = content.replace('Escolha até 4 acompanhamentos', 'Escolha até 3 acompanhamentos e 1 tempero');

    fs.writeFileSync(filepath, content, 'utf8');
}

processFile('index.html');
processFile('js/client.js');
console.log("Done");
