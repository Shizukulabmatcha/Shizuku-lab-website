const products = [
  {
    id: "matcha-latte",
    name: "Matcha Latte",
    description: "Smooth ceremonial matcha with creamy oat milk.",
    price: 5.90
  },
  {
    id: "hojicha-latte",
    name: "Hojicha Latte",
    description: "Roasted hojicha with creamy oat milk.",
    price: 5.90
  },
  {
    id: "ichigo-matcha",
    name: "Ichigo Matcha",
    description: "Matcha latte with strawberry.",
    price: 6.90
  },
  {
    id: "singapore-fog",
    name: "Singapore Fog",
    description: "A Shizuku Lab interpretation of a Singapore favourite.",
    price: 6.90
  },
  {
    id: "matcha-soda",
    name: "Ichigo Matcha Soda",
    description: "Matcha, strawberry and sparkling soda.",
    price: 6.90
  },
  {
    id: "straight-matcha",
    name: "Straight Matcha",
    description: "Freshly whisked matcha, served simply.",
    price: 5.90
  }
];

let cart = [];

const menuGrid = document.getElementById("menuGrid");
const cartButton = document.getElementById("cartButton");
const cartPanel = document.getElementById("cartPanel");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

function money(value) {
  return `$${value.toFixed(2)}`;
}

function renderMenu() {
  if (!menuGrid) return;

  menuGrid.innerHTML = products.map(product => `
    <article class="product-card">
      <div>
        <div class="product-top">
          <div class="product-name">${product.name}</div>
          <div class="price">${money(product.price)}</div>
        </div>

        <p class="product-desc">
          ${product.description}
        </p>
      </div>

      <button
        class="add-button"
        onclick="addToCart('${product.id}')">
        Add to cart
      </button>
    </article>
  `).join("");
}

function addToCart(id) {
  const product = products.find(item => item.id === id);

  if (!product) return;

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      ...product,
      qty: 1
    });
  }

  renderCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
}

function updateQuantity(id, amount) {
  const item = cart.find(product => product.id === id);

  if (!item) return;

  item.qty += amount;

  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }

  renderCart();
}

function renderCart() {
  if (!cartItems) return;

  const quantity = cart.reduce(
    (total, item) => total + item.qty,
    0
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cartCount) {
    cartCount.textContent = quantity;
  }

  if (cartTotal) {
    cartTotal.textContent = money(total);
  }

  if (!cart.length) {
    cartItems.innerHTML = `
      <p class="muted">
        Your cart is empty.
      </p>
    `;

    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">

      <div>
        <strong>${item.name}</strong>

        <small>
          ${money(item.price)} each
        </small>
      </div>

      <div class="qty">

        <button
          onclick="updateQuantity('${item.id}', -1)">
          −
        </button>

        <span>${item.qty}</span>

        <button
          onclick="updateQuantity('${item.id}', 1)">
          +
        </button>

      </div>

    </div>
  `).join("");
}

function openCart() {
  if (!cartPanel) return;

  cartPanel.classList.add("open");
  cartPanel.setAttribute("aria-hidden", "false");
}

function closeCart() {
  if (!cartPanel) return;

  cartPanel.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
}

if (cartButton) {
  cartButton.addEventListener("click", openCart);
}

const closeCartButton = document.getElementById("closeCart");

if (closeCartButton) {
  closeCartButton.addEventListener("click", closeCart);
}

const cartBackdrop = document.getElementById("cartBackdrop");

if (cartBackdrop) {
  cartBackdrop.addEventListener("click", closeCart);
}

const checkoutButton =
  document.getElementById("checkoutButton");

const checkoutModal =
  document.getElementById("checkoutModal");

if (checkoutButton) {
  checkoutButton.addEventListener("click", () => {

    if (!cart.length) {
      alert("Please add a drink to your cart first.");
      return;
    }

    if (checkoutModal) {
      checkoutModal.classList.add("open");
    }
  });
}

const closeCheckout =
  document.getElementById("closeCheckout");

if (closeCheckout) {
  closeCheckout.addEventListener("click", () => {
    checkoutModal.classList.remove("open");
  });
}

const checkoutForm =
  document.getElementById("checkoutForm");

if (checkoutForm) {

  checkoutForm.addEventListener("submit", event => {

    event.preventDefault();

    const formData =
      new FormData(checkoutForm);

    const name =
      formData.get("name");

    const phone =
      formData.get("phone");

    const slot =
      formData.get("slot");

    const promo =
      formData.get("promo");

    const total =
      cart.reduce(
        (sum, item) =>
          sum + item.price * item.qty,
        0
      );

    const order = {
      customer_name: name,
      phone: phone,
      collection_slot: slot,
      promo_code: promo,
      total: total,
      items: cart
    };

    console.log("Shizuku Lab order:", order);

    const formNote =
      document.getElementById("formNote");

    if (formNote) {
      formNote.textContent =
        "Thank you! Your pre-order has been received.";
    }

    cart = [];

    renderCart();

    checkoutForm.reset();
  });
}

renderMenu();
renderCart();
