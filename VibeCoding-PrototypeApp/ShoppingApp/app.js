const products = [
  {
    id: "apple",
    name: "Apples",
    description: "Crisp, sweet apples for snacking or baking.",
    price: 1.99,
    unit: "lb",
    emoji: "🍎",
  },
  {
    id: "banana",
    name: "Bananas",
    description: "Ripe bananas, sold by the bunch.",
    price: 1.49,
    unit: "bunch",
    emoji: "🍌",
  },
  {
    id: "orange",
    name: "Oranges",
    description: "Juicy oranges with a bright, citrus flavor.",
    price: 2.49,
    unit: "lb",
    emoji: "🍊",
  },
  {
    id: "strawberry",
    name: "Strawberries",
    description: "Sweet, fresh strawberries.",
    price: 3.99,
    unit: "1 lb box",
    emoji: "🍓",
  },
  {
    id: "grapes",
    name: "Grapes",
    description: "Seedless grapes, ready to enjoy.",
    price: 2.99,
    unit: "lb",
    emoji: "🍇",
  },
  {
    id: "watermelon",
    name: "Watermelon",
    description: "Refreshing watermelon, sold individually.",
    price: 5.99,
    unit: "each",
    emoji: "🍉",
  },
  {
    id: "pineapple",
    name: "Pineapple",
    description: "Golden pineapple with a tropical flavor.",
    price: 3.49,
    unit: "each",
    emoji: "🍍",
  },
  {
    id: "mango",
    name: "Mangoes",
    description: "Sweet mangoes with soft, juicy flesh.",
    price: 1.79,
    unit: "each",
    emoji: "🥭",
  },
  {
    id: "lemon",
    name: "Lemons",
    description: "Tart lemons for drinks, cooking, or baking.",
    price: 0.79,
    unit: "each",
    emoji: "🍋",
  },
  {
    id: "peach",
    name: "Peaches",
    description: "Fragrant, tender peaches.",
    price: 2.99,
    unit: "lb",
    emoji: "🍑",
  },
];

const state = {
  cart: new Map(),
  selectedProductId: null,
  status: "",
  orderProcessed: false,
};

const main = document.querySelector("#main-content");
const cartCount = document.querySelector("#cart-count");
const navigationLinks = [...document.querySelectorAll(".nav-link")];
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function formatPrice(amount) {
  return currency.format(amount);
}

function formatUnitPrice(product) {
  return `${formatPrice(product.price)} / ${product.unit}`;
}

function getCartQuantity() {
  return [...state.cart.values()].reduce((total, quantity) => total + quantity, 0);
}

function getSubtotal() {
  return [...state.cart.entries()].reduce((total, [id, quantity]) => {
    const product = products.find((item) => item.id === id);
    return total + product.price * quantity;
  }, 0);
}

