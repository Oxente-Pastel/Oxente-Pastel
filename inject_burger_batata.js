const fs = require('fs');

console.log("Injecting Burger and Batata modals...");

function injectModals(filepath) {
    if (!fs.existsSync(filepath)) return;
    let content = fs.readFileSync(filepath, 'utf8');

    // 1. Filter out "Extra:" from grid rendering
    if (content.includes("!n.startsWith('Calda:');")) {
        content = content.replace("!n.startsWith('Calda:');", "!n.startsWith('Calda:') && !n.startsWith('Extra:');");
    }

    // 2. Modals HTML
    const modalsHtml = `
  <!-- BURGER MODAL -->
  <div id="burger-modal"
    class="fixed inset-0 z-[80] bg-slate-900/60 backdrop-blur-md hidden flex flex-col justify-end sm:justify-center transition-all">
    <div
      class="bg-white w-full max-w-lg mx-auto h-[92vh] sm:h-auto sm:max-h-[90vh] sm:rounded-[2rem] rounded-t-[2.5rem] shadow-2xl flex flex-col relative animate-slide-up">
      <div
        class="px-6 py-5 border-b border-slate-50 flex items-center justify-between bg-gradient-to-r from-orange-50 to-white rounded-t-[2.5rem] sticky top-0 z-10">
        <div>
          <h3 class="font-display font-bold text-xl text-slate-900 flex items-center gap-2"><span
              class="text-2xl">🍔</span> <span id="burger-modal-title">Hambúrguer</span></h3>
          <p class="text-[10px] text-orange-500 font-bold uppercase tracking-wider mt-0.5">Adicione Extras (Opcional)</p>
        </div>
        <button onclick="window.closeBurgerModal()"
          class="p-2 bg-slate-50 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"><i data-lucide="x" class="w-5 h-5"></i></button>
      </div>
      <div class="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar" id="burger-options-container"></div>
      <div class="p-5 border-t border-slate-100 bg-white sm:rounded-b-[2rem] safe-pb">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center bg-slate-100 rounded-xl h-12 px-1">
            <button onclick="window.updateBurgerQty(-1)" class="w-10 h-full flex items-center justify-center text-slate-500 font-bold text-lg active:scale-90 transition-transform">-</button>
            <span id="burger-qty-display" class="w-8 text-center font-display font-bold text-lg text-slate-800">1</span>
            <button onclick="window.updateBurgerQty(1)" class="w-10 h-full flex items-center justify-center text-slate-500 font-bold text-lg active:scale-90 transition-transform">+</button>
          </div>
          <div class="text-right">
            <span class="block text-[10px] font-bold text-slate-400 uppercase">Valor Total</span>
            <span id="burger-total-price" class="font-display font-black text-2xl text-orange-600">R$ 0,00</span>
          </div>
        </div>
        <button onclick="window.addBurgerToCart()" class="w-full py-4 bg-orange-600 text-white rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2">
          <span>Adicionar ao Pedido</span>
          <i data-lucide="check" class="w-4 h-4"></i>
        </button>
      </div>
    </div>
  </div>

  <!-- BATATA MODAL -->
  <div id="batata-modal"
    class="fixed inset-0 z-[80] bg-slate-900/60 backdrop-blur-md hidden flex flex-col justify-end sm:justify-center transition-all">
    <div
      class="bg-white w-full max-w-lg mx-auto h-[92vh] sm:h-auto sm:max-h-[90vh] sm:rounded-[2rem] rounded-t-[2.5rem] shadow-2xl flex flex-col relative animate-slide-up">
      <div
        class="px-6 py-5 border-b border-slate-50 flex items-center justify-between bg-gradient-to-r from-yellow-50 to-white rounded-t-[2.5rem] sticky top-0 z-10">
        <div>
          <h3 class="font-display font-bold text-xl text-slate-900 flex items-center gap-2"><span
              class="text-2xl">🍟</span> <span id="batata-modal-title">Batata Frita</span></h3>
          <p class="text-[10px] text-yellow-600 font-bold uppercase tracking-wider mt-0.5">Escolha até 3 opções exclusivas</p>
        </div>
        <button onclick="window.closeBatataModal()"
          class="p-2 bg-slate-50 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"><i data-lucide="x" class="w-5 h-5"></i></button>
      </div>
      <div class="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar" id="batata-options-container"></div>
      <div class="p-5 border-t border-slate-100 bg-white sm:rounded-b-[2rem] safe-pb">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center bg-slate-100 rounded-xl h-12 px-1">
            <button onclick="window.updateBatataQty(-1)" class="w-10 h-full flex items-center justify-center text-slate-500 font-bold text-lg active:scale-90 transition-transform">-</button>
            <span id="batata-qty-display" class="w-8 text-center font-display font-bold text-lg text-slate-800">1</span>
            <button onclick="window.updateBatataQty(1)" class="w-10 h-full flex items-center justify-center text-slate-500 font-bold text-lg active:scale-90 transition-transform">+</button>
          </div>
          <div class="text-right">
            <span class="block text-[10px] font-bold text-slate-400 uppercase">Valor Total</span>
            <span id="batata-total-price" class="font-display font-black text-2xl text-yellow-600">R$ 0,00</span>
          </div>
        </div>
        <button onclick="window.addBatataToCart()" class="w-full py-4 bg-yellow-500 text-slate-900 rounded-xl font-black text-sm shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2">
          <span>Adicionar ao Pedido</span>
          <i data-lucide="check" class="w-4 h-4"></i>
        </button>
      </div>
    </div>
  </div>`;

    if (!content.includes('id="burger-modal"')) {
        content = content.replace('<!-- PAINEL ADMIN E LOGIN -->', modalsHtml + '\n  <!-- PAINEL ADMIN E LOGIN -->');
    }

    // 3. JS Logic
    const modalsJs = `
// ==================== BURGER MODAL ====================
window.openBurgerModal = (item) => {
  state.currentBurger = item;
  state.burgerQty = 1;
  state.burgerExtrasTotal = 0;

  document.getElementById('burger-modal-title').innerText = item.name;
  document.getElementById('burger-qty-display').innerText = '1';
  document.getElementById('burger-total-price').innerText = \`R$ \${item.price.toFixed(2).replace('.', ',')}\`;

  const container = document.getElementById('burger-options-container');
  container.innerHTML = '';
  
  container.innerHTML += \`
    <div class="bg-orange-50 border border-orange-100 p-4 rounded-2xl flex items-center gap-3 mb-2">
      <div class="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-lg shrink-0">🍔</div>
      <div>
        <h4 class="text-xs font-black text-orange-800 uppercase">Inclui</h4>
        <p class="text-sm font-bold text-slate-700 leading-tight">\${item.description || 'Hambúrguer tradicional'}</p>
      </div>
    </div>
  \`;

  const extras = (state.config.sizes || []).filter(i => i.available !== false && i.name.startsWith('Extra:'));
  
  if (extras.length > 0) {
    let html = \`<h4 class="text-xs font-black text-slate-500 uppercase tracking-widest mb-3 mt-4 flex items-center gap-2"><span>🍟</span> Adicionais Extras</h4><div class="grid grid-cols-2 gap-2">\`;
    extras.forEach(opt => {
      const displayName = opt.name.replace('Extra:', '').trim();
      const priceStr = \`+R$ \${opt.price.toFixed(2).replace('.', ',')}\`;
      html += \`
        <label class="cursor-pointer group">
          <input type="checkbox" class="burger-extra-checkbox hidden" value="\${displayName}" data-price="\${opt.price}" onchange="window.updateBurgerExtrasTotal()">
          <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-orange-50 hover:border-orange-200 transition-all flex items-center justify-between gap-1">
            <span>\${displayName}</span>
            <div class="flex flex-col items-end shrink-0">
              <span class="text-[10px] text-orange-600 font-bold">\${priceStr}</span>
            </div>
          </div>
        </label>\`;
    });
    html += \`</div>\`;
    container.innerHTML += html;
  }

  container.innerHTML += \`
    <div class="mt-4">
      <label class="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Observação</label>
      <textarea id="burger-obs" rows="2" placeholder="Ex: sem salada, molho à parte..." class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange-300 resize-none"></textarea>
    </div>
  \`;

  document.getElementById('burger-modal').classList.remove('hidden');
  window.refreshIcons();

  document.querySelectorAll('.burger-extra-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      const card = cb.closest('label').querySelector('div');
      if (cb.checked) {
        card?.classList.add('bg-orange-50', 'border-orange-400');
        card?.classList.remove('bg-slate-50', 'border-slate-200');
      } else {
        card?.classList.remove('bg-orange-50', 'border-orange-400');
        card?.classList.add('bg-slate-50', 'border-slate-200');
      }
    });
  });
};

window.closeBurgerModal = () => {
  document.getElementById('burger-modal').classList.add('hidden');
  state.currentBurger = null;
  state.burgerExtrasTotal = 0;
};

window.updateBurgerExtrasTotal = () => {
  const checkboxes = document.querySelectorAll('.burger-extra-checkbox:checked');
  state.burgerExtrasTotal = Array.from(checkboxes).reduce((sum, cb) => sum + parseFloat(cb.dataset.price || 0), 0);
  if (state.currentBurger) {
    const total = (state.currentBurger.price + state.burgerExtrasTotal) * (state.burgerQty || 1);
    document.getElementById('burger-total-price').innerText = \`R$ \${total.toFixed(2).replace('.', ',')}\`;
  }
};

window.updateBurgerQty = (d) => {
  state.burgerQty = Math.max(1, (state.burgerQty || 1) + d);
  document.getElementById('burger-qty-display').innerText = state.burgerQty;
  if (state.currentBurger) {
    const total = (state.currentBurger.price + (state.burgerExtrasTotal || 0)) * state.burgerQty;
    document.getElementById('burger-total-price').innerText = \`R$ \${total.toFixed(2).replace('.', ',')}\`;
  }
};

window.addBurgerToCart = () => {
  if (!state.currentBurger) return;
  const extras = Array.from(document.querySelectorAll('.burger-extra-checkbox:checked')).map(cb => cb.value);
  const obs = document.getElementById('burger-obs')?.value.trim();
  let obsText = extras.length > 0 ? \`Extras: \${extras.join(', ')}\` : '';
  if (obs) obsText += obsText ? \` | Obs: \${obs}\` : \`Obs: \${obs}\`;
  
  const price = state.currentBurger.price + (state.burgerExtrasTotal || 0);
  const idx = state.cart.findIndex(c => c.name === state.currentBurger.name && c.obs === obsText && c.price === price);
  if (idx > -1) {
    state.cart[idx].qty += state.burgerQty;
  } else {
    state.cart.push({ id: Date.now() + Math.random(), name: state.currentBurger.name, price, obs: obsText, qty: state.burgerQty });
  }
  window.closeBurgerModal();
  window.toast("Hambúrguer adicionado!");
  window.renderCart();
  window.saveFormData();
};

// ==================== BATATA MODAL ====================
window.openBatataModal = (item) => {
  state.currentBatata = item;
  state.batataQty = 1;

  document.getElementById('batata-modal-title').innerText = item.name;
  document.getElementById('batata-qty-display').innerText = '1';
  document.getElementById('batata-total-price').innerText = \`R$ \${item.price.toFixed(2).replace('.', ',')}\`;

  const container = document.getElementById('batata-options-container');
  container.innerHTML = '';

  const isTripla = item.name.includes('+ 3 Adicionais');

  if (isTripla) {
      container.innerHTML += \`
        <div class="bg-yellow-50 border border-yellow-200 p-4 rounded-2xl flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-xl shrink-0">🍟</div>
          <div>
            <h4 class="text-xs font-black text-yellow-800 uppercase">Incluso</h4>
            <p class="text-sm font-bold text-slate-700">Porção de fritas + 3 escolhas</p>
          </div>
        </div>
      \`;

      const accompaniments = (state.config.accompaniments && state.config.accompaniments.base) ? state.config.accompaniments.base : [];
      const extras = (state.config.sizes || []).filter(i => i.available !== false && i.name.startsWith('Extra:'));
      
      // Merge extras + accompaniments as possible side choices for the fries.
      const allChoices = [
          ...accompaniments.map(a => a.name),
          ...extras.map(e => e.name.replace('Extra:', '').trim())
      ];
      // remove duplicates
      const uniqueChoices = [...new Set(allChoices)];

      let html = \`<h4 class="text-xs font-black text-slate-700 uppercase mb-3 text-center">Escolha exatamente 3: <span id="batata-counter" class="text-yellow-600 font-bold">0/3</span></h4>
      <div class="grid grid-cols-2 gap-2 mb-4">\`;
      
      uniqueChoices.forEach(opt => {
          html += \`
          <label class="cursor-pointer group">
            <input type="checkbox" class="batata-adic-checkbox hidden" value="\${opt}" onchange="window.checkBatataLimits(this)">
            <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-yellow-50 hover:border-yellow-200 transition-all flex items-center justify-center text-center">
              <span>\${opt}</span>
            </div>
          </label>\`;
      });
      html += \`</div>\`;
      container.innerHTML += html;
  } else {
      container.innerHTML += \`
        <div class="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center gap-3 mb-2">
          <div><h4 class="text-xs font-black text-slate-500 uppercase">Aviso</h4><p class="text-sm font-bold text-slate-700">Essa versão acompanha apenas Batata Frita Tradicional.</p></div>
        </div>
      \`;
  }

  container.innerHTML += \`
    <div class="mt-2">
      <label class="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Observação</label>
      <textarea id="batata-obs" rows="2" placeholder="Ex: menos sal, ketchup separado..." class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-yellow-300 resize-none"></textarea>
    </div>
  \`;

  document.getElementById('batata-modal').classList.remove('hidden');
  window.refreshIcons();
};

window.checkBatataLimits = (cb) => {
    const checkboxes = document.querySelectorAll('.batata-adic-checkbox');
    const checkedCount = Array.from(checkboxes).filter(c => c.checked).length;
    document.getElementById('batata-counter').innerText = \`\${checkedCount}/3\`;

    checkboxes.forEach(c => {
        const card = c.closest('label').querySelector('div');
        if (c.checked) {
            card?.classList.add('bg-yellow-100', 'border-yellow-400', 'text-yellow-800');
            card?.classList.remove('bg-slate-50', 'border-slate-200', 'text-slate-500');
        } else {
            card?.classList.remove('bg-yellow-100', 'border-yellow-400', 'text-yellow-800');
            card?.classList.add('bg-slate-50', 'border-slate-200', 'text-slate-500');
            if (checkedCount >= 3) {
                c.disabled = true;
                card?.classList.add('opacity-50');
            } else {
                c.disabled = false;
                card?.classList.remove('opacity-50');
            }
        }
    });
};

window.closeBatataModal = () => {
  document.getElementById('batata-modal').classList.add('hidden');
  state.currentBatata = null;
};

window.updateBatataQty = (d) => {
  state.batataQty = Math.max(1, (state.batataQty || 1) + d);
  document.getElementById('batata-qty-display').innerText = state.batataQty;
  if (state.currentBatata) {
    const total = state.currentBatata.price * state.batataQty;
    document.getElementById('batata-total-price').innerText = \`R$ \${total.toFixed(2).replace('.', ',')}\`;
  }
};

window.addBatataToCart = () => {
  if (!state.currentBatata) return;
  const isTripla = state.currentBatata.name.includes('+ 3 Adicionais');
  const checked = Array.from(document.querySelectorAll('.batata-adic-checkbox:checked')).map(cb => cb.value);

  if (isTripla && checked.length !== 3) {
      return window.toast("Escolha exatamente 3 adicionais!", "error");
  }

  const obs = document.getElementById('batata-obs')?.value.trim();
  let obsText = checked.length > 0 ? \`Adicionais: \${checked.join(' + ')}\` : '';
  if (obs) obsText += obsText ? \` | Obs: \${obs}\` : \`Obs: \${obs}\`;
  
  const idx = state.cart.findIndex(c => c.name === state.currentBatata.name && c.obs === obsText);
  if (idx > -1) {
    state.cart[idx].qty += state.batataQty;
  } else {
    state.cart.push({ id: Date.now() + Math.random(), name: state.currentBatata.name, price: state.currentBatata.price, obs: obsText, qty: state.batataQty });
  }
  window.closeBatataModal();
  window.toast("Batata adicionada!");
  window.renderCart();
  window.saveFormData();
};
`;

    if (!content.includes('window.openBurgerModal')) {
        content = content.replace('window.closeSucoModal = () => {', modalsJs + '\nwindow.closeSucoModal = () => {');
    }

    // 4. Update click handler in renderMenu
    if (content.includes("if (item.name.includes('Suco da Fruta')) {")) {
        if (!content.includes("else if (item.category === 'Hambúrgueres' || item.category === 'Gourmet') {")) {
            content = content.replace("if (item.name.includes('Suco da Fruta')) {", `if (item.name.includes('Suco da Fruta')) {
        window.openSucoModal(item);
      } else if (item.category === 'Hambúrgueres' || item.category === 'Gourmet') {
        window.openBurgerModal(item);
      } else if (item.category === 'Batata Frita' || item.category === 'Porções') {
        if (item.name.includes('+ 3 Adicionais')) {
           window.openBatataModal(item);
        } else {
           window.toggleSelection(item.name);
        }
      } else if (false) {`);
        }
    }

    fs.writeFileSync(filepath, content, 'utf8');
    console.log("Updated", filepath);
}

injectModals('index.html');
injectModals('js/client.js');

console.log("Done");
