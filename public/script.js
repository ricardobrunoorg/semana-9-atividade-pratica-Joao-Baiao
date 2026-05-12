// ======================
// BASE DE DADOS (JSON)
// ======================

const data = {
  produtos: [
    {
      id: 1,
      nome: "iPhone 15",
      preco: 5999.90,
      categoria: "Celulares",
      imagem: "https://picsum.photos/300/200?1",
      descricao: "Smartphone Apple com câmera avançada.",
      emEstoque: true
    },
    {
      id: 2,
      nome: "Galaxy S24",
      preco: 4899.90,
      categoria: "Celulares",
      imagem: "https://picsum.photos/300/200?2",
      descricao: "Celular Samsung com alta performance.",
      emEstoque: true
    },
    {
      id: 3,
      nome: "Notebook Dell",
      preco: 4200,
      categoria: "Notebooks",
      imagem: "https://picsum.photos/300/200?3",
      descricao: "Notebook ideal para estudos e trabalho.",
      emEstoque: false
    },
    {
      id: 4,
      nome: "MacBook Air",
      preco: 8999.90,
      categoria: "Notebooks",
      imagem: "https://picsum.photos/300/200?4",
      descricao: "Notebook leve e poderoso da Apple.",
      emEstoque: true
    },
    {
      id: 5,
      nome: "Headset Gamer",
      preco: 350,
      categoria: "Acessórios",
      imagem: "https://picsum.photos/300/200?5",
      descricao: "Headset com áudio surround.",
      emEstoque: true
    },
    {
      id: 6,
      nome: "Mouse RGB",
      preco: 180,
      categoria: "Acessórios",
      imagem: "https://picsum.photos/300/200?6",
      descricao: "Mouse gamer com iluminação RGB.",
      emEstoque: true
    },
    {
      id: 7,
      nome: "PlayStation 5",
      preco: 4200,
      categoria: "Games",
      imagem: "https://picsum.photos/300/200?7",
      descricao: "Console de última geração da Sony.",
      emEstoque: false
    },
    {
      id: 8,
      nome: "Xbox Series X",
      preco: 3999.90,
      categoria: "Games",
      imagem: "https://picsum.photos/300/200?8",
      descricao: "Console poderoso da Microsoft.",
      emEstoque: true
    }
  ]
};

// ======================
// SELEÇÃO DE ELEMENTOS
// ======================

// getElementById
const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const btnRender = document.getElementById("btnRender");

// querySelector
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");

// ======================
// FUNÇÕES
// ======================

function formatPrice(preco) {
  return `R$ ${preco.toFixed(2)}`;
}

function createProductCard(produto) {

  const card = document.createElement("div");

  // setAttribute
  card.setAttribute("data-id", produto.id);

  // classList.add
  card.classList.add("card");

  // style obrigatório
  card.style.padding = "15px";
  card.style.border = "1px solid #ccc";

  const image = document.createElement("img");
  image.src = produto.imagem;

  const title = document.createElement("h2");
  title.textContent = produto.nome;
  title.classList.add("card-title");

  const price = document.createElement("p");
  price.textContent = formatPrice(produto.preco);

  const category = document.createElement("p");
  category.textContent = `Categoria: ${produto.categoria}`;

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons");

  // BOTÃO DETALHES
  const detailsButton = document.createElement("button");
  detailsButton.textContent = "Ver detalhes";

  detailsButton.addEventListener("click", () => {
    showProductDetails(produto);
  });

  // BOTÃO DESTACAR
  const highlightButton = document.createElement("button");
  highlightButton.textContent = "Destacar";

  highlightButton.addEventListener("click", () => {
    card.classList.toggle("highlight");
  });

  buttonsDiv.appendChild(detailsButton);
  buttonsDiv.appendChild(highlightButton);

  card.appendChild(image);
  card.appendChild(title);
  card.appendChild(price);
  card.appendChild(category);
  card.appendChild(buttonsDiv);

  return card;
}

function renderProducts(produtos) {

  // limpa a lista
  productList.innerHTML = "";

  produtos.forEach((produto) => {

    const card = createProductCard(produto);

    // appendChild
    productList.appendChild(card);
  });

  // querySelectorAll obrigatório
  const allCards = document.querySelectorAll(".card");

  allCards.forEach((card) => {

    console.log("Card ID:", card.getAttribute("data-id"));

    card.style.transition = "0.3s";
  });
}

function renderCategories() {

  categorySelect.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "Todas";
  defaultOption.textContent = "Todas";

  categorySelect.appendChild(defaultOption);

  const categorias = [];

  data.produtos.forEach((produto) => {

    if (!categorias.includes(produto.categoria)) {
      categorias.push(produto.categoria);
    }
  });

  categorias.forEach((categoria) => {

    const option = document.createElement("option");

    option.value = categoria;
    option.textContent = categoria;

    categorySelect.appendChild(option);
  });
}

function showProductDetails(produto) {

  // innerHTML obrigatório
  productDetails.innerHTML = `
    <h2>${produto.nome}</h2>

    <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>

    <p><strong>Categoria:</strong> ${produto.categoria}</p>

    <p>
      <strong>Estoque:</strong>
      ${produto.emEstoque ? "Disponível" : "Indisponível"}
    </p>

    <p><strong>Descrição:</strong> ${produto.descricao}</p>
  `;
}

function filterProducts() {

  const searchText = searchInput.value.toLowerCase();

  const selectedCategory = categorySelect.value;

  const filtered = data.produtos.filter((produto) => {

    const matchName =
      produto.nome.toLowerCase().includes(searchText);

    const matchCategory =
      selectedCategory === "Todas" ||
      produto.categoria === selectedCategory;

    return matchName && matchCategory;
  });

  return filtered;
}

// ======================
// EVENTOS
// ======================

// input
searchInput.addEventListener("input", () => {

  const filteredProducts = filterProducts();

  renderProducts(filteredProducts);
});

// change
categorySelect.addEventListener("change", () => {

  const filteredProducts = filterProducts();

  renderProducts(filteredProducts);
});

// click
btnRender.addEventListener("click", () => {

  const filteredProducts = filterProducts();

  renderProducts(filteredProducts);
});

// ======================
// INICIALIZAÇÃO
// ======================

renderCategories();

renderProducts(data.produtos);