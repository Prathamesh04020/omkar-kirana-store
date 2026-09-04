/* ===== ॐ कार किराणा — Admin Panel Script ===== */

const loginScreen = document.getElementById("loginScreen");
const adminApp = document.getElementById("adminApp");
const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginError = document.getElementById("loginError");
const loginBtn = document.getElementById("loginBtn");
const adminUserLabel = document.getElementById("adminUserLabel");
const logoutBtn = document.getElementById("logoutBtn");

const catTabs = document.getElementById("catTabs");
const productTable = document.getElementById("productTable");
const addProductBtn = document.getElementById("addProductBtn");
const seedBtn = document.getElementById("seedBtn");
const seedNote = document.getElementById("seedNote");

const productModal = document.getElementById("productModal");
const productForm = document.getElementById("productForm");
const modalTitle = document.getElementById("modalTitle");
const photoInput = document.getElementById("photoInput");
const photoPreview = document.getElementById("photoPreview");
const productNameInput = document.getElementById("productName");
const productCategoryInput = document.getElementById("productCategory");
const productPriceInput = document.getElementById("productPrice");
const productIdInput = document.getElementById("productId");
const cancelModalBtn = document.getElementById("cancelModalBtn");
const saveProductBtn = document.getElementById("saveProductBtn");
const toast = document.getElementById("toast");

let allProducts = [];
let activeAdminCategory = "all";
let currentPhotoDataUrl = null;

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

/* ===== AUTH ===== */
auth.onAuthStateChanged(user => {
  if (user) {
    loginScreen.style.display = "none";
    adminApp.style.display = "block";
    adminUserLabel.textContent = user.email;
    initAdmin();
  } else {
    loginScreen.style.display = "flex";
    adminApp.style.display = "none";
  }
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loginError.textContent = "";
  loginBtn.disabled = true;
  loginBtn.innerHTML = '<span class="spinner"></span> लॉगिन होत आहे...';
  try {
    await auth.signInWithEmailAndPassword(loginEmail.value.trim(), loginPassword.value);
  } catch (err) {
    loginError.textContent = "चुकीचा ईमेल किंवा पासवर्ड. पुन्हा प्रयत्न करा.";
  }
  loginBtn.disabled = false;
  loginBtn.textContent = "लॉगिन करा";
});

logoutBtn.addEventListener("click", () => auth.signOut());

/* ===== CATEGORY TABS ===== */
function renderCatTabs() {
  const tabs = [{ key: "all", name: "सर्व" }, ...CATEGORIES];
  catTabs.innerHTML = tabs.map(c =>
    `<button class="cat-tab ${activeAdminCategory === c.key ? "active" : ""}" data-cat="${c.key}">${c.name}</button>`
  ).join("");
  catTabs.querySelectorAll(".cat-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      activeAdminCategory = btn.dataset.cat;
      renderCatTabs();
      renderProductTable();
    });
  });
}

/* ===== PRODUCT TABLE ===== */
function renderProductTable() {
  const list = allProducts.filter(p => activeAdminCategory === "all" || p.category === activeAdminCategory);
  if (list.length === 0) {
    productTable.innerHTML = `<div class="empty-state">या श्रेणीत अजून उत्पादने नाहीत.</div>`;
    return;
  }
  productTable.innerHTML = list.map(p => {
    const catName = CAT_MAP[p.category]?.name || p.category;
    return `
    <div class="product-row">
      <img src="${p.img || ""}" alt="${p.name}">
      <div class="p-info">
        <div class="p-name">${p.name}</div>
        <div class="p-meta">${catName} · ₹${p.price}</div>
      </div>
      <div class="p-actions">
        <button class="icon-btn" data-edit="${p.id}" aria-label="संपादित करा">✏️</button>
        <button class="icon-btn" data-delete="${p.id}" aria-label="काढा">🗑️</button>
      </div>
    </div>`;
  }).join("");

  productTable.querySelectorAll("[data-edit]").forEach(btn => {
    btn.addEventListener("click", () => openEditModal(btn.dataset.edit));
  });
  productTable.querySelectorAll("[data-delete]").forEach(btn => {
    btn.addEventListener("click", () => deleteProduct(btn.dataset.delete));
  });
}

async function loadAllProducts() {
  productTable.innerHTML = `<div class="empty-state">लोड होत आहे...</div>`;
  const snap = await db.collection("products").orderBy("createdAt", "desc").get();
  allProducts = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  renderProductTable();
  seedNote.textContent = allProducts.length === 0
    ? "अजून एकही उत्पादन नाही. सुरुवात करण्यासाठी 'आरंभिक उत्पादने भरा' दाबा किंवा नवीन उत्पादन जोडा."
    : `एकूण ${allProducts.length} उत्पादने.`;
}