function currentPage() {
  const route = window.location.hash.replace(/^#\/?/, "").split("/")[0];
  return ["products", "product-details", "shopping-cart", "checkout"].includes(route)
    ? route
    : "products";
}

function renderStatus() {
  return `<p class="status-message" role="status" aria-live="polite">${state.status}</p>`;
}

function renderProducts() {
  const cards = products
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-topline">
            <span class="fruit-emoji" aria-hidden="true">${product.emoji}</span>
            <div>
              <h2 class="product-title">
                <a href="#/product-details" data-view-product="${product.id}">${product.name}</a>
              </h2>
              <p class="product-description">${product.description}</p>
            </div>
          </div>
          <p class="product-price">${formatUnitPrice(product)}</p>
          <div class="card-actions">
            <label class="quantity-field">
              Quantity
              <input type="number" min="1" step="1" value="1" inputmode="numeric" data-product-quantity="${product.id}" aria-label="Quantity of ${product.name}" />
            </label>
            <button class="button button-primary" type="button" data-add-product="${product.id}">Add</button>
            <a class="button button-secondary" href="#/product-details" data-view-product="${product.id}">View</a>
          </div>
        </article>`,
    )
    .join("");

  return `
    <header class="page-header">
      <p class="eyebrow">Fresh picks, every day</p>
      <h1>Products</h1>
      <p class="page-subtitle">Browse fresh fruit and add your favorites to the basket.</p>
    </header>
    <section class="product-grid" aria-label="Fruit products">${cards}</section>
    ${renderStatus()}`;
}

function renderProductDetails() {
  const product = products.find((item) => item.id === state.selectedProductId);
  if (!product) {
    return `
      <header class="page-header">
        <p class="eyebrow">Fruit Shop</p>
        <h1>Product details</h1>
      </header>
      <section class="empty-state">
        <h2>Select a product to see its details.</h2>
        <a class="button button-primary" href="#/products">Go to Products</a>
      </section>`;
  }

  return `
    <header class="page-header">
      <p class="eyebrow">Get to know your fruit</p>
      <h1>Product details</h1>
    </header>
    <article class="detail-card">
      <div class="detail-art" aria-hidden="true">${product.emoji}</div>
      <div class="detail-copy">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p class="detail-price">${formatUnitPrice(product)}</p>
        <div class="detail-actions">
          <a class="button button-primary" href="#/products">Back to Products</a>
        </div>
      </div>
    </article>`;
}

function renderEmptyCart(title) {
  return `
    <header class="page-header">
      <p class="eyebrow">Your basket</p>
      <h1>${title}</h1>
    </header>
    <section class="empty-state">
      <h2>Your cart is empty.</h2>
      <p>Find something fresh for your basket.</p>
      <a class="button button-primary" href="#/products">Browse products</a>
    </section>`;
}

function renderCart() {
  if (state.cart.size === 0) {
    return renderEmptyCart("Shopping cart");
  }

  const items = [...state.cart.entries()]
    .map(([id, quantity]) => {
      const product = products.find((item) => item.id === id);
      return `
        <article class="cart-item">
          <div class="cart-item-name">
            <span class="cart-item-emoji" aria-hidden="true">${product.emoji}</span>
            <span>${product.name}</span>
          </div>
          <label class="quantity-field">
            Quantity
            <input type="number" min="1" step="1" value="${quantity}" inputmode="numeric" data-cart-quantity="${id}" aria-label="Quantity of ${product.name} in cart" />
          </label>
          <div class="cart-cell"><strong>Unit price</strong>${formatUnitPrice(product)}</div>
          <div class="cart-cell"><strong>Line total</strong>${formatPrice(product.price * quantity)}</div>
          <div class="cart-item-end">
            <button class="button button-danger" type="button" data-remove-product="${id}" aria-label="Remove ${product.name} from cart">Remove</button>
          </div>
        </article>`;
    })
    .join("");

  return `
    <header class="page-header">
      <p class="eyebrow">Your basket</p>
      <h1>Shopping cart</h1>
      <p class="page-subtitle">${getCartQuantity()} ${getCartQuantity() === 1 ? "item" : "items"} in your cart.</p>
    </header>
    <section class="cart-panel" aria-label="Shopping cart items">
      <div class="cart-list">${items}</div>
      <div class="total-row"><span>Subtotal</span><strong>${formatPrice(getSubtotal())}</strong></div>
      <div class="action-row">
        <a class="button button-secondary" href="#/products">Continue shopping</a>
        <a class="button button-primary" href="#/checkout">Go to checkout</a>
      </div>
    </section>
    ${renderStatus()}`;
}

function renderCheckout() {
  if (state.cart.size === 0) {
    return renderEmptyCart("Checkout");
  }

  const lines = [...state.cart.entries()]
    .map(([id, quantity]) => {
      const product = products.find((item) => item.id === id);
      return `
        <div class="checkout-line">
          <div class="checkout-product">
            <strong>${product.name}</strong>
            <span>${quantity} × ${formatUnitPrice(product)}</span>
          </div>
          <span class="checkout-line-total">${formatPrice(product.price * quantity)}</span>
        </div>`;
    })
    .join("");

  return `
    <header class="page-header">
      <p class="eyebrow">Almost there</p>
      <h1>Checkout</h1>
      <p class="page-subtitle">Review your order before the mock checkout.</p>
    </header>
    <section class="panel" aria-label="Order summary">
      <h2>Order summary</h2>
      <div class="checkout-list">${lines}</div>
      <div class="total-row"><span>Total</span><strong>${formatPrice(getSubtotal())}</strong></div>
      <p class="muted-note">No tax or shipping added.</p>
      <div class="action-row">
        <button class="button button-primary" type="button" data-process-order>Process Order</button>
        <a class="button button-secondary" href="#/shopping-cart">Back to cart</a>
      </div>
      ${
        state.orderProcessed
          ? '<p class="checkout-confirmation" role="status">Mock order complete. No real order was submitted and no payment was made.</p>'
          : ""
      }
    </section>`;
}

function render() {
  const page = currentPage();
  const pageRenderers = {
    products: renderProducts,
    "product-details": renderProductDetails,
    "shopping-cart": renderCart,
    checkout: renderCheckout,
  };

  navigationLinks.forEach((link) => {
    if (link.dataset.page === page) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
  cartCount.textContent = String(getCartQuantity());
  main.innerHTML = pageRenderers[page]();
}

function readPositiveInteger(input) {
  const quantity = Number(input.value);
  return Number.isSafeInteger(quantity) && quantity > 0 ? quantity : null;
}

function clearOrderConfirmation() {
  state.orderProcessed = false;
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const productLink = target.closest("[data-view-product]");
  if (productLink) {
    state.selectedProductId = productLink.getAttribute("data-view-product");
    state.status = "";
    clearOrderConfirmation();
    return;
  }

  const addButton = target.closest("[data-add-product]");
  if (addButton) {
    const productId = addButton.getAttribute("data-add-product");
    const input = main.querySelector(`[data-product-quantity="${productId}"]`);
    const quantity = input ? readPositiveInteger(input) : null;
    if (quantity === null) {
      state.status = "Enter a positive whole-number quantity.";
      render();
      return;
    }
    state.cart.set(productId, (state.cart.get(productId) || 0) + quantity);
    const product = products.find((item) => item.id === productId);
    state.status = `${product.name} added to your cart.`;
    clearOrderConfirmation();
    render();
    return;
  }

  const removeButton = target.closest("[data-remove-product]");
  if (removeButton) {
    const productId = removeButton.getAttribute("data-remove-product");
    const product = products.find((item) => item.id === productId);
    state.cart.delete(productId);
    state.status = `${product.name} removed from your cart.`;
    clearOrderConfirmation();
    render();
    return;
  }

  if (target.closest("[data-process-order]")) {
    state.orderProcessed = true;
    render();
  }
});

document.addEventListener("change", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  const productId = target.getAttribute("data-cart-quantity");
  if (!productId) {
    return;
  }

  const quantity = readPositiveInteger(target);
  if (quantity === null) {
    state.status = "Enter a positive whole-number quantity.";
    render();
    return;
  }

  state.cart.set(productId, quantity);
  state.status = "Cart quantity updated.";
  clearOrderConfirmation();
  render();
});

window.addEventListener("hashchange", () => {
  state.status = "";
  render();
});

if (!window.location.hash) {
  window.location.hash = "/products";
} else {
  render();
}
