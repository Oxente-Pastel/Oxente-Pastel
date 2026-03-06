const fs = require('fs');

console.log("Starting replacement...");

const full_menu = `const FULL_MENU = [
    // Acai
    { name: "Açaí 1kg", description: "Puro Açaí", price: 44.99, category: "Açaí" },
    { name: "Açaí 500ml", description: "Puro Açaí", price: 24.99, category: "Açaí" },
    { name: "Açaí 300ml", description: "Puro Açaí", price: 17.99, category: "Açaí" },
    // Acai Extras
    { name: "Adicional: Sorvete Morango", description: "Acompanhamento Açaí", price: 5.00, category: "Adicionais" },
    { name: "Adicional: Sorvete Mangaba", description: "Acompanhamento Açaí", price: 5.00, category: "Adicionais" },
    { name: "Adicional: Creme de Cupuaçu", description: "Acompanhamento Açaí", price: 5.00, category: "Adicionais" },
    { name: "Adicional: Castanha", description: "Acompanhamento Açaí", price: 4.00, category: "Adicionais" },
    { name: "Adicional: Amendoim", description: "Acompanhamento Açaí", price: 3.00, category: "Adicionais" },
    { name: "Adicional: Confete", description: "Acompanhamento Açaí", price: 3.00, category: "Adicionais" },
    { name: "Adicional: Gotas de Chocolate", description: "Acompanhamento Açaí", price: 3.00, category: "Adicionais" },
    { name: "Adicional: Paçoca", description: "Acompanhamento Açaí", price: 2.50, category: "Adicionais" },
    { name: "Adicional: Leite em Pó", description: "Acompanhamento Açaí", price: 2.50, category: "Adicionais" },
    { name: "Adicional: Farinha Láctea", description: "Acompanhamento Açaí", price: 2.50, category: "Adicionais" },
    { name: "Adicional: Morango", description: "Acompanhamento Açaí", price: 3.00, category: "Adicionais" },
    { name: "Adicional: Kiwi", description: "Acompanhamento Açaí", price: 3.00, category: "Adicionais" },
    { name: "Adicional: Banana", description: "Acompanhamento Açaí", price: 2.00, category: "Adicionais" },
    // Acai Caldas
    { name: "Calda: Creme de Avelã", description: "Calda Açaí", price: 3.00, category: "Adicionais" },
    { name: "Calda: Creme de Ninho", description: "Calda Açaí", price: 3.00, category: "Adicionais" },
    { name: "Calda: Creme de Doce de Leite", description: "Calda Açaí", price: 3.00, category: "Adicionais" },
    { name: "Calda: Maracujá", description: "Calda Açaí", price: 3.00, category: "Adicionais" },
    { name: "Calda: Morango", description: "Calda Açaí", price: 2.00, category: "Adicionais" },
    { name: "Calda: Chocolate", description: "Calda Açaí", price: 2.00, category: "Adicionais" },
    { name: "Calda: Leite Condensado", description: "Calda Açaí", price: 0.00, category: "Adicionais" },
    { name: "Calda: Mel", description: "Calda Açaí", price: 0.00, category: "Adicionais" },
    // Pasteis
    { name: "Pastel Frango", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Frango c/ Queijo", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Frango c/ Cheddar", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Frango c/ Catupiry", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Frango c/ Cheese", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Frango/Calabresa", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Carne", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Carne c/ Queijo", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Carne c/ Cheddar", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Carne c/ Catupiry", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Carne c/ Cheese", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Carne c/ Calabresa", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Costela", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Costela c/ Queijo", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Costela c/ Cheddar", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Costela c/ Catupiry", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Costela c/ Cheese", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Costela c/ Calabresa", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Charque", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Charque c/ Queijo", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Charque c/ Cheddar", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Charque c/ Catupiry", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Charque c/ Cheese", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Charque c/ Calabresa", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Calabresa", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Calabresa c/ Queijo", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Calabresa c/ Cheddar", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Calabresa c/ Catupiry", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Calabresa c/ Cheese", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Camarão", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Camarão c/ Queijo", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Camarão c/ Cheddar", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Camarão c/ Catupiry", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Camarão c/ Cheese", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Camarão c/ Calabresa", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Queijo", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Misto", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Pizza", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Bacon c/ Queijo", description: "Pastel Tradicional", price: 5.00, category: "Pastéis" },
    { name: "Pastel Romeu e Julieta", description: "Pastel Doce", price: 5.00, category: "Pastéis" },
    { name: "Pastel Banana Real", description: "Pastel Doce", price: 5.00, category: "Pastéis" },
    { name: "Pastel Ninho", description: "Pastel Doce", price: 5.00, category: "Pastéis" },
    { name: "Pastel Chocolate", description: "Pastel Doce", price: 5.00, category: "Pastéis" },
    { name: "Pastel Doce de Leite", description: "Pastel Doce", price: 5.00, category: "Pastéis" },
    // Pastelão
    { name: "Pastelão P - Camarão", description: "3 acompanhamentos grátis + 1 tempero. Informe na observação.", price: 14.99, category: "Pastelão" },
    { name: "Pastelão G - Camarão", description: "3 acompanhamentos grátis + 1 tempero. Informe na observação.", price: 24.99, category: "Pastelão" },
    { name: "Pastelão P - Charque", description: "3 acompanhamentos grátis + 1 tempero. Informe na observação.", price: 14.99, category: "Pastelão" },
    { name: "Pastelão G - Charque", description: "3 acompanhamentos grátis + 1 tempero. Informe na observação.", price: 24.99, category: "Pastelão" },
    { name: "Pastelão P - Costela", description: "3 acompanhamentos grátis + 1 tempero. Informe na observação.", price: 12.99, category: "Pastelão" },
    { name: "Pastelão G - Costela", description: "3 acompanhamentos grátis + 1 tempero. Informe na observação.", price: 23.99, category: "Pastelão" },
    { name: "Pastelão P - Carne do Sol", description: "3 acompanhamentos grátis + 1 tempero. Informe na observação.", price: 12.99, category: "Pastelão" },
    { name: "Pastelão G - Carne do Sol", description: "3 acompanhamentos grátis + 1 tempero. Informe na observação.", price: 23.99, category: "Pastelão" },
    { name: "Pastelão P - Coração", description: "3 acompanhamentos grátis + 1 tempero. Informe na observação.", price: 12.99, category: "Pastelão" },
    { name: "Pastelão G - Coração", description: "3 acompanhamentos grátis + 1 tempero. Informe na observação.", price: 23.99, category: "Pastelão" },
    { name: "Pastelão P - Frango", description: "3 acompanhamentos grátis + 1 tempero. Informe na observação.", price: 11.99, category: "Pastelão" },
    { name: "Pastelão G - Frango", description: "3 acompanhamentos grátis + 1 tempero. Informe na observação.", price: 21.99, category: "Pastelão" },
    { name: "Pastelão P - Carne Moída", description: "3 acompanhamentos grátis + 1 tempero. Informe na observação.", price: 11.99, category: "Pastelão" },
    { name: "Pastelão G - Carne Moída", description: "3 acompanhamentos grátis + 1 tempero. Informe na observação.", price: 21.99, category: "Pastelão" },
    { name: "Pastelão P - Bacon", description: "3 acompanhamentos grátis + 1 tempero. Informe na observação.", price: 11.99, category: "Pastelão" },
    { name: "Pastelão G - Bacon", description: "3 acompanhamentos grátis + 1 tempero. Informe na observação.", price: 21.99, category: "Pastelão" },
    { name: "Pastelão P - Calabresa", description: "3 acompanhamentos grátis + 1 tempero. Informe na observação.", price: 11.99, category: "Pastelão" },
    { name: "Pastelão G - Calabresa", description: "3 acompanhamentos grátis + 1 tempero. Informe na observação.", price: 21.99, category: "Pastelão" },
    { name: "Pastelão P - Queijo", description: "3 acompanhamentos grátis + 1 tempero. Informe na observação.", price: 11.99, category: "Pastelão" },
    { name: "Pastelão G - Queijo", description: "3 acompanhamentos grátis + 1 tempero. Informe na observação.", price: 21.99, category: "Pastelão" },
    { name: "Pastelão P - Chocolate", description: "Doce", price: 10.99, category: "Pastelão" },
    { name: "Pastelão G - Chocolate", description: "Doce", price: 19.99, category: "Pastelão" },
    { name: "Pastelão P - Ninho", description: "Doce", price: 10.99, category: "Pastelão" },
    { name: "Pastelão G - Ninho", description: "Doce", price: 19.99, category: "Pastelão" },
    { name: "Pastelão P - Doce de Leite", description: "Doce", price: 10.99, category: "Pastelão" },
    { name: "Pastelão G - Doce de Leite", description: "Doce", price: 19.99, category: "Pastelão" },
    // Bebidas
    { name: "Refrigerante 1L", description: "Coca, Antártica, Fanta", price: 9.99, category: "Bebidas" },
    { name: "Refrigerante Lata", description: "Coca, Antártica, Fanta, Fanta UVA, Sprite", price: 4.99, category: "Bebidas" },
    { name: "H2O", description: "Garrafa", price: 6.99, category: "Bebidas" },
    { name: "Suco da Fruta 400ml", description: "Laranja, Maracuja, Maracuja c/ beterraba, Mangaba, Graviola, Umbu, Manga, Caju", price: 7.99, category: "Bebidas" },
    { name: "Guaramix", description: "Copo", price: 3.99, category: "Bebidas" },
    { name: "Água c/ Gás", description: "Garrafa", price: 3.99, category: "Bebidas" },
    { name: "Água Mineral", description: "Garrafa", price: 2.99, category: "Bebidas" },
    // Hambúrgueres
    { name: "X Burguer", description: "Pão, Hamb, Queijo, Presunto, Salada, Batata Palha", price: 10.99, category: "Hambúrgueres" },
    { name: "EGGs Burguer", description: "Pão, Hamb, Queijo, Presunto, Ovos, Salada, Batata Palha", price: 12.99, category: "Hambúrgueres" },
    { name: "X Calabresa", description: "Pão, Hamb, Calabresa, Queijo, Presunto, Salada, Milho, Batata Palha", price: 19.99, category: "Hambúrgueres" },
    { name: "X Bacon", description: "Pão, Hamb, Calabresa, Queijo, Presunto, Ovos, Salada, Milho, Batata Palha", price: 21.99, category: "Hambúrgueres" },
    { name: "EGGs Calabresa", description: "Pão, Hamb, Bacon, Queijo, Presunto, Salada, Milho e Batata Palha", price: 21.99, category: "Hambúrgueres" },
    { name: "EGGs Bacon", description: "Pão, Hamb, Bacon, Ovos, Queijo, Presunto, Salada, Milho e Batata Palha", price: 22.99, category: "Hambúrgueres" },
    { name: "X Frango", description: "Pão, Hamb, Frango, Queijo, Presunto, Salada, Milho e Batata Palha", price: 21.99, category: "Hambúrgueres" },
    { name: "EGGs Frango", description: "Pão, Hamb, Frango, Ovos, Queijo, Presunto, Salada, Milho e Batata Palha", price: 23.99, category: "Hambúrgueres" },
    { name: "X Costela", description: "Pão, Hamb, Costela, Queijo, Presunto, Salada, Milho e Batata Palha", price: 22.99, category: "Hambúrgueres" },
    { name: "EGGs Costela", description: "Pão, Hamb, Costela, Ovos, Queijo, Presunto, Salada, Milho e Batata Palha", price: 24.99, category: "Hambúrgueres" },
    { name: "X Filé", description: "Pão, Hamb, Filé, Queijo, Presunto, Salada, Milho e Batata Palha", price: 22.99, category: "Hambúrgueres" },
    { name: "EGGs Filé", description: "Pão, Hamb, Filé, Ovos, Queijo, Presunto, Salada, Milho e Batata Palha", price: 24.99, category: "Hambúrgueres" },
    { name: "X Coração", description: "Pão, Hamb, Coração, Queijo, Presunto, Salada, Milho e Batata Palha", price: 22.99, category: "Hambúrgueres" },
    { name: "EGGs Coração", description: "Pão, Hamb, Coração, Ovos, Queijo, Presunto, Salada, Milho e Batata Palha", price: 24.99, category: "Hambúrgueres" },
    { name: "Do Chefe", description: "Pão, Hamb, Frango, Filé, Queijo, Presunto, Salada, Milho e Batata Palha", price: 27.99, category: "Hambúrgueres" },
    { name: "X Camarão", description: "Pão, Hamb, Camarão, Queijo, Presunto, Salada, Milho e Batata Palha", price: 28.99, category: "Hambúrgueres" },
    { name: "X Tudão", description: "Pão, Hamb, Filé, Frango, Coração, Bacon, Calabresa, Salada, Milho e Batata Palha", price: 29.99, category: "Hambúrgueres" },
    // Gourmet
    { name: "Gourmet Clássico", description: "Pão brioche, blend 120g, bacon fatiado, mussarela, cheddar e salada", price: 23.99, category: "Gourmet" },
    { name: "Gourmet Da Brasa", description: "Pão brioche, blend 120g, toscana, mussarela, cream cheese, cebola c, salada", price: 24.99, category: "Gourmet" },
    { name: "Gourmet Da Casa", description: "Pão brioche, 2 blend 120g, 2 cheddar, 2 bacon, molho, cebola c, salada", price: 26.99, category: "Gourmet" },
    { name: "Gourmet Caipira", description: "Pão brioche, blend 120g, frango, mussarela, bacon, catupiry, salada", price: 29.99, category: "Gourmet" },
    { name: "Gourmet Sergipano", description: "Pão brioche, blend 120g, costela desfiada, bacon, cheese, q.coalho, salada", price: 28.99, category: "Gourmet" },
    { name: "Gourmet Boca Quente", description: "Pão brioche, 2 blend 120g, maionese apimentada, cebola c, bacon, mussarela e salada", price: 27.99, category: "Gourmet" },
    { name: "Gourmet Nordestino", description: "Pão brioche, blend 120g, charque desfiado, q. coalho, melaço, salada", price: 29.99, category: "Gourmet" },
    // Porções
    { name: "Batata Frita P Tradicional", description: "Batata Frita Tradicional", price: 9.99, category: "Porções" },
    { name: "Batata Frita P (Turbinada)", description: "Com 3 adicionais", price: 19.99, category: "Porções" },
    { name: "Batata Frita G (Turbinada)", description: "Com 3 adicionais", price: 27.99, category: "Porções" },
    // Adicionais Hambúrguer
    { name: "Extra: Hambúrguer", description: "Adicional", price: 3.99, category: "Adicionais" },
    { name: "Extra: Ovos", description: "Adicional", price: 1.99, category: "Adicionais" },
    { name: "Extra: Cheddar", description: "Adicional", price: 2.99, category: "Adicionais" },
    { name: "Extra: C. Cheese", description: "Adicional", price: 2.99, category: "Adicionais" },
    { name: "Extra: Catupiry", description: "Adicional", price: 3.99, category: "Adicionais" },
    { name: "Extra: Mussarela", description: "Adicional", price: 1.99, category: "Adicionais" },
    { name: "Extra: Calabresa", description: "Adicional", price: 3.99, category: "Adicionais" },
    { name: "Extra: Coração", description: "Adicional", price: 4.99, category: "Adicionais" },
    { name: "Extra: Bacon", description: "Adicional", price: 3.99, category: "Adicionais" },
    { name: "Extra: Filé", description: "Adicional", price: 5.99, category: "Adicionais" },
    { name: "Extra: Costela", description: "Adicional", price: 5.99, category: "Adicionais" },
    { name: "Extra: Frango", description: "Adicional", price: 4.99, category: "Adicionais" }
];`;

function processFile(filepath) {
    if (!fs.existsSync(filepath)) {
        console.log("Not found:", filepath);
        return;
    }
    let content = fs.readFileSync(filepath, 'utf8');

    // Make FULL_MENU replacements
    const pattern = /const FULL_MENU = \[[\s\S]*?\];/;
    if (pattern.test(content)) {
        content = content.replace(pattern, full_menu);
        console.log("Replaced FULL_MENU in", filepath);
    }

    // Replace logo references
    if (content.includes('logopastel.jpeg')) {
        content = content.split('logopastel.jpeg').join('logo.jpeg');
        console.log("Replaced logopastel.jpeg w logo.jpeg in", filepath);
    }

    // Text replacements
    content = content.split('Império do Pastel').join('Oxente Pastel');
    content = content.split('ImpÃ©rio do Pastel').join('Oxente Pastel');

    fs.writeFileSync(filepath, content, 'utf8');
}

processFile('admin.html');
processFile('index.html');
console.log("Done");
