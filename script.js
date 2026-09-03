/* ===== Omkar Kirana Store — App Script ===== */

const STORE_PHONE = "919823704458";

/* Real photos sourced from Wikimedia Commons (freely licensed) */
const IMG = {
  hero: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/DFC_5257-_Fresh_tropical_bounty%2C_ripe_cherry_tomatoes%2C_green_limes_and_bananas_piled_together_at_a_local_Thai_market..jpg/500px-DFC_5257-_Fresh_tropical_bounty%2C_ripe_cherry_tomatoes%2C_green_limes_and_bananas_piled_together_at_a_local_Thai_market..jpg",
  promo1: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/20201102.Hengnan.Hybrid_rice_Sanyou-1.6.jpg/500px-20201102.Hengnan.Hybrid_rice_Sanyou-1.6.jpg",
  promo2: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Clorox_Cleaning_Caddy.jpg",
  about: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Popcorn_-_Studio_-_2011.jpg/500px-Popcorn_-_Studio_-_2011.jpg",

  cat_grocery: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/22/A_shelf_display_of_apples_marked_with_special_prices_at_a_local_grocery_store_in_Palapye%2CBotswana.jpg/500px-A_shelf_display_of_apples_marked_with_special_prices_at_a_local_grocery_store_in_Palapye%2CBotswana.jpg",
  cat_pulses: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/3_types_of_lentil.png/500px-3_types_of_lentil.png",
  cat_masala: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Spices1.jpg/500px-Spices1.jpg",
  cat_snacks: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Choco_chip_cookie.png/500px-Choco_chip_cookie.png",
  cat_beverages: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Longjing_tea_steeping_in_gaiwan.jpg/500px-Longjing_tea_steeping_in_gaiwan.jpg",
  cat_instant: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Nissin_Cup_Noodle_%28Original%29_-_01.jpg/500px-Nissin_Cup_Noodle_%28Original%29_-_01.jpg",
  cat_household: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7b/HK_Sheung_Wan_%E6%97%A5%E6%9C%AC%E5%9F%8E_Japan_Home_Centre_%E8%97%8D%E5%A8%81%E5%AF%B6_Sara_Lee_SWIPE_blue_concentrate_cleaning_products_%E8%97%8D%E8%87%B3%E5%B0%8A_Campbell_April-2012.JPG/500px-HK_Sheung_Wan_%E6%97%A5%E6%9C%AC%E5%9F%8E_Japan_Home_Centre_%E8%97%8D%E5%A8%81%E5%AF%B6_Sara_Lee_SWIPE_blue_concentrate_cleaning_products_%E8%97%8D%E8%87%B3%E5%B0%8A_Campbell_April-2012.JPG",
  cat_personal: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/The_Laylow_-_Hotel_Shampoos_and_Soaps_%2849539076973%29.jpg/500px-The_Laylow_-_Hotel_Shampoos_and_Soaps_%2849539076973%29.jpg",
  cat_dairy: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/DairyProductsGermany.jpg/500px-DairyProductsGermany.jpg",

  rice: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Half_a_cup_of_rice._Brown_rice_is_the_best_choice.JPG/500px-Half_a_cup_of_rice._Brown_rice_is_the_best_choice.JPG",
  atta: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Atta_flour.jpg/500px-Atta_flour.jpg",
  oil: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/Flat_toothed_salad_oil_bottle_filter.jpg/500px-Flat_toothed_salad_oil_bottle_filter.jpg",
  salt: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Coppa_contenente_resti_di_uccelli_conservati_nel_sale_1DSC4405-HDR.tif/lossy-page1-500px-Coppa_contenente_resti_di_uccelli_conservati_nel_sale_1DSC4405-HDR.tif.jpg",
  toor_dal: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/Mix_lentils_Uttapam_IMG_5948.jpg/500px-Mix_lentils_Uttapam_IMG_5948.jpg",
  moong_dal: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/Moong_Dal_Barfi.JPG/500px-Moong_Dal_Barfi.JPG",
  masoor_dal: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e2/A_mix_of_split_lentils%2C_masoor_dal_India.jpg/500px-A_mix_of_split_lentils%2C_masoor_dal_India.jpg",
  chana_dal: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/Split_Chickpeas.jpg/500px-Split_Chickpeas.jpg",
  urad_dal: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/48/Urad_dal_black_gram.jpg/500px-Urad_dal_black_gram.jpg",
  rajma: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c6/Red_Speckled_Kidney_Beans.jpg/500px-Red_Speckled_Kidney_Beans.jpg",
  kabuli_chana: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Chickpea_BNC.jpg/500px-Chickpea_BNC.jpg",
  poha: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/80/Poha.jpg/500px-Poha.jpg",
  suji: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/MTR_Rava_Idli.jpg/500px-MTR_Rava_Idli.jpg",
  besan: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Gram_flour_Chilla_%28Besan_ka_Cheela%29.JPG/500px-Gram_flour_Chilla_%28Besan_ka_Cheela%29.JPG",

  chilli_powder: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/Red_Chili_Powder_%28Lall_Mirch%29_%2849695826571%29.jpg/500px-Red_Chili_Powder_%28Lall_Mirch%29_%2849695826571%29.jpg",
  turmeric_powder: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Turmeric_inflorescence.jpg/500px-Turmeric_inflorescence.jpg",
  coriander_powder: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Coriandrum_sativum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-193.jpg/500px-Coriandrum_sativum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-193.jpg",
  garam_masala: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Garammasalaphoto.jpg/500px-Garammasalaphoto.jpg",
  jeera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Cuminum_cyminum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-198.jpg/500px-Cuminum_cyminum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-198.jpg",
  mustard_seeds: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Mustard_plant_flower.jpg/500px-Mustard_plant_flower.jpg",

  biscuit: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8f/Lot-3474-12_%2834212436374%29.jpg/500px-Lot-3474-12_%2834212436374%29.jpg",
  wafers: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a1/Chips_in_a_bowl_at_a_party.JPG/500px-Chips_in_a_bowl_at_a_party.JPG",
  kurkure: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/No_Name_cheese_flavour_twists%2C_Canada%2C_detail_02.jpg/500px-No_Name_cheese_flavour_twists%2C_Canada%2C_detail_02.jpg",
  namkeen: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Bombaymix.jpg/500px-Bombaymix.jpg",

  tea: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/Darjeeling%2C_India%2C_Darjeeling_tea%2C_Black_tea.jpg/500px-Darjeeling%2C_India%2C_Darjeeling_tea%2C_Black_tea.jpg",
  coffee: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/A_cup_of_coffee_on_a_bench.jpg/500px-A_cup_of_coffee_on_a_bench.jpg",
  cold_drink: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Glass_of_Cola.jpg/500px-Glass_of_Cola.jpg",
  juice: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Mango_juice_at_Agasi%2C_Lajpat_Nagar%2C_Delhi_%282025-10-04%29.jpg/500px-Mango_juice_at_Agasi%2C_Lajpat_Nagar%2C_Delhi_%282025-10-04%29.jpg",

  noodles: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/Five_packs_of_shrimp-flavoured_instant_noodles.jpg/500px-Five_packs_of_shrimp-flavoured_instant_noodles.jpg",
  soup: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Asparagus_soup_%28spargelsuppe%29.jpg/500px-Asparagus_soup_%28spargelsuppe%29.jpg",

  detergent: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Diskflaskor.JPG/500px-Diskflaskor.JPG",
  dishwash: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Afwasmiddel.jpg/500px-Afwasmiddel.jpg",
  floor_cleaner: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Disinfection_with_mop.jpg",
  mosquito: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Mosquito_coil.JPG/500px-Mosquito_coil.JPG",

  soap: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/Cold_Cream_Soap_Hilko%2C_soap_bar%2C_pic3.JPG/500px-Cold_Cream_Soap_Hilko%2C_soap_bar%2C_pic3.JPG",
  shampoo: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f3/A_bottle_of_Aveeno_Baby_Wash_%26_Shampoo_02.jpg/500px-A_bottle_of_Aveeno_Baby_Wash_%26_Shampoo_02.jpg",
  toothpaste: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/A_Brief_Look_At_The_History_Of_Toothbrushes_And_Toothpastes_%2850570386291%29.jpg/500px-A_Brief_Look_At_The_History_Of_Toothbrushes_And_Toothpastes_%2850570386291%29.jpg",
  coconut_oil: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/Coconut_oil_bottle_in_the_background_of_coconuts_from_Kaleeswari_Farm.jpg/500px-Coconut_oil_bottle_in_the_background_of_coconuts_from_Kaleeswari_Farm.jpg",
  vaseline: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/White_Petrolatum1.jpg/500px-White_Petrolatum1.jpg",

  milk: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/Glass_Milk_Bottles.tif/lossy-page1-500px-Glass_Milk_Bottles.tif.jpg",
  butter: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/Block_of_butter_in_butter_dish.jpg/500px-Block_of_butter_in_butter_dish.jpg",
  cheese: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/White_cheddar_cheese_sliced_CNE.jpg/500px-White_cheddar_cheese_sliced_CNE.jpg",
  curd: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/Curd_in_steel_bowl.jpg/500px-Curd_in_steel_bowl.jpg",
  paneer: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Cottage_cheese_in_spinach_gravy%28palak_paneer%29.jpg/500px-Cottage_cheese_in_spinach_gravy%28palak_paneer%29.jpg",
};

