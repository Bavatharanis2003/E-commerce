// app.js (updated - includes slider logic, search, and cart)
const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

// product data (your existing list)
const products = [
  { id: "p1", title: "Air Force", price: 119, colors: [{ code: "darkblue", img: "air.png" }, { code: "blue", img: "air2.png" }] },
  { id: "p2", title: "Air Jordan", price: 149, colors: [{ code: "white", img: "jordan.png" }, { code: "black", img: "jordan2.png" }] },
  { id: "p3", title: "Air Blazer", price: 150, colors: [{ code: "black", img: "blazer.png" }, { code: "gray", img: "blazer2.png" }] },
  { id: "p4", title: "Air Crater", price: 180, colors: [{ code: "gray", img: "crater.png" }, { code: "blue", img: "crater2.png" }] },
  { id: "p5", title: "Air Hippie", price: 200, colors: [{ code: "blue", img: "hippie.png" }, { code: "yellow", img: "hippie2.png" }] },
];

let choosenProduct = products[0];

const currentproductImg = document.querySelector(".productImg");
const currentproductTitle = document.querySelector(".productTitle");
const currentproductPrice = document.querySelector(".productPrice");
const currentproductColors = document.querySelectorAll(".color");
const currentproductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    // change slide
    if (wrapper) wrapper.style.transform = `translateX(${-100 * index}vw)`;

    // change chosen product
    choosenProduct = products[index];

    // update UI
    if (currentproductTitle) currentproductTitle.textContent = choosenProduct.title;
    if (currentproductPrice) currentproductPrice.textContent = "$" + choosenProduct.price;
    if (currentproductImg) currentproductImg.src = choosenProduct.colors[0].img;

    currentproductColors.forEach((colorEl, i) => {
      if (choosenProduct.colors[i]) colorEl.style.backgroundColor = choosenProduct.colors[i].code;
    });
  });
});

// color click -> change product image
currentproductColors.forEach((colorEl, idx) => {
  colorEl.addEventListener("click", () => {
    if (choosenProduct.colors[idx]) currentproductImg.src = choosenProduct.colors[idx].img;
  });
});

// size selection
currentproductSizes.forEach((sizeEl) => {
  sizeEl.addEventListener("click", () => {
    currentproductSizes.forEach((s) => {
      s.style.backgroundColor = "white";
      s.style.color = "black";
    });
    sizeEl.style.backgroundColor = "black";
    sizeEl.style.color = "white";
  });
});

// PAYMENT popup button logic previously used
// We'll repurpose the BUY button to add-to-cart AND keep payment popup behavior on a long click.
// Keep original payment popup toggles if present
const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const closeBtn = document.querySelector(".close");

if (productButton && payment) {
  productButton.addEventListener("click", () => {
    // Add to cart (short click)
    addToCart(choosenProduct.id);
  });

  // Optional: open payment (double-click) - preserves your popup
  productButton.addEventListener("dblclick", () => {
    payment.style.display = "flex";
  });
}
if (closeBtn && payment) {
  closeBtn.addEventListener("click", () => {
    payment.style.display = "none";
  });
}


// -----------------  SEARCH  -----------------
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    // Simple search: highlight slide items whose title matches, otherwise hide
    const sliderItems = document.querySelectorAll('.sliderItem');
    sliderItems.forEach((item, idx) => {
      const title = (products[idx] && products[idx].title) ? products[idx].title.toLowerCase() : '';
      if (!q || title.includes(q)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
    // If the first visible slide is not the current, move to it
    const firstVisibleIndex = Array.from(sliderItems).findIndex(si => si.style.display !== 'none');
    if (firstVisibleIndex >= 0 && wrapper) {
      wrapper.style.transform = `translateX(${-100 * firstVisibleIndex}vw)`;
      choosenProduct = products[firstVisibleIndex];
      if (currentproductTitle) currentproductTitle.textContent = choosenProduct.title;
      if (currentproductPrice) currentproductPrice.textContent = "$" + choosenProduct.price;
      if (currentproductImg) currentproductImg.src = choosenProduct.colors[0].img;
      currentproductColors.forEach((colorEl, i) => {
        if (choosenProduct.colors[i]) colorEl.style.backgroundColor = choosenProduct.colors[i].code;
      });
    }
  });
}


// -----------------  CART (localStorage)  -----------------
function getCart() {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch(e) {
    return [];
  }
}
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) item.qty++;
  else cart.push({ id: productId, qty: 1 });

  saveCart(cart);
  // Quick user feedback
  flashMessage("Added to cart");
}

function removeFromCart(productId) {
  const cart = getCart().filter(i => i.id !== productId);
  saveCart(cart);
}

function changeQty(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    const idx = cart.findIndex(i => i.id === productId);
    cart.splice(idx, 1);
  }
  saveCart(cart);
}

function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  if (!countEl) return;
  const cart = getCart();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  countEl.textContent = total;
}

// call once on load
updateCartCount();

function flashMessage(text) {
  // small toast-like message
  const t = document.createElement('div');
  t.textContent = text;
  t.style.position = 'fixed';
  t.style.bottom = '20px';
  t.style.left = '50%';
  t.style.transform = 'translateX(-50%)';
  t.style.background = '#111';
  t.style.color = 'white';
  t.style.padding = '8px 14px';
  t.style.borderRadius = '6px';
  t.style.zIndex = 9999;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1200);
}


// ------------- Helpers for cart page rendering -------------
// If a page has an element with id="cart-items", render the cart there.
async function renderCartPageIfExists() {
  const cartItemsEl = document.getElementById('cart-items');
  if (!cartItemsEl) return;
  // prepare product lookup map
  const map = {};
  products.forEach(p => map[p.id] = p);

  const cart = getCart();
  cartItemsEl.innerHTML = '';
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById('cart-total').innerText = 'Total: $0';
    return;
  }

  let total = 0;
  cart.forEach(ci => {
    const prod = map[ci.id];
    if (!prod) return;
    total += prod.price * ci.qty;
    const el = document.createElement('div');
    el.className = 'cart-row';
    el.style.display = 'flex';
    el.style.gap = '12px';
    el.style.alignItems = 'center';
    el.style.marginBottom = '12px';
    el.innerHTML = `
      <img src="${prod.colors[0].img}" width="80" alt="${prod.title}">
      <div style="flex:1">
        <strong>${prod.title}</strong>
        <div>Price: $${prod.price}</div>
        <div>Qty: <button class="dec" data-id="${ci.id}">-</button> ${ci.qty} <button class="inc" data-id="${ci.id}">+</button></div>
      </div>
      <div><button class="remove" data-id="${ci.id}">Remove</button></div>
    `;
    cartItemsEl.appendChild(el);
  });

  document.getElementById('cart-total').innerText = 'Total: $' + total.toFixed(2);

  // attach event listeners
  cartItemsEl.querySelectorAll('.remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      removeFromCart(e.target.dataset.id);
      renderCartPageIfExists();
    });
  });
  cartItemsEl.querySelectorAll('.dec').forEach(btn => {
    btn.addEventListener('click', (e) => {
      changeQty(e.target.dataset.id, -1);
      renderCartPageIfExists();
    });
  });
  cartItemsEl.querySelectorAll('.inc').forEach(btn => {
    btn.addEventListener('click', (e) => {
      changeQty(e.target.dataset.id, 1);
      renderCartPageIfExists();
    });
  });
}

// Run render on DOMContentLoaded for cart page
window.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCartPageIfExists();
});
