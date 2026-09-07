// Main JS for Disa Website

// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        once: true,
        offset: 50,
        duration: 800,
        easing: 'ease-out-cubic',
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Cart Logic
let cart = [];
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');

function toggleCart() {
    const isClosed = cartSidebar.classList.contains('-translate-x-full');
    
    if (isClosed) {
        cartSidebar.classList.remove('-translate-x-full');
        cartSidebar.classList.add('translate-x-0');
        cartOverlay.classList.remove('hidden');
        setTimeout(() => {
            cartOverlay.classList.remove('opacity-0');
            cartOverlay.classList.add('opacity-100');
        }, 10);
    } else {
        cartSidebar.classList.add('-translate-x-full');
        cartSidebar.classList.remove('translate-x-0');
        cartOverlay.classList.remove('opacity-100');
        cartOverlay.classList.add('opacity-0');
        setTimeout(() => {
            cartOverlay.classList.add('hidden');
        }, 300);
    }
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
    
    // Tiny animation on cart icon
    const cartIcon = document.querySelector('.fa-cart-shopping').parentElement;
    cartIcon.classList.add('scale-125', 'bg-disa-orange', 'text-white');
    setTimeout(() => {
        cartIcon.classList.remove('scale-125', 'bg-disa-orange', 'text-white');
    }, 300);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    cartCount.textContent = cart.length;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-gray-400">
                <i class="fa-solid fa-cart-plus text-6xl mb-4"></i>
                <p>السلة فارغة حالياً</p>
            </div>
        `;
        cartTotal.textContent = '0 ل.س';
        return;
    }

    let total = 0;
    cartItems.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg mb-3 border border-gray-100">
                <div>
                    <h5 class="font-bold text-disa-dark text-sm">${item.name}</h5>
                    <span class="text-disa-primary font-bold text-xs">${item.price.toLocaleString()} ل.س</span>
                </div>
                <button onclick="removeFromCart(${index})" class="text-red-400 hover:text-red-600 w-8 h-8 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 transition-colors">
                    <i class="fa-solid fa-trash text-xs"></i>
                </button>
            </div>
        `;
    }).join('');
    
    cartTotal.textContent = `${total.toLocaleString()} ل.س`;
}

// --- Products Toggle Logic ---
let productsShowingAll = false;
function toggleProducts() {
    const hiddenProducts = document.querySelectorAll('.hidden-product');
    const btn = document.getElementById('show-all-btn');
    
    productsShowingAll = !productsShowingAll;
    
    hiddenProducts.forEach(prod => {
        if (productsShowingAll) {
            prod.classList.remove('hidden');
        } else {
            prod.classList.add('hidden');
        }
    });
    
    btn.textContent = productsShowingAll ? 'عرض أقل' : 'عرض الكل';
}

// --- Checkout Logic ---
function openCheckout() {
    if (cart.length === 0) {
        alert("السلة فارغة! يرجى إضافة منتجات أولاً.");
        return;
    }
    // Close sidebar
    toggleCart();
    
    // Set total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('checkout-total').textContent = total.toLocaleString();
    
    // Reset steps
    document.getElementById('step-address').classList.remove('hidden');
    document.getElementById('step-payment').classList.add('hidden');
    document.getElementById('step-success').classList.add('hidden');
    
    // Open modal
    const modal = document.getElementById('checkout-modal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modal.classList.add('opacity-100');
    }, 10);
}

function closeCheckout() {
    const modal = document.getElementById('checkout-modal');
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

function nextStep() {
    document.getElementById('step-address').classList.add('hidden');
    document.getElementById('step-payment').classList.remove('hidden');
}

function prevStep() {
    document.getElementById('step-payment').classList.add('hidden');
    document.getElementById('step-address').classList.remove('hidden');
}

function updateCard(input, displayId, defaultText) {
    let val = input.value;
    if (displayId === 'card-number-display') {
        // Format credit card number with spaces
        val = val.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
        input.value = val;
    }
    document.getElementById(displayId).textContent = val || defaultText;
}

function completeOrder() {
    document.getElementById('step-payment').classList.add('hidden');
    document.getElementById('step-success').classList.remove('hidden');
}

function resetCart() {
    cart = [];
    updateCartUI();
    document.getElementById('checkout-form').reset();
    document.getElementById('payment-form').reset();
    document.getElementById('card-number-display').textContent = '**** **** **** ****';
    document.getElementById('card-name-display').textContent = 'JOHN DOE';
    document.getElementById('card-expiry-display').textContent = 'MM/YY';
}

// Hook up cart checkout button
document.addEventListener('DOMContentLoaded', () => {
    // Find the checkout button in the cart sidebar
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar) {
        const checkoutBtn = cartSidebar.querySelector('button.w-full.bg-disa-primary');
        if (checkoutBtn) {
            checkoutBtn.onclick = openCheckout;
        }
    }
});


// Policy Modals Logic
function openPolicyModal(type) {
    const modal = document.getElementById('policy-modal');
    const content = document.getElementById('policy-content');
    const title = document.getElementById('policy-modal-title');
    const text = document.getElementById('policy-modal-text');

    if (type === 'privacy') {
        title.setAttribute('data-i18n', 'modal.privacy.title');
        text.setAttribute('data-i18n', 'modal.privacy.content');
        title.innerHTML = translations[currentLang]['modal.privacy.title'];
        text.innerHTML = translations[currentLang]['modal.privacy.content'];
    } else {
        title.setAttribute('data-i18n', 'modal.terms.title');
        text.setAttribute('data-i18n', 'modal.terms.content');
        title.innerHTML = translations[currentLang]['modal.terms.title'];
        text.innerHTML = translations[currentLang]['modal.terms.content'];
    }

    modal.classList.remove('hidden');
    // Trigger reflow
    void modal.offsetWidth;
    modal.classList.remove('opacity-0');
    content.classList.remove('scale-95');
    content.classList.add('scale-100');
}

function closePolicyModal() {
    const modal = document.getElementById('policy-modal');
    const content = document.getElementById('policy-content');
    
    modal.classList.add('opacity-0');
    content.classList.remove('scale-100');
    content.classList.add('scale-95');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}