const CATEGORIES = [
  { key: "grocery",   name: "किराणा व जीवनावश्यक वस्तू", img: IMG.cat_grocery },
  { key: "pulses",    name: "डाळी व कडधान्ये", img: IMG.cat_pulses },
  { key: "masala",    name: "मसाले", img: IMG.cat_masala },
  { key: "snacks",    name: "स्नॅक्स व बिस्किटे", img: IMG.cat_snacks },
  { key: "beverages", name: "पेये", img: IMG.cat_beverages },
  { key: "instant",   name: "इन्स्टंट फूड", img: IMG.cat_instant },
  { key: "household", name: "घरगुती वस्तू", img: IMG.cat_household },
  { key: "personal",  name: "पर्सनल केअर", img: IMG.cat_personal },
  { key: "dairy",     name: "दुग्धजन्य व दैनंदिन वस्तू", img: IMG.cat_dairy },
];

const CAT_MAP = Object.fromEntries(CATEGORIES.map(c => [c.key, c]));

let _id = 1;
function p(name, category, img, price) {
  return { id: _id++, name, category, img, price };
}

const PRODUCTS = [
  // Grocery / Staples
  p("Aashirvaad Atta (5kg)", "grocery", IMG.atta, 249),
  p("Fortune Chakki Atta (5kg)", "grocery", IMG.atta, 239),
  p("India Gate Basmati Rice (1kg)", "grocery", IMG.rice, 145),
  p("Daawat Basmati Rice (1kg)", "grocery", IMG.rice, 150),
  p("Tata Salt (1kg)", "grocery", IMG.salt, 28),
  p("Fortune Sunflower Oil (1L)", "grocery", IMG.oil, 145),
  p("Saffola Gold Oil (1L)", "grocery", IMG.oil, 165),
  p("Dhara Oil (1L)", "grocery", IMG.oil, 140),
  p("Tata Sampann Toor Dal (1kg)", "grocery", IMG.toor_dal, 165),
  p("Fortune Arhar Dal (1kg)", "grocery", IMG.toor_dal, 160),
  p("India Gate Rice Feast Rozana (1kg)", "grocery", IMG.rice, 90),

  // Dal, Pulses & Grains
  p("Toor Dal (1kg)", "pulses", IMG.toor_dal, 155),
  p("Moong Dal (1kg)", "pulses", IMG.moong_dal, 135),
  p("Masoor Dal (1kg)", "pulses", IMG.masoor_dal, 110),
  p("Chana Dal (1kg)", "pulses", IMG.chana_dal, 95),
  p("Urad Dal (1kg)", "pulses", IMG.urad_dal, 145),
  p("Rajma (1kg)", "pulses", IMG.rajma, 150),
  p("Kabuli Chana (1kg)", "pulses", IMG.kabuli_chana, 120),
  p("Green Moong (1kg)", "pulses", IMG.moong_dal, 130),
  p("Poha (500g)", "pulses", IMG.poha, 45),
  p("Suji / Rava (1kg)", "pulses", IMG.suji, 55),
  p("Besan (1kg)", "pulses", IMG.besan, 90),

  // Masala & Spices
  p("MDH Masala (Mix Pack)", "masala", IMG.garam_masala, 60),
  p("Everest Masala (Mix Pack)", "masala", IMG.garam_masala, 58),
  p("Tata Sampann Spices (100g)", "masala", IMG.cat_masala, 65),
  p("Catch Spices (100g)", "masala", IMG.cat_masala, 55),
  p("Red Chilli Powder (200g)", "masala", IMG.chilli_powder, 70),
  p("Turmeric Powder (200g)", "masala", IMG.turmeric_powder, 55),
  p("Coriander Powder (200g)", "masala", IMG.coriander_powder, 50),
  p("Garam Masala (100g)", "masala", IMG.garam_masala, 65),
  p("Jeera (100g)", "masala", IMG.jeera, 45),
  p("Mustard Seeds (100g)", "masala", IMG.mustard_seeds, 30),

  // Snacks & Biscuits
  p("Parle-G Biscuits", "snacks", IMG.biscuit, 10),
  p("Britannia Good Day", "snacks", IMG.biscuit, 30),
  p("Britannia Marie Gold", "snacks", IMG.biscuit, 35),
  p("Parle Monaco", "snacks", IMG.biscuit, 25),
  p("Hide & Seek", "snacks", IMG.biscuit, 30),
  p("Balaji Wafers", "snacks", IMG.wafers, 20),
  p("Kurkure", "snacks", IMG.kurkure, 20),
  p("Lays", "snacks", IMG.wafers, 20),
  p("Haldiram's Namkeen", "snacks", IMG.namkeen, 55),
  p("Bingo", "snacks", IMG.wafers, 20),

  // Beverages
  p("Tata Tea (250g)", "beverages", IMG.tea, 130),
  p("Brooke Bond Red Label (250g)", "beverages", IMG.tea, 125),
  p("Taj Mahal Tea (250g)", "beverages", IMG.tea, 150),
  p("Bru Coffee (100g)", "beverages", IMG.coffee, 190),
  p("Nescafé Classic (50g)", "beverages", IMG.coffee, 165),
  p("Rasna Concentrate", "beverages", IMG.juice, 45),
  p("Frooti (200ml)", "beverages", IMG.juice, 20),
  p("Maaza (250ml)", "beverages", IMG.juice, 25),
  p("Thums Up (250ml)", "beverages", IMG.cold_drink, 25),
  p("Limca (250ml)", "beverages", IMG.cold_drink, 25),

  // Instant Food
  p("Maggi Noodles", "instant", IMG.noodles, 14),
  p("Yippee Noodles", "instant", IMG.noodles, 14),
  p("Knorr Soup", "instant", IMG.soup, 35),
  p("MTR Ready Mix", "instant", IMG.suji, 60),
  p("Ching's Secret Masala", "instant", IMG.chilli_powder, 20),
  p("Wai Wai Noodles", "instant", IMG.noodles, 15),

  // Household
  p("Surf Excel (1kg)", "household", IMG.detergent, 130),
  p("Ariel Detergent (1kg)", "household", IMG.detergent, 145),
  p("Tide Detergent (1kg)", "household", IMG.detergent, 120),
  p("Rin Bar / Powder", "household", IMG.detergent, 20),
  p("Vim Dishwash Bar", "household", IMG.dishwash, 10),
  p("Harpic Toilet Cleaner", "household", IMG.floor_cleaner, 95),
  p("Lizol Floor Cleaner", "household", IMG.floor_cleaner, 130),
  p("Colin Glass Cleaner", "household", IMG.dishwash, 90),
  p("Dettol Antiseptic (100ml)", "household", IMG.floor_cleaner, 65),
  p("Good Knight Coils / Liquid", "household", IMG.mosquito, 55),

  // Personal Care
  p("Lux Soap", "personal", IMG.soap, 35),
  p("Dove Soap", "personal", IMG.soap, 55),
  p("Lifebuoy Soap", "personal", IMG.soap, 30),
  p("Santoor Soap", "personal", IMG.soap, 35),
  p("Pears Soap", "personal", IMG.soap, 55),
  p("Clinic Plus Shampoo", "personal", IMG.shampoo, 45),
  p("Head & Shoulders Shampoo", "personal", IMG.shampoo, 95),
  p("Sunsilk Shampoo", "personal", IMG.shampoo, 65),
  p("Colgate Toothpaste", "personal", IMG.toothpaste, 55),
  p("Closeup Toothpaste", "personal", IMG.toothpaste, 50),
  p("Parachute Coconut Oil", "personal", IMG.coconut_oil, 90),
  p("Vaseline Petroleum Jelly", "personal", IMG.vaseline, 65),

  // Dairy / Daily Essentials
  p("Amul Milk (500ml)", "dairy", IMG.milk, 28),
  p("Amul Butter (100g)", "dairy", IMG.butter, 58),
  p("Amul Cheese Slices", "dairy", IMG.cheese, 125),
  p("Amul Curd (400g)", "dairy", IMG.curd, 45),
  p("Amul Paneer (200g)", "dairy", IMG.paneer, 90),
  p("Mother Dairy Milk (500ml)", "dairy", IMG.milk, 27),
  p("Milk Powder (200g)", "dairy", IMG.milk, 130),
];

