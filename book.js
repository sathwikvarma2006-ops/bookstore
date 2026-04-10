// Mock Data
const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 100, img: "https://covers.openlibrary.org/b/id/7222246-L.jpg" },
    { id: 2, title: "1984", author: "George Orwell", price: 200, img: "https://covers.openlibrary.org/b/id/7222249-L.jpg" },
    { id: 3, title: "The Hobbit", author: "J.R.R. Tolkien", price: 500, img: "https://covers.openlibrary.org/b/id/6979861-L.jpg" },
    { id: 4, title: "Atomic Habits", author: "James Clear", price: 800, img: "https://covers.openlibrary.org/b/id/12853749-L.jpg" }
];

let cart = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayBooks(books);
});

// Display Books
function displayBooks(bookArray) {
    const grid = document.getElementById('book-grid');
    grid.innerHTML = bookArray.map(book => `
        <div class="book-card">
            <img src="${book.img}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>By ${book.author}</p>
            <p><strong>₹${book.price.toFixed(2)}</strong></p>
            <button class="btn-add" onclick="addToCart(${book.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Search Logic
function searchBooks() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = books.filter(b => 
        b.title.toLowerCase().includes(query) || 
        b.author.toLowerCase().includes(query)
    );
    displayBooks(filtered);
}

// Cart Logic
function addToCart(id) {
    const book = books.find(b => b.id === id);
    const inCart = cart.find(item => item.id === id);

    if (inCart) {
        inCart.quantity++;
    } else {
        cart.push({ ...book, quantity: 1 });
    }
    updateCartUI();
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
    
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <h4>${item.title}</h4>
                <p>₹${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div class="quantity-controls">
                <button onclick="changeQty(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQty(${item.id}, 1)">+</button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    document.getElementById('total-price').innerText = total.toFixed(2);
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    item.quantity += delta;
    if (item.quantity < 1) {
        cart = cart.filter(i => i.id !== id);
    }
    updateCartUI();
}

// Navigation Logic
function showSection(sectionId) {
    const sections = ['book-list-section', 'login-section', 'cart-section', 'confirmation-section', 'home-banner'];
    sections.forEach(s => {
        const el = document.getElementById(s);
        if(el) el.classList.add('hidden');
    });

    if(sectionId === 'home') {
        document.getElementById('book-list-section').classList.remove('hidden');
        document.getElementById('home-banner').classList.remove('hidden');
    } else {
        document.getElementById(`${sectionId}-section`).classList.remove('hidden');
    }
}

function toggleCart() {
    showSection('cart');
}

function handleLogin() {
    alert("Logged in successfully!");
    showSection('home');
    document.getElementById('auth-btn').innerText = "Logout";
}

function processPayment() {
    if(cart.length === 0) return alert("Cart is empty!");
    // Simulate payment processing
    showSection('confirmation');
    cart = [];
    updateCartUI();
}