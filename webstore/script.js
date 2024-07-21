document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const clearCartButton = document.getElementById('clear-cart');
    const cartSection = document.getElementById('cart');

    let cart = [];
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            addToCart(name, price);
        });
    });

    clearCartButton.addEventListener('click', function() {
        cart = [];
        renderCart();
    });

    function addToCart(name, price) {
        let itemExists = false;
        cart.forEach(item => {
            if (item.name === name) {
                item.quantity++;
                itemExists = true;
            }
        });
        if (!itemExists) {
            cart.push({ name: name, price: price, quantity: 1 });
        }
        renderCart();
    }

    function renderCart() {
        cartItemsList.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerText = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
            cartItemsList.appendChild(li);
            total += item.price * item.quantity;
        });
        cartTotal.innerText = total.toFixed(2);
        if (cart.length > 0) {
            cartSection.style.display = 'block';
        } else {
            cartSection.style.display = 'none';
        }
    }
});
