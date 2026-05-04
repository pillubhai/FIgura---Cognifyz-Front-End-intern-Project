// script.js

// Cart functionality
let cart = [];

function addToCart(product) {
    cart.push(product);
    displayCart();
}

function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    displayCart();
}

function displayCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = ''; // Clear previous items
    cart.forEach((item) => {
        const itemElement = document.createElement('div');
        itemElement.innerText = `${item.title} - $${item.price}`;
        cartContainer.appendChild(itemElement);
    });
}

// Theme switcher
const themeToggleButton = document.getElementById('theme-toggle');

themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

// FakeStore API Integration
async function loadProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = ''; // Clear previous products
    products.forEach((product) => {
        const productElement = document.createElement('div');
        productElement.innerHTML = `
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${JSON.stringify(product)})">Add to Cart</button>
        `;
        productsContainer.appendChild(productElement);
    });
}

// Load products on page load
window.onload = loadProducts;
