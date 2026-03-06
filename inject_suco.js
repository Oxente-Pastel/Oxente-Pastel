const fs = require('fs');

console.log("Injecting Suco Modal...");

function processFile(filepath) {
    if (!fs.existsSync(filepath)) return;
    let content = fs.readFileSync(filepath, 'utf8');

    // 1. Inject HTML after acai-modal (which ends around line 608 with "</div>\n  </div>\n\n  <!-- PAINEL ADMIN E LOGIN -->")
    const sucoModalHtml = `
  <!-- SUCO MODAL -->
  <div id="suco-modal"
    class="fixed inset-0 z-[80] bg-slate-900/60 backdrop-blur-md hidden flex flex-col justify-end sm:justify-center transition-all">
    <div
      class="bg-white w-full max-w-lg mx-auto h-[92vh] sm:h-auto sm:max-h-[90vh] sm:rounded-[2rem] rounded-t-[2.5rem] shadow-2xl flex flex-col relative animate-slide-up">
      <div
        class="px-6 py-5 border-b border-slate-50 flex items-center justify-between bg-gradient-to-r from-orange-50 to-white rounded-t-[2.5rem] sticky top-0 z-10">
        <div>
          <h3 class="font-display font-bold text-xl text-slate-900 flex items-center gap-2"><span
              class="text-2xl">🥤</span> <span id="suco-modal-title">Suco da Fruta</span></h3>
          <p class="text-[10px] text-orange-500 font-bold uppercase tracking-wider mt-0.5">Escolha o seu sabor favorito</p>
        </div>
        <button onclick="window.closeSucoModal()"
          class="p-2 bg-slate-50 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"><i data-lucide="x"
            class="w-5 h-5"></i></button>
      </div>

      <div class="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar" id="suco-options-container"></div>

      <div class="p-5 border-t border-slate-100 bg-white sm:rounded-b-[2rem] safe-pb">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center bg-slate-100 rounded-xl h-12 px-1">
            <button onclick="window.updateSucoQty(-1)"
              class="w-10 h-full flex items-center justify-center text-slate-500 font-bold text-lg active:scale-90 transition-transform">-</button>
            <span id="suco-qty-display" class="w-8 text-center font-display font-bold text-lg text-slate-800">1</span>
            <button onclick="window.updateSucoQty(1)"
              class="w-10 h-full flex items-center justify-center text-slate-500 font-bold text-lg active:scale-90 transition-transform">+</button>
          </div>
          <div class="text-right">
            <span class="block text-[10px] font-bold text-slate-400 uppercase">Valor Total</span>
            <span id="suco-total-price" class="font-display font-black text-2xl text-orange-600">R$ 0,00</span>
          </div>
        </div>
        <button onclick="window.addSucoToCart()"
          class="w-full py-4 bg-orange-600 text-white rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2">
          <span>Adicionar ao Pedido</span>
          <i data-lucide="check" class="w-4 h-4"></i>
        </button>
      </div>
    </div>
  </div>
`;

    if (!content.includes('id="suco-modal"')) {
        content = content.replace('<!-- PAINEL ADMIN E LOGIN -->', sucoModalHtml + '\n  <!-- PAINEL ADMIN E LOGIN -->');
    }

    // 2. Inject JS functions
    const sucoJs = `
window.openSucoModal = (item) => {
  state.currentSuco = item;
  state.sucoQty = 1;

  document.getElementById('suco-modal-title').innerText = item.name;
  document.getElementById('suco-qty-display').innerText = '1';
  document.getElementById('suco-total-price').innerText = \`R$ \${item.price.toFixed(2).replace('.', ',')}\`;

  const container = document.getElementById('suco-options-container');
  container.innerHTML = '';

  const flavors = ['Laranja', 'Maracujá', 'Maracujá c/ beterraba', 'Mangaba', 'Graviola', 'Umbu', 'Manga', 'Caju'];
  
  let html = \`<h4 class="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Selecione o Sabor</h4>
    <div class="grid grid-cols-2 gap-2">\`;

  flavors.forEach((opt, idx) => {
    html += \`
      <label class="cursor-pointer group">
        <input type="radio" name="suco-flavor" class="suco-flavor-radio hidden" value="\${opt}" \${idx===0 ? 'checked':''} onchange="window.updateSucoSelection()">
        <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-orange-50 hover:border-orange-200 transition-all flex items-center justify-between">
          <span>\${opt}</span>
          <div class="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center bg-white group-active:scale-90">
            <div class="flavor-dot w-2.5 h-2.5 bg-orange-500 rounded-full scale-0 transition-transform"></div>
          </div>
        </div>
      </label>\`;
  });
  html += \`</div>\`;
  container.innerHTML += html;
  
  // Obs field
  container.innerHTML += \`
    <div class="mt-4">
      <label class="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Observação</label>
      <textarea id="suco-obs" rows="2" placeholder="Ex: sem açúcar, com gelo..." class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange-300 resize-none"></textarea>
    </div>
  \`;

  document.getElementById('suco-modal').classList.remove('hidden');
  window.refreshIcons();
  window.updateSucoSelection();
};

window.closeSucoModal = () => {
  document.getElementById('suco-modal').classList.add('hidden');
  state.currentSuco = null;
};

window.updateSucoSelection = () => {
  document.querySelectorAll('.suco-flavor-radio').forEach(radio => {
    const card = radio.closest('label').querySelector('div');
    const dot = radio.closest('label').querySelector('.flavor-dot');
    if (radio.checked) {
      card?.classList.add('bg-orange-50', 'border-orange-400');
      card?.classList.remove('bg-slate-50', 'border-slate-200');
      if (dot) dot.style.transform = 'scale(1)';
    } else {
      card?.classList.remove('bg-orange-50', 'border-orange-400');
      card?.classList.add('bg-slate-50', 'border-slate-200');
      if (dot) dot.style.transform = 'scale(0)';
    }
  });
};

window.updateSucoQty = (d) => {
  state.sucoQty = Math.max(1, (state.sucoQty || 1) + d);
  document.getElementById('suco-qty-display').innerText = state.sucoQty;
  if (state.currentSuco) {
    const total = state.currentSuco.price * state.sucoQty;
    document.getElementById('suco-total-price').innerText = \`R$ \${total.toFixed(2).replace('.', ',')}\`;
  }
};

window.addSucoToCart = () => {
  if (!state.currentSuco) return;

  const selectedFlavor = document.querySelector('input[name="suco-flavor"]:checked');
  const flavorVal = selectedFlavor ? selectedFlavor.value : 'Laranja';
  const obs = document.getElementById('suco-obs') ? document.getElementById('suco-obs').value.trim() : '';
  
  const obsText = \`Sabor: \${flavorVal}\${obs ? ' | ' + obs : ''}\`;
  
  const idx = state.cart.findIndex(c => c.name === state.currentSuco.name && c.obs === obsText);
  if (idx > -1) {
    state.cart[idx].qty += state.sucoQty;
  } else {
    state.cart.push({
      id: Date.now() + Math.random(),
      name: state.currentSuco.name,
      price: state.currentSuco.price,
      obs: obsText,
      qty: state.sucoQty
    });
  }
  
  window.closeSucoModal();
  window.toast("Suco adicionado!");
  window.renderCart();
  window.saveFormData();
};
`;

    if (!content.includes('window.openSucoModal')) {
        content = content.replace('window.closeAcaiModal = () => {', sucoJs + '\nwindow.closeAcaiModal = () => {');
    }

    // 3. Update click handler in renderMenu
    // "if (item.category === 'Pastelão') {" or "if (item.category === 'Monte o Seu') {" inside renderMenu
    const p1 = "if (item.category === 'Pastelão') {";
    const p2 = "if (item.category === 'Monte o Seu') {";

    if (content.includes(p1) && !content.includes("else if (item.name.includes('Suco da Fruta')) {")) {
        content = content.replace(p1, `if (item.name.includes('Suco da Fruta')) {
        window.openSucoModal(item);
      } else ` + p1);
    } else if (content.includes(p2) && !content.includes("else if (item.name.includes('Suco da Fruta')) {")) {
        content = content.replace(p2, `if (item.name.includes('Suco da Fruta')) {
        window.openSucoModal(item);
      } else ` + p2);
    }

    fs.writeFileSync(filepath, content, 'utf8');
    console.log("Updated", filepath);
}

processFile('index.html');
processFile('js/client.js');

console.log("Done");
