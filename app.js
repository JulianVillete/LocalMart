(function () {
  const STORAGE_KEY = "localmart_cart_v1";
  const TAX_RATE = 0.08;

  /** Sample product catalog with categories. Optional API fetch augments Gadgets. */
  let products = [
    // Foods
    { id: "apples", name: "Fresh Apples", price: 2.49, category: "Foods", image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=900&q=80&auto=format&fit=crop" },
    { id: "bread", name: "Artisan Bread", price: 3.95, category: "Foods", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=900&q=80&auto=format&fit=crop" },
    { id: "coffee", name: "Ground Coffee", price: 8.75, category: "Foods", image: "https://images.unsplash.com/photo-1507915135761-41a0a222c709?w=900&q=80&auto=format&fit=crop" },
    { id: "milk", name: "Organic Milk", price: 4.25, category: "Foods", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=900&auto=format&fit=crop" },
    { id: "bananas", name: "Bananas", price: 1.99, category: "Foods", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=900&q=80&auto=format&fit=crop" },
    { id: "rice", name: "White Rice (1kg)", price: 2.25, category: "Foods", image: "https://images.unsplash.com/photo-1686820740687-426a7b9b2043?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "eggs", name: "Free-range Eggs (12)", price: 3.49, category: "Foods", image: "https://plus.unsplash.com/premium_photo-1661281295321-26a3ac7384ff?q=80&w=879&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "cheese", name: "Cheddar Cheese", price: 5.5, category: "Foods", image: "https://images.unsplash.com/photo-1589881133825-bbb3b9471b1b?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "chicken", name: "Chicken Breast (500g)", price: 4.99, category: "Foods", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "noodles", name: "Noodles", price: 2.75, category: "Foods", image: "https://images.unsplash.com/photo-1627811884715-c004fc2dd6fb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

    // Sports
    { id: "ball", name: "Basketball", price: 14.99, category: "Sports", image: "https://plus.unsplash.com/premium_photo-1668767725891-58f5cd788105?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "yoga", name: "Yoga Mat", price: 19.5, category: "Sports", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "dumbbells", name: "Dumbbells", price: 29.99, category: "Sports", image: "https://plus.unsplash.com/premium_photo-1671028546491-f70b21a32cc2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "tennisracket", name: "Tennis Racket", price: 39.0, category: "Sports", image: "https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "jumprope", name: "Jump Rope", price: 9.5, category: "Sports", image: "https://images.unsplash.com/photo-1651315283994-03ec73dc21f1?q=80&w=725&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "football", name: "Football", price: 16.49, category: "Sports", image: "https://plus.unsplash.com/premium_photo-1661868926397-0083f0503c07?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "kettlebell", name: "Kettlebell", price: 34.99, category: "Sports", image: "https://images.unsplash.com/photo-1632077804406-188472f1a810?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "goggles", name: "Swim Goggles", price: 11.99, category: "Sports", image: "https://plus.unsplash.com/premium_photo-1706300226410-0fae25a8af6b?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "helmet", name: "Cycling Helmet", price: 45.0, category: "Sports", image: "https://images.unsplash.com/photo-1590093105704-fddd246ab64f?q=80&w=860&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

    // Shoes
    { id: "sneakers", name: "Everyday Sneakers", price: 49.99, category: "Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80&auto=format&fit=crop" },
    { id: "runners", name: "Running Shoes", price: 69.0, category: "Shoes", image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=900&q=80&auto=format&fit=crop" },
    { id: "hiking_boots", name: "Hiking Boots", price: 89.0, category: "Shoes", image: "https://images.unsplash.com/photo-1575987116913-e96e7d490b8a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "basketball_shoes", name: "Basketball Shoes", price: 99.0, category: "Shoes", image: "https://images.unsplash.com/photo-1559252676-c735ac416188?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "sandals", name: "Comfort Sandals", price: 29.5, category: "Shoes", image: "https://images.unsplash.com/photo-1625318880107-49baad6765fd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "loafers", name: "Leather Loafers", price: 59.0, category: "Shoes", image: "https://images.unsplash.com/photo-1673675270277-95e45ee5d2e8?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "trail_runners", name: "Trail Runners", price: 79.0, category: "Shoes", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=900&q=80&auto=format&fit=crop" },
    { id: "flipflops", name: "Flip Flops", price: 12.0, category: "Shoes", image: "https://images.unsplash.com/photo-1692536631218-ce4264088abe?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "soccer_cleats", name: "Soccer Cleats", price: 74.0, category: "Shoes", image: "https://images.unsplash.com/photo-1597274747316-808c6786c165?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "chelsea_boots", name: "Chelsea Boots", price: 95.0, category: "Shoes", image: "https://images.unsplash.com/photo-1608629601270-a0007becead3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

    // Gadgets (starter set; may be augmented by API)
    { id: "earbuds", name: "Wireless Earbuds", price: 39.9, category: "Gadgets", image: "https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=900&q=80&auto=format&fit=crop" },
    { id: "charger", name: "Apple Charger", price: 18.75, category: "Gadgets", image: "https://images.unsplash.com/photo-1624275353151-f21e28a7dfaa?w=900&q=80&auto=format&fit=crop" },
    { id: "smartphone", name: "Smartphone", price: 499.0, category: "Gadgets", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&q=80&auto=format&fit=crop" },
    { id: "tablet", name: "Tablet", price: 299.0, category: "Gadgets", image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "smartwatch", name: "Smartwatch", price: 149.0, category: "Gadgets", image: "https://images.unsplash.com/photo-1516570161787-2fd917215a3d?w=900&q=80&auto=format&fit=crop" },
    { id: "powerbank", name: "Power Bank", price: 24.99, category: "Gadgets", image: "https://images.unsplash.com/photo-1706275399494-fb26bbc5da63?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "speaker", name: "Bluetooth Speaker", price: 39.0, category: "Gadgets", image: "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "laptop_stand", name: "Laptop Stand", price: 32.0, category: "Gadgets", image: "https://images.unsplash.com/photo-1623251606108-512c7c4a3507?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "webcam", name: "HD Webcam", price: 45.0, category: "Gadgets", image: "https://images.unsplash.com/photo-1614588876378-b2ffa4520c22?q=80&w=860&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "keyboard", name: "Mechanical Keyboard", price: 69.0, category: "Gadgets", image: "https://plus.unsplash.com/premium_photo-1664194583917-b0ba07c4ce2a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ];

  const categories = ["All", "Gadgets", "Foods", "Sports", "Shoes"];

  /** DOM Helpers */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function formatCurrency(n) {
    return `$${n.toFixed(2)}`;
  }

  /** Cart State */
  function loadCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.warn("Failed to parse cart from localStorage", e);
      return {};
    }
  }

  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  function getCartItems(cart) {
    return Object.entries(cart).map(([productId, quantity]) => {
      const product = products.find((p) => p.id === productId);
      return product ? { ...product, quantity } : null;
    }).filter(Boolean);
  }

  function addToCart(productId, qty = 1) {
    const cart = loadCart();
    cart[productId] = (cart[productId] || 0) + qty;
    if (cart[productId] <= 0) delete cart[productId];
    saveCart(cart);
    render();
  }

  function setQuantity(productId, qty) {
    const cart = loadCart();
    if (qty <= 0) {
      delete cart[productId];
    } else {
      cart[productId] = qty;
    }
    saveCart(cart);
    render();
  }

  function removeFromCart(productId) {
    const cart = loadCart();
    delete cart[productId];
    saveCart(cart);
    render();
  }

  function clearCart() {
    localStorage.removeItem(STORAGE_KEY);
    render();
  }

  /** Rendering */
  function createProductCard(p) {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1557683316-973673baf926?w=900&q=80&auto=format&fit=crop';" />
      <div class="name">${p.name}</div>
      <div class="price">${formatCurrency(p.price)}</div>
      <div class="actions">
        <button class="btn primary" data-add="${p.id}">Add to Cart</button>
      </div>
    `;
    return card;
  }

  function renderProductSections(activeCategory = "All") {
    const container = document.querySelector("#product-sections");
    container.innerHTML = "";

    const visibleCategories = activeCategory === "All" ? ["Gadgets", "Foods", "Sports", "Shoes"] : [activeCategory];
    visibleCategories.forEach((cat) => {
      const section = document.createElement("div");
      const title = document.createElement("div");
      title.className = "category-title";
      title.innerHTML = `<h3 style="margin:0;">${cat}</h3><span class="category-badge">${cat}</span>`;

      const grid = document.createElement("div");
      grid.className = "product-list";
      products.filter((p) => p.category === cat).forEach((p) => grid.appendChild(createProductCard(p)));

      section.appendChild(title);
      section.appendChild(grid);
      container.appendChild(section);
    });

    container.addEventListener("click", (e) => {
      const t = e.target;
      if (t && t.matches("[data-add]")) {
        addToCart(t.getAttribute("data-add"));
      }
    });
  }

  function renderCart() {
    const cart = loadCart();
    const items = getCartItems(cart);
    const itemsContainer = document.querySelector("#cart-items");
    itemsContainer.innerHTML = "";

    if (items.length === 0) {
      itemsContainer.classList.add("empty");
      itemsContainer.innerHTML = '<p class="empty-text">Your cart is empty.</p>';
    } else {
      itemsContainer.classList.remove("empty");
      items.forEach((item) => {
        const row = document.createElement("div");
        row.className = "cart-item";
        const lineTotal = item.price * item.quantity;
        row.innerHTML = `
          <div>
            <div class="name">${item.name}</div>
            <div class="muted">${formatCurrency(item.price)} each</div>
          </div>
          <div class="qty">
            <button class="btn" data-dec="${item.id}">-</button>
            <input class="qty-input" data-qty="${item.id}" type="number" min="0" value="${item.quantity}" style="width:56px;padding:6px 8px;border:1px solid #d1d5db;border-radius:6px;" />
            <button class="btn" data-inc="${item.id}">+</button>
          </div>
          <div>${formatCurrency(lineTotal)}</div>
          <div>
            <button class="btn" data-remove="${item.id}">Remove</button>
          </div>
        `;
        itemsContainer.appendChild(row);
      });
    }

    // Totals
    const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;
    document.querySelector("#subtotal").textContent = formatCurrency(subtotal);
    document.querySelector("#tax").textContent = formatCurrency(tax);
    document.querySelector("#total").textContent = formatCurrency(total);

    // Header summary
    const count = items.reduce((sum, it) => sum + it.quantity, 0);
    document.querySelector("#cart-count").textContent = String(count);
    document.querySelector("#cart-total").textContent = formatCurrency(total);

    // Enable/disable actions
    const disabled = items.length === 0;
    document.querySelector("#checkout-btn").disabled = disabled;
    document.querySelector("#reset-btn").disabled = disabled;
  }

  function bindCartInteractions() {
    const itemsContainer = document.querySelector("#cart-items");

    itemsContainer.addEventListener("click", (e) => {
      const t = e.target;
      if (!t) return;
      if (t.matches("[data-inc]")) {
        const id = t.getAttribute("data-inc");
        addToCart(id, 1);
      }
      if (t.matches("[data-dec]")) {
        const id = t.getAttribute("data-dec");
        addToCart(id, -1);
      }
      if (t.matches("[data-remove]")) {
        const id = t.getAttribute("data-remove");
        removeFromCart(id);
      }
    });

    itemsContainer.addEventListener("change", (e) => {
      const t = e.target;
      if (t && t.matches("[data-qty]")) {
        const id = t.getAttribute("data-qty");
        const next = Math.max(0, parseInt(t.value || "0", 10) || 0);
        setQuantity(id, next);
      }
    });

    document.querySelector("#checkout-btn").addEventListener("click", () => {
      const cart = loadCart();
      const items = getCartItems(cart);
      if (items.length === 0) return;
      const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0);
      const tax = subtotal * TAX_RATE;
      const total = subtotal + tax;
      alert(`Thanks for your purchase!\nItems: ${items.length}\nTotal: ${formatCurrency(total)}`);
      clearCart();
    });

    document.querySelector("#reset-btn").addEventListener("click", () => {
      if (confirm("Clear your cart?")) clearCart();
    });
  }

  function render() {
    renderCart();
  }

  // Bootstrap
  document.addEventListener("DOMContentLoaded", () => {
    // Category nav
    document.querySelectorAll(".chip").forEach((chip) =>
      chip.addEventListener("click", () => {
        document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        const cat = chip.getAttribute("data-filter") || "All";
        renderProductSections(cat);
      })
    );

    // Optional: try to augment Gadgets via public API (Fake Store API)
    // If offline or blocked by CORS, we silently ignore and use local products only.
    fetch("https://fakestoreapi.com/products/category/electronics")
      .then((r) => r.ok ? r.json() : [])
      .then((items) => {
        if (Array.isArray(items)) {
          const mapped = items.slice(0, 6).map((it) => ({
            id: `api-${it.id}`,
            name: it.title,
            price: Number(it.price) || 19.99,
            category: "Gadgets",
            image: it.image || "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=900&q=80&auto=format&fit=crop",
          }));
          // Avoid duplicates by id
          const existingIds = new Set(products.map(p => p.id));
          const unique = mapped.filter(p => !existingIds.has(p.id));
          products = products.concat(unique);
        }
      })
      .catch(() => {})
      .finally(() => {
        renderProductSections("All");
      });

    bindCartInteractions();
    render();
  });
})();


