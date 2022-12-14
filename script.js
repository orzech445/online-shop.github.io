let currentProducts = products;
const productsSection = document.querySelector(".container__products");
let categories = new Set();
let basket = [];
let addToBasketBtns;

const renderProducts = (items) => {
    productsSection.innerHTML = "";

    items.forEach(item => {
        const newProduct = document.createElement("div");
        newProduct.className = `container__products__item ${item.sale ? "on-sale" : ""}`;
        newProduct.innerHTML = `
            <img src="${item.image}" alt="product-image">
            <h3 class="product-name">${item.name}</h3>
            <p class="container__products__item__product-description">${item.description}</p>
            <div class="container__products__item__product-price">
                <span class="container__products__item__price" >${(item.price).toFixed(2)} zł</span>
                <span class="container__products__item__price-sale">${(item.price - item.saleAmount).toFixed(2)} zł</span>
            </div>
            <button data-id="${item.id}" class="container__products__item__product-add-to-basket-btn">Dodaj do koszyka</button>
            <p class="container__products__item__product-item-sale-info">Promocja</p>
        `;

        productsSection.appendChild(newProduct);
    });
    addToBasketBtns = document.querySelectorAll(".container__products__item__product-add-to-basket-btn");

    addToBasketBtns.forEach((btn) => btn.addEventListener("click", (e) => {
        const selectedId = parseInt(e.target.dataset.id);

        const key = currentProducts.findIndex((item) => item.id === selectedId);

        basket.push(currentProducts.at(key));

        const basketTotal = basket.reduce((sum, item) => {
            return (sum += item.price - (item.saleAmount ? item.saleAmount : 0));
        }, 0);

        basketAmountEl.innerHTML = `${basketTotal.toFixed(2)} zł`;

        basketTotal > 0 ?
            basketClearBtn.classList.add("active") :
            basketClearBtn.classList.remove("active");

        console.log(basketTotal.toFixed(2));

    }));
};

const renderCategories = (items) => {
    items.forEach(item => {
        categories.add(item.category);
    });

    const categoriesItem = document.querySelector(".container__categories__item");

    categories = ["wszystkie", ...categories];

    categories.forEach((category, index) => {
        const newCategory = document.createElement("button");
        newCategory.innerHTML = category;
        newCategory.dataset.category = category;

        index === 0 ? newCategory.classList.add("active") : "";

        categoriesItem.appendChild(newCategory);
    });
}

document.onload = renderProducts(currentProducts);
document.onload = renderCategories(currentProducts);

const categoriesButton = document.querySelectorAll(".container__categories__item button");

categoriesButton.forEach((btn) => btn.addEventListener("click", (e) => {
    const categoryItem = e.target.dataset.category

    categoriesButton.forEach((btn) => btn.classList.remove("active"));

    e.target.classList.add("active");

    currentProducts = products;

    if (categoryItem === "wszystkie") {
        currentProducts = products;
    } else {
        currentProducts = currentProducts.filter((item) =>
            item.category === categoryItem
        );
    }

    renderProducts(currentProducts);
})
);

const searchBar = document.querySelector(".search__bar");

searchBar.addEventListener("input", (e) => {
    const search = e.target.value;

    const foundProducts = currentProducts.filter((item) => {
        if (item.name.toLowerCase().includes(search.toLowerCase())) {
            return item;
        }
    })

    const emptyState = document.querySelector(".container__empty-state");

    foundProducts.length === 0
        ? emptyState.classList.add("active")
        : emptyState.classList.remove("active");

    renderProducts(foundProducts);
});

const basketClearBtn = document.querySelector(".basket__clear-btn");
const basketAmountEl = document.querySelector(".basket__amount");

basketClearBtn.addEventListener("click", () => {
    basketAmountEl.innerHTML = "Koszyk";
    basket = [];
    basketClearBtn.classList.remove("active");
})