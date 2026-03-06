import os

hamburgueres = """    // Hambúrgueres
    { name: "X Burguer", description: "Pão, Hamb, Queijo, Presunto, Salada, B. Palha", price: 10.99, category: "Hambúrgueres" },
    { name: "EGGs Burguer", description: "Pão, Hamb, Queijo, Presunto, Ovos, Salada, B. Palha", price: 12.99, category: "Hambúrgueres" },
    { name: "X Calabresa", description: "Pão, Hamb, Calabresa, Queijo, Presunto, Salada, Milho, B. Palha", price: 19.99, category: "Hambúrgueres" },
    { name: "EGGs Calabresa", description: "Pão, Hamb, Calabresa, Queijo, Presunto, Ovos, Salada, Milho, B. Palha", price: 21.99, category: "Hambúrgueres" },
    { name: "EGGs Bacon", description: "Pão, Hamb, Bacon, Ovos, Queijo, Presunto, Salada, Milho, B. Palha", price: 22.99, category: "Hambúrgueres" },
    { name: "X Frango", description: "Pão, Hamb, Frango, Queijo, Presunto, Salada, Milho, B. Palha", price: 21.99, category: "Hambúrgueres" },
    { name: "EGGs Frango", description: "Pão, Hamb, Frango, Ovos, Queijo, Presunto, Salada, Milho, B. Palha", price: 23.99, category: "Hambúrgueres" },
    { name: "X Costela", description: "Pão, Hamb, Costela, Queijo, Presunto, Salada, Milho, B. Palha", price: 22.99, category: "Hambúrgueres" },
    { name: "EGGs Costela", description: "Pão, Hamb, Costela, Ovos, Queijo, Presunto, Salada, Milho, B. Palha", price: 24.99, category: "Hambúrgueres" },
    { name: "X Filé", description: "Pão, Hamb, Filé, Queijo, Presunto, Salada, Milho, B. Palha", price: 22.99, category: "Hambúrgueres" },
    { name: "EGGs Filé", description: "Pão, Hamb, Filé, Ovos, Queijo, Presunto, Salada, Milho, B. Palha", price: 24.99, category: "Hambúrgueres" },
    { name: "X Coração", description: "Pão, Hamb, Coração, Queijo, Presunto, Salada, Milho, B. Palha", price: 22.99, category: "Hambúrgueres" },
    { name: "EGGs Coração", description: "Pão, Hamb, Coração, Ovos, Queijo, Presunto, Salada, Milho, B. Palha", price: 24.99, category: "Hambúrgueres" },
    { name: "Do Chefe", description: "Pão, Hamb, Frango, Filé, Queijo, Presunto, Salada, Milho, B. Palha", price: 27.99, category: "Hambúrgueres" },
    { name: "X Camarão", description: "Pão, Hamb, Camarão, Queijo, Presunto, Salada, Milho, B. Palha", price: 28.99, category: "Hambúrgueres" },
    { name: "X Tudão", description: "Pão, Hamb, Filé, Frango, Coração, Bacon, Calabresa, Salada, Milho, B. Palha", price: 29.99, category: "Hambúrgueres" },
"""

def inject(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if "X Burguer" in content and "Hambúrgueres" in content:
        print(f"Hambúrgueres already found in {filepath}!")
        return

    # Looking for a good place to inject them, right before Adicionais Hambúrguer
    if "// Adicionais Hambúrguer" in content:
        content = content.replace("// Adicionais Hambúrguer", hamburgueres + "    // Adicionais Hambúrguer")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Injected in {filepath}")
    elif "// Gourmet" in content:
        content = content.replace("// Gourmet", hamburgueres + "    // Gourmet")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Injected in {filepath}")        
    else:
        print(f"Could not inject into {filepath}")

inject('index.html')
inject('js/client.js')
