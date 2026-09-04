/* ===== Omkar Kirana Store — App Script ===== */


/* ===== STATE ===== */
let PRODUCTS = DEFAULT_PRODUCTS;
let activeCategory = "all";
let searchTerm = "";
let cart = JSON.parse(localStorage.getItem("okStoreCart") || "{}");

/* ===== LOAD PRODUCTS FROM FIRESTORE (falls back to DEFAULT_PRODUCTS if empty/offline) ===== */
async function loadProductsFromFirestore() {
  try {
    const snap = await db.collection("products").orderBy("createdAt", "asc").get();
    if (!snap.empty) {
      PRODUCTS = snap.docs.map(doc => {
        const d = doc.data();
        return { id: doc.id, name: d.name, category: d.category, img: d.img, price: d.price };
      });
    }
  } catch (e) {
    console.warn("Could not load products from Firestore, using defaults.", e);
  }
  renderAll();
}

/* ===== HERO / PROMO / ABOUT IMAGES ===== */
document.getElementById("promoImg1").src = IMG.promo1;
document.getElementById("promoImg2").src = IMG.promo2;
document.getElementById("aboutImg").src = IMG.about;
document.querySelectorAll(".item[data-img]").forEach(img => {
  img.src = IMG[img.dataset.img];
});

/* ===== RENDER CATEGORIES ===== */
const catScroll = document.getElementById("catScroll");
function renderCategories() {
  const allChip = `<div class="cat-card" data-cat="all">
      <div class="cat-img-wrap"><img src="${IMG.cat_grocery}" alt="सर्व उत्पादने" loading="lazy"></div>
      <span class="cat-name">सर्व</span>
    </div>`;
  const cards = CATEGORIES.map(c => `
    <div class="cat-card" data-cat="${c.key}">
      <div class="cat-img-wrap"><img src="${c.img}" alt="${c.name}" loading="lazy"></div>
      <span class="cat-name">${c.name}</span>
    </div>`).join("");
  catScroll.innerHTML = allChip + cards;

  catScroll.querySelectorAll(".cat-card").forEach(el => {
    el.addEventListener("click", () => {
      activeCategory = el.dataset.cat;
      document.getElementById("products").scrollIntoView({ behavior: "smooth" });
      renderAll();
    });
  });
}

/* ===== FILTER CHIPS ===== */
const filterChips = document.getElementById("filterChips");
function renderChips() {
  const chips = [{ key: "all", name: "सर्व" }, ...CATEGORIES];
  filterChips.innerHTML = chips.map(c =>
    `<button class="chip ${activeCategory === c.key ? "active" : ""}" data-cat="${c.key}">${c.name}</button>`
  ).join("");
  filterChips.querySelectorAll(".chip").forEach(el => {
    el.addEventListener("click", () => {
      activeCategory = el.dataset.cat;
      renderAll();
    });
  });
}

/* ===== PRODUCTS GRID ===== */
const productGrid = document.getElementById("productGrid");
const emptyMsg = document.getElementById("emptyMsg");
function renderProducts() {
  let list = PRODUCTS.filter(pr => activeCategory === "all" || pr.category === activeCategory);
  if (searchTerm.trim()) {
    const t = searchTerm.toLowerCase();
    list = list.filter(pr => pr.name.toLowerCase().includes(t));
  }

  emptyMsg.hidden = list.length !== 0;
  productGrid.innerHTML = list.map(pr => {
    const cat = CAT_MAP[pr.category];
    const qty = cart[pr.id]?.qty || 0;
    const oldPrice = Math.round(pr.price * 1.15);
    const off = Math.round(100 - (pr.price / oldPrice) * 100);
    return `
    <div class="product-card">
      <div class="product-thumb">
        <span class="product-badge">${off}% सूट</span>
        <img src="${pr.img}" alt="${pr.name}" loading="lazy">
      </div>
      <div class="product-body">
        <h3>${pr.name}</h3>
        <span class="brand">${cat.name}</span>
        <span class="stars">★★★★☆</span>
        <div class="product-foot">
          <div class="price-wrap">
            <span class="price-old">₹${oldPrice}</span>
            <span class="price">₹${pr.price}</span>
          </div>
          <button class="add-btn" data-id="${pr.id}" aria-label="यादीत टाका">${qty > 0 ? `यादीत आहे (${qty})` : "टाका"}</button>
        </div>
      </div>
    </div>`;
  }).join("");

  productGrid.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      addToCart(btn.dataset.id);
    });
  });
}

/* ===== CART ===== */
function saveCart() {
  localStorage.setItem("okStoreCart", JSON.stringify(cart));
}

function addToCart(id) {
  const product = PRODUCTS.find(pr => String(pr.id) === String(id));
  if (!product) return;
  if (!cart[id]) cart[id] = { qty: 0 };
  cart[id].qty += 1;
  saveCart();
  renderAll();
  openCart();
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id].qty += delta;
  if (cart[id].qty <= 0) delete cart[id];
  saveCart();
  renderAll();
}

