// Scroll to top
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  scrollTopBtn?.classList.toggle("show", scrollY > 400);
  document.getElementById("mainNav")?.classList.toggle("scrolled", scrollY > 40);
});
scrollTopBtn?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Hamburger menu
document.getElementById("hamburger")?.addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("open");
});

// Search bar
const searchToggle = document.getElementById("searchToggle");
const searchInput  = document.getElementById("searchInput");

searchToggle?.addEventListener("click", () => {
  searchInput.classList.toggle("open");
  if (searchInput.classList.contains("open")) searchInput.focus();
  else searchInput.value = "";
});

searchInput?.addEventListener("input", () => {
  const q = searchInput.value.toLowerCase();
  document.querySelectorAll(".product-card").forEach(card => {
    const name = card.querySelector(".product-name")?.textContent.toLowerCase() ?? "";
    const cat  = card.querySelector(".product-category")?.textContent.toLowerCase() ?? "";
    card.style.display = (name.includes(q) || cat.includes(q)) ? "" : "none";
  });
});

// Cart drawer
const cartDrawer  = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const cartCountEl = document.getElementById("cartCount");

let cart = [];

function openCart() {
  cartDrawer?.classList.add("open");
  cartOverlay?.classList.add("show");
}
function closeCart() {
  cartDrawer?.classList.remove("open");
  cartOverlay?.classList.remove("show");
}

document.getElementById("cartBtn")?.addEventListener("click", openCart);
document.getElementById("cartClose")?.addEventListener("click", closeCart);
cartOverlay?.addEventListener("click", closeCart);

function renderCart() {
  if (!cartItemsEl) return;
  if (cart.length === 0) {
    cartItemsEl.innerHTML = "<p class='cart-empty'>Your cart is empty.</p>";
    if (cartTotalEl) cartTotalEl.textContent = "$0.00";
    if (cartCountEl) cartCountEl.textContent = 0;
    return;
  }
  cartItemsEl.innerHTML = "";
  cart.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <div class="cart-item-info">
        <p class="cart-item-name">${item.title}</p>
        <p class="cart-item-price">$${item.price}</p>
      </div>
      <button class="cart-item-remove">✕</button>
    `;
    div.querySelector(".cart-item-remove").addEventListener("click", () => removeFromCart(i));
    cartItemsEl.appendChild(div);
  });
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  if (cartTotalEl) cartTotalEl.textContent = "$" + total.toFixed(2);
  if (cartCountEl) cartCountEl.textContent = cart.length;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function addToCart(title, price, image) {
  cart.push({ title, price: parseFloat(price), image });
  if (cartCountEl) cartCountEl.textContent = cart.length;
  renderCart();
  openCart();
}

// Theme switcher
const themes = {
  light:    { black: "#111110", white: "#F7F5F0", cream: "#EDE9E1" },
  dark:     { black: "#F7F5F0", white: "#111110", cream: "#1a1a1a" },
  cream:    { black: "#111110", white: "#EDE9E1", cream: "#E0D9CE" },
  midnight: { black: "#e0e0e0", white: "#1a1a2e", cream: "#16213e" },
};

document.querySelectorAll(".theme-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const t = themes[btn.dataset.theme];
    const root = document.documentElement.style;
    root.setProperty("--fig-black", t.black);
    root.setProperty("--fig-white", t.white);
    root.setProperty("--fig-cream", t.cream);
  });
});

// Load all products (products.html)
async function loadProducts() {
  const grid = document.getElementById("apiProductGrid");
  if (!grid) return;

  const status = document.getElementById("apiStatus");
  status.textContent = "Loading products...";

  try {
    const res = await fetch("https://fakestoreapi.com/products");
    let products = await res.json();

    let currentCat  = "all";
    let currentSort = "default";

    function renderProducts() {
      grid.innerHTML = "";
      let filtered = currentCat === "all" ? [...products] : products.filter(p => p.category === currentCat);
      if (currentSort === "low")    filtered.sort((a, b) => a.price - b.price);
      if (currentSort === "high")   filtered.sort((a, b) => b.price - a.price);
      if (currentSort === "rating") filtered.sort((a, b) => b.rating.rate - a.rating.rate);
      status.textContent = filtered.length + " products";
      filtered.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <div class="product-img-wrap">
            <img src="${p.image}" alt="${p.title}" loading="lazy" />
            <div class="product-overlay">
              <button class="product-quick-add">+ Add to Cart</button>
            </div>
          </div>
          <div class="product-info">
            <p class="product-category">${p.category}</p>
            <p class="product-name">${p.title}</p>
            <p class="product-price">$${p.price}</p>
            <p class="product-rating">⭐ ${p.rating.rate} (${p.rating.count} reviews)</p>
          </div>
        `;
        card.querySelector(".product-quick-add").addEventListener("click", () => addToCart(p.title, p.price, p.image));
        grid.appendChild(card);
      });
    }

    renderProducts();

    const urlCat = new URLSearchParams(window.location.search).get("cat");
    if (urlCat) {
      currentCat = urlCat;
      document.querySelectorAll(".sidebar-btn[data-cat]").forEach(b => {
        b.classList.remove("active");
        if (b.dataset.cat === urlCat) {
          b.classList.add("active");
          document.getElementById("shopHeading").textContent = b.textContent;
        }
      });
      renderProducts();
    }

    document.querySelectorAll(".sidebar-btn[data-cat]").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".sidebar-btn[data-cat]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentCat = btn.dataset.cat;
        document.getElementById("shopHeading").textContent = btn.textContent;
        renderProducts();
      });
    });

    document.querySelectorAll(".sidebar-btn[data-sort]").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".sidebar-btn[data-sort]").forEach(b => b.classList.remove("active-sort"));
        btn.classList.add("active-sort");
        currentSort = btn.dataset.sort;
        renderProducts();
      });
    });

  } catch (err) {
    status.textContent = "Failed to load products.";
    console.log(err);
  }
}

