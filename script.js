// Pizzas salgadas
const pizzasSalgadas = [
    { nome: "Calabresa", preco: 45 },
    { nome: "Mussarela", preco: 43 },
    { nome: "Portuguesa", preco: 48 },
    { nome: "Frango com Catupiry", preco: 47 },
    { nome: "Quatro Queijos", preco: 50 },
    { nome: "Marguerita", preco: 46 },
    { nome: "Pepperoni", preco: 49 },
    { nome: "Bacon", preco: 51 },
    { nome: "Vegetariana", preco: 44 },
    { nome: "Napolitana", preco: 45 }
];

// Pizzas doces
const pizzasDoces = [
    { nome: "Chocolate", preco: 42 },
    { nome: "Prestígio", preco: 44 },
    { nome: "Banana com Canela", preco: 40 },
    { nome: "Doce de Leite", preco: 43 },
    { nome: "Morango com Nutella", preco: 48 }
];

// Bebidas
const bebidas = [
    { nome: "Coca-Cola 2L", preco: 12 },
    { nome: "Guaraná Antarctica 2L", preco: 11 },
    { nome: "Sprite 2L", preco: 10 },
    { nome: "Fanta Uva 2L", preco: 10 },
    { nome: "Água Mineral", preco: 4 }
];

// Renderiza produtos dinamicamente
function renderizarProdutos(lista, containerId) {
    const container = document.getElementById(containerId);
    lista.forEach(produto => {
        const div = document.createElement("div");
        div.classList.add("pizza");
        div.innerHTML = `
            <img src="${produto.nome.toLowerCase().replace(/ /g, '')}.png" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <button>Adicionar ao Pedido</button>
        `;
        div.querySelector("button").addEventListener("click", () => adicionarItem(produto));
        container.appendChild(div);
    });
}

renderizarProdutos(pizzasSalgadas, "pizzas-salgadas");
renderizarProdutos(pizzasDoces, "pizzas-doces");
renderizarProdutos(bebidas, "bebidas");

// Carrinho
const carrinho = [];
const resumo = document.getElementById("resumo-pedido");
const finalizarBtn = document.getElementById("btnFinalizar");

function adicionarItem(produto) {
    carrinho.push(produto);
    atualizarResumo();
}

function atualizarResumo() {
    if (carrinho.length === 0) {
        resumo.innerHTML = "<p>Nenhum item adicionado ainda 🍕</p>";
        finalizarBtn.disabled = true;
        return;
    }

    let total = 0;
    let html = "<ul>";
    carrinho.forEach((item, i) => {
        total += item.preco;
        html += `<li>${item.nome} - R$ ${item.preco.toFixed(2)} 
            <button class='remove' data-index='${i}'>Remover</button></li>`;
    });
    const totalComDesconto = aplicarDesconto(total);
    html += `</ul><h3>Total: R$ ${totalComDesconto.toFixed(2)}</h3>`;
    resumo.innerHTML = html;
    finalizarBtn.disabled = false;

    document.querySelectorAll(".remove").forEach(btn => {
        btn.addEventListener("click", () => {
            const i = btn.getAttribute("data-index");
            carrinho.splice(i, 1);
            atualizarResumo();
        });
    });
}

const descontos = {
    "PIZZA10": 0.10, // 10% de desconto
    "DELIVERY5": 0.05, // 5%
    "SUPER15": 0.15 // 15%
};

// Aplica o desconto se o código for válido
function aplicarDesconto(total) {
    const codigo = document.getElementById("codigoDesconto").value.trim().toUpperCase();
    const msg = document.getElementById("mensagem-desconto");
    if (descontos[codigo]) {
        const desconto = total * descontos[codigo];
        msg.textContent = `Cupom aplicado: ${codigo} (-${(descontos[codigo]*100)}%)`;
        return total - desconto;
    } else if (codigo !== "") {
        msg.textContent = "Código inválido.";
    } else {
        msg.textContent = "";
    }
    return total;
}

document.getElementById("pedido-form").addEventListener("submit", e => {
    e.preventDefault();
    if (carrinho.length === 0) return alert("Adicione algo ao pedido antes de finalizar!");
    alert("🍕 Pedido enviado com sucesso! A DGJ Delivery agradece!");
    carrinho.length = 0;
    atualizarResumo();
    e.target.reset();
});