/* ===== STATE ===== */
let activeCategory = "all";
let searchTerm = "";
let cart = JSON.parse(localStorage.getItem("okStoreCart") || "{}");

/* ===== HERO / PROMO / ABOUT IMAGES ===== */
document.getElementById("promoImg1").src = IMG.promo1;
document.getElementById("promoImg2").src = IMG.promo2;
document.getElementById("aboutImg").src = IMG.about;
document.querySelectorAll(".hero-basket img[data-img]").forEach(img => {
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
      addToCart(Number(btn.dataset.id));
    });
  });
}

/* ===== CART ===== */
function saveCart() {
  localStorage.setItem("okStoreCart", JSON.stringify(cart));
}

function addToCart(id) {
  const product = PRODUCTS.find(pr => pr.id === id);
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

function renderCart() {
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
    const pr = PRODUCTS.find(x => x.id === Number(id));
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
      const id = Number(btn.dataset.id);
      changeQty(id, btn.dataset.act === "plus" ? 1 : -1);
    });
  });

  // build whatsapp order message
  let msg = "नमस्कार ओमकार किराणा स्टोअर! 🙏%0Aमला खालील वस्तू हव्या आहेत:%0A%0A";
  entries.forEach(([id, v]) => {
    const pr = PRODUCTS.find(x => x.id === Number(id));
    msg += `• ${pr.name} x ${v.qty}%0A`;
  });
  msg += `%0Aएकूण (अंदाजे): ₹${total}%0A%0Aकृपया उपलब्धता निश्चित करा. धन्यवाद!`;
  orderWhatsapp.href = `https://wa.me/${STORE_PHONE}?text=${msg}`;
}

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
document.getElementById("year").textContent = new Date().getFullYear();