loadProducts();

// New arrivals (index.html)
async function loadNewArrivals() {
  const grid = document.getElementById("newArrivalsGrid");
  if (!grid) return;

  try {
    const res = await fetch("https://fakestoreapi.com/products?limit=3");
    const products = await res.json();
    products.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <div class="product-img-wrap">
          <img src="${p.image}" alt="${p.title}" loading="lazy" />
          <div class="product-overlay">
            <button class="product-quick-add">+ Add to Cart</button>
          </div>
        </div>
        <div class="product-info">
          <p class="product-category">${p.category}</p>
          <p class="product-name">${p.title}</p>
          <p class="product-price">$${p.price}</p>
          <p class="product-rating">⭐ ${p.rating.rate} (${p.rating.count} reviews)</p>
        </div>
      `;
      card.querySelector(".product-quick-add").addEventListener("click", () => addToCart(p.title, p.price, p.image));
      grid.appendChild(card);
    });
  } catch (err) {
    console.log(err);
  }
}

loadNewArrivals();

// Login form
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email    = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    let valid = true;

    document.getElementById("loginEmailErr").textContent = "";
    document.getElementById("loginPasswordErr").textContent = "";

    if (!email.includes("@") || !email.includes(".")) {
      document.getElementById("loginEmailErr").textContent = "Please enter a valid email.";
      valid = false;
    }
    if (password.length < 6) {
      document.getElementById("loginPasswordErr").textContent = "Password must be at least 6 characters.";
      valid = false;
    }
    if (valid) {
      loginForm.reset();
      document.getElementById("loginSuccess").style.display = "block";
      setTimeout(() => window.location.href = "index.html", 1500);
    }
  });
}

// Signup form
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name     = document.getElementById("signupName").value.trim();
    const email    = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirm  = document.getElementById("signupConfirm").value;
    let valid = true;

    ["signupNameErr","signupEmailErr","signupPasswordErr","signupConfirmErr"].forEach(id => {
      document.getElementById(id).textContent = "";
    });

    if (name.length < 2) { document.getElementById("signupNameErr").textContent = "Please enter your full name."; valid = false; }
    if (!email.includes("@") || !email.includes(".")) { document.getElementById("signupEmailErr").textContent = "Please enter a valid email."; valid = false; }
    if (password.length < 8) { document.getElementById("signupPasswordErr").textContent = "Password must be at least 8 characters."; valid = false; }
    if (confirm !== password) { document.getElementById("signupConfirmErr").textContent = "Passwords do not match."; valid = false; }

    if (valid) {
      signupForm.reset();
      document.getElementById("signupSuccess").style.display = "block";
    }
  });
}

// Forgot password form
const forgotForm = document.getElementById("forgotForm");
if (forgotForm) {
  forgotForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("forgotEmail").value.trim();
    document.getElementById("forgotEmailErr").textContent = "";
    if (!email.includes("@") || !email.includes(".")) {
      document.getElementById("forgotEmailErr").textContent = "Please enter a valid email.";
      return;
    }
    forgotForm.reset();
    document.getElementById("forgotSuccess").style.display = "block";
  });
}

// Contact form
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name    = document.getElementById("fname").value.trim();
    const email   = document.getElementById("email").value.trim();
    const phone   = document.getElementById("phone").value.trim();
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value.trim();
    let valid = true;

    function showError(id, msg) {
      document.getElementById(id).textContent = msg;
      if (msg) valid = false;
    }

    ["fnameErr", "emailErr", "phoneErr", "subjectErr", "messageErr"].forEach(id => {
      document.getElementById(id).textContent = "";
    });

    if (name.length < 2)          showError("fnameErr",   "Please enter your full name.");
    if (!email.includes("@") || !email.includes(".")) showError("emailErr", "Please enter a valid email.");
    if (phone && !/^[\d\s\+\-\(\)]{7,15}$/.test(phone)) showError("phoneErr", "Enter a valid phone number or leave it blank.");
    if (!subject)                 showError("subjectErr", "Please select a subject.");
    if (message.length < 10)      showError("messageErr", "Message must be at least 10 characters.");

    if (valid) {
      contactForm.reset();
      const success = document.getElementById("formSuccess");
      success.style.display = "block";
      setTimeout(() => success.style.display = "none", 5000);
    }
  });
}
