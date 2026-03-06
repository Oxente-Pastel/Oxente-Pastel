import os
import re

print("Fixing Pastelao limits...")

new_check_limits = """window.checkBuilderLimits = (checkbox) => {
  const type = checkbox.dataset.type;
  if (!type) return;

  // Limit: 3 Accompaniments (base), 1 Tempero (queijos)
  const limit = type === 'base' ? 3 : (type === 'queijos' ? 1 : 99);
  
  const sameTypeCheckboxes = document.querySelectorAll(`.limit-global[data-type="${type}"]`);
  const checkedCount = Array.from(sameTypeCheckboxes).filter(cb => cb.checked).length;

  if (checkedCount >= limit) {
    sameTypeCheckboxes.forEach(cb => {
      if (!cb.checked) cb.disabled = true;
    });
  } else {
    sameTypeCheckboxes.forEach(cb => cb.disabled = false);
  }
};"""

def process_file(filepath):
    if not os.path.exists(filepath):
        return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace checkBuilderLimits
    pattern = r'window\.checkBuilderLimits = \(checkbox\) => \{[\s\S]*?\}\s*else\s*\{[\s\S]*?cb\.disabled = false\);\s*\}\s*\};'
    if re.search(pattern, content):
        content = re.sub(pattern, new_check_limits, content)
        print(f"Updated checkBuilderLimits in {filepath}")
        
    # Replace modal subtitle inside openPastelModal
    # We might have different phrases like "Escolha até 4 itens (Proteínas, Queijos ou Extras)" 
    # or "Escolha até 4 acompanhamentos"
    content = re.sub(
        r'document\.querySelector\(\'#pastel-modal p\'\)\.innerText = ".*?";', 
        'document.querySelector(\'#pastel-modal p\').innerText = "Escolha até 3 acompanhamentos e 1 tempero";', 
        content
    )
    
    # Static HTML subtitle replacement
    content = content.replace(
        '<p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Escolha até 4 itens</p>',
        '<p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Escolha até 3 acomps + 1 temp</p>'
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

process_file('index.html')
process_file('js/client.js')
print("Done")