const cartCount = document.getElementById("cartCount");
const cartTotalMini = document.getElementById("cartTotalMini");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const orderWhatsapp = document.getElementById("orderWhatsapp");
const customerNameInput = document.getElementById("customerName");
const customerPhoneInput = document.getElementById("customerPhone");

function renderCart() {
  // Drop stale cart entries that don't match any currently loaded product
  // (can happen if items were added before Firestore products finished loading)
  let cartChanged = false;
  Object.keys(cart).forEach(id => {
    if (!PRODUCTS.some(p => String(p.id) === String(id))) {
      delete cart[id];
      cartChanged = true;
    }
  });
  if (cartChanged) saveCart();

  const entries = Object.entries(cart);
  const totalQty = entries.reduce((s, [, v]) => s + v.qty, 0);
  cartCount.textContent = totalQty;

  if (entries.length === 0) {
    cartItemsEl.innerHTML = `<p class="cart-empty">तुमची यादी रिकामी आहे.<br>उत्पादने जोडायला सुरुवात करा! 🛍️</p>`;
    cartTotalEl.textContent = "₹0";
    cartTotalMini.textContent = "0";
    orderWhatsapp.href = `https://wa.me/${STORE_PHONE}`;
    return;
  }

  let total = 0;
  cartItemsEl.innerHTML = entries.map(([id, v]) => {
    const pr = PRODUCTS.find(x => String(x.id) === String(id));
    total += pr.price * v.qty;
    return `
    <div class="cart-item">
      <div class="ci-thumb"><img src="${pr.img}" alt="${pr.name}" loading="lazy"></div>
      <div class="ci-info">
        <h5>${pr.name}</h5>
        <span>₹${pr.price} x ${v.qty}</span>
      </div>
      <div class="qty-control">
        <button data-id="${id}" data-act="minus">−</button>
        <span>${v.qty}</span>
        <button data-id="${id}" data-act="plus">+</button>
      </div>
    </div>`;
  }).join("");

  cartTotalEl.textContent = `₹${total}`;
  cartTotalMini.textContent = total;

  cartItemsEl.querySelectorAll("[data-act]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      changeQty(id, btn.dataset.act === "plus" ? 1 : -1);
    });
  });

  // build whatsapp order message
  const custName = customerNameInput.value.trim();
  const custPhone = customerPhoneInput.value.trim();
  let msg = "नमस्कार ॐ कार किराणा स्टोअर! 🙏%0A";
  if (custName) msg += `माझे नाव: ${custName}%0A`;
  if (custPhone) msg += `माझा नंबर: ${custPhone}%0A`;
  msg += "मला खालील वस्तू हव्या आहेत:%0A%0A";
  entries.forEach(([id, v]) => {
    const pr = PRODUCTS.find(x => String(x.id) === String(id));
    msg += `• ${pr.name} x ${v.qty}%0A`;
  });
  msg += `%0Aएकूण (अंदाजे): ₹${total}%0A%0Aकृपया उपलब्धता निश्चित करा. धन्यवाद!`;
  orderWhatsapp.href = `https://wa.me/${STORE_PHONE}?text=${msg}`;
}

/* ===== SAVE ORDER TO ADMIN DASHBOARD ===== */
orderWhatsapp.addEventListener("click", () => {
  const entries = Object.entries(cart);
  if (entries.length === 0) return;
  const items = entries.map(([id, v]) => {
    const pr = PRODUCTS.find(x => String(x.id) === String(id));
    return { name: pr.name, qty: v.qty, price: pr.price };
  });
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  db.collection("orders").add({
    customerName: customerNameInput.value.trim() || "नाव दिले नाही",
    customerPhone: customerPhoneInput.value.trim() || "नंबर दिला नाही",
    items,
    total,
    status: "नवीन",
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  }).catch(err => console.warn("Order log failed:", err));
});

/* ===== CART DRAWER TOGGLE ===== */
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
function openCart() {
  cartDrawer.classList.add("open");
  overlay.classList.add("open");
}
function closeCartFn() {
  cartDrawer.classList.remove("open");
  overlay.classList.remove("open");
}
document.getElementById("cartToggle").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCartFn);
overlay.addEventListener("click", () => {
  closeCartFn();
  navEl.classList.remove("open");
});

/* ===== SEARCH ===== */
const searchInput = document.getElementById("searchInput");
function doSearch(val) {
  searchTerm = val;
  renderProducts();
  if (searchTerm.trim()) document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}
searchInput.addEventListener("input", (e) => doSearch(e.target.value));
document.getElementById("searchBtn").addEventListener("click", () => doSearch(searchInput.value));
document.querySelectorAll(".mobile-search input").forEach(inp => {
  inp.addEventListener("input", (e) => doSearch(e.target.value));
});

/* ===== MOBILE NAV ===== */
const navEl = document.getElementById("nav");
document.getElementById("hamburger").addEventListener("click", () => {
  navEl.classList.toggle("open");
});
navEl.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navEl.classList.remove("open")));

/* ===== INIT ===== */
function renderAll() {
  renderChips();
  renderProducts();
  renderCart();
}
renderCategories();
renderAll();
loadProductsFromFirestore();
document.getElementById("year").textContent = new Date().getFullYear();