/* ===== CATEGORY DROPDOWN (for modal) ===== */
function fillCategoryDropdown() {
  productCategoryInput.innerHTML = CATEGORIES.map(c => `<option value="${c.key}">${c.name}</option>`).join("");
}

/* ===== ADD / EDIT MODAL ===== */
function openAddModal() {
  modalTitle.textContent = "नवीन उत्पादन जोडा";
  productForm.reset();
  productIdInput.value = "";
  currentPhotoDataUrl = null;
  photoPreview.innerHTML = `<span>फोटो निवडा 📷</span>`;
  productModal.classList.add("open");
}

function openEditModal(id) {
  const p = allProducts.find(x => x.id === id);
  if (!p) return;
  modalTitle.textContent = "उत्पादन संपादित करा";
  productIdInput.value = p.id;
  productNameInput.value = p.name;
  productCategoryInput.value = p.category;
  productPriceInput.value = p.price;
  currentPhotoDataUrl = p.img || null;
  photoPreview.innerHTML = p.img ? `<img src="${p.img}" alt="">` : `<span>फोटो निवडा 📷</span>`;
  productModal.classList.add("open");
}

function closeModal() {
  productModal.classList.remove("open");
}

addProductBtn.addEventListener("click", openAddModal);
cancelModalBtn.addEventListener("click", closeModal);
productModal.addEventListener("click", (e) => { if (e.target === productModal) closeModal(); });

/* ===== PHOTO COMPRESSION (client-side, no Storage needed) ===== */
photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const maxDim = 500;
      let { width, height } = img;
      if (width > height && width > maxDim) { height = height * (maxDim / width); width = maxDim; }
      else if (height > maxDim) { width = width * (maxDim / height); height = maxDim; }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(img, 0, 0, width, height);
      currentPhotoDataUrl = canvas.toDataURL("image/jpeg", 0.72);
      photoPreview.innerHTML = `<img src="${currentPhotoDataUrl}" alt="">`;
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
});

/* ===== SAVE PRODUCT ===== */
productForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  saveProductBtn.disabled = true;
  saveProductBtn.innerHTML = '<span class="spinner"></span> जतन होत आहे...';

  const id = productIdInput.value;
  const data = {
    name: productNameInput.value.trim(),
    category: productCategoryInput.value,
    price: Number(productPriceInput.value),
    img: currentPhotoDataUrl || "",
  };

  try {
    if (id) {
      await db.collection("products").doc(id).update(data);
      showToast("उत्पादन अद्ययावत केले ✅");
    } else {
      data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
      await db.collection("products").add(data);
      showToast("नवीन उत्पादन जोडले ✅");
    }
    closeModal();
    await loadAllProducts();
  } catch (err) {
    showToast("त्रुटी: " + err.message);
  }
  saveProductBtn.disabled = false;
  saveProductBtn.textContent = "जतन करा";
});

/* ===== DELETE PRODUCT ===== */
async function deleteProduct(id) {
  const p = allProducts.find(x => x.id === id);
  if (!confirm(`"${p?.name}" काढून टाकायचे आहे का?`)) return;
  await db.collection("products").doc(id).delete();
  showToast("उत्पादन काढले 🗑️");
  await loadAllProducts();
}

/* ===== SEED INITIAL PRODUCTS ===== */
seedBtn.addEventListener("click", async () => {
  if (allProducts.length > 0) {
    if (!confirm(`आधीच ${allProducts.length} उत्पादने आहेत. आरंभिक ${DEFAULT_PRODUCTS.length} उत्पादने पुन्हा भरायची आहेत का? (डुप्लिकेट होऊ शकतात)`)) return;
  } else {
    if (!confirm(`आरंभिक ${DEFAULT_PRODUCTS.length} उत्पादने डेटाबेसमध्ये भरायची आहेत का?`)) return;
  }
  seedBtn.disabled = true;
  seedBtn.innerHTML = '<span class="spinner"></span> भरत आहे...';
  try {
    let batch = db.batch();
    let count = 0;
    for (const p of DEFAULT_PRODUCTS) {
      const ref = db.collection("products").doc();
      batch.set(ref, {
        name: p.name,
        category: p.category,
        price: p.price,
        img: p.img,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      count++;
      if (count % 400 === 0) {
        await batch.commit();
        batch = db.batch();
      }
    }
    await batch.commit();
    showToast(`${DEFAULT_PRODUCTS.length} उत्पादने भरली ✅`);
    await loadAllProducts();
  } catch (err) {
    showToast("त्रुटी: " + err.message);
  }
  seedBtn.disabled = false;
  seedBtn.textContent = "आरंभिक उत्पादने भरा";
});

/* ===== INIT ===== */
function initAdmin() {
  fillCategoryDropdown();
  renderCatTabs();
  loadAllProducts();
}
