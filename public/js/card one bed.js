document.addEventListener("DOMContentLoaded", function() {
    const cartItemName = document.querySelector('.cart-item-name');
    const originalPriceElem = document.querySelector('.original-price');
    const discountedPriceElem = document.querySelector('.cart-item-price');
    const totalMrpElem = document.querySelector('.total-mrp');
    const discountElem = document.querySelector('.discount');
    const shippingChargesElem = document.querySelector('.shipping-charges');
    const platformFeeElem = document.querySelector('.platform-fee');
    const cartTotalElem = document.querySelector('.cart-total');
    const qtySelect = document.getElementById('qty1');


    document.addEventListener("DOMContentLoaded", function () {
        // Fetch cart data from the server
        fetch('/api/cart')
            .then(response => response.json())
            .then(data => {
                const item = data.cart.items[0];
                const itemPrice = item.discountedPrice; // Item price after discount
                const shippingCharges = data.cart.shippingCharges;
                const platformFee = data.cart.platformFee;
    
                // Update the cart UI with data
                document.querySelector('.item-details h3').textContent = item.name;
                document.querySelector('.item-details p').innerHTML = `<span class="original-price">₹${item.originalPrice}</span> ₹${item.discountedPrice}`;
                document.querySelector('#qty1').value = item.quantity;
                document.querySelector('.cart-summary h3').textContent = `Total MRP: ₹${item.originalPrice}`;
                document.querySelector('.cart-summary .discount').textContent = `-₹${item.originalPrice - item.discountedPrice}`;
                document.querySelector('.cart-summary h2').textContent = `Total: ₹${(itemPrice * item.quantity + shippingCharges + platformFee).toFixed(2)}`;
    
                // Dynamically update total on quantity change
                document.getElementById('qty1').addEventListener('change', function () {
                    updateCartTotal(itemPrice, shippingCharges, platformFee);
                });
    
                // Function to update the total price
                function updateCartTotal(itemPrice, shippingCharges, platformFee) {
                    const qty = document.getElementById('qty1').value;
                    const total = (itemPrice * qty) + shippingCharges + platformFee;
                    document.querySelector('.cart-summary h2').textContent = `Total: ₹${total.toFixed(2)}`;
                }
            })
            .catch(error => console.error("Error fetching cart data:", error));
    });

    
    // Fetch cart data from JSON
    fetch('cartData.json')
        .then(response => response.json())
        .then(data => {
            const item = data.cart.items[0];
            const shippingCharges = data.cart.shippingCharges;
            const platformFee = data.cart.platformFee;

            // Update the item details
            cartItemName.textContent = item.name;
            originalPriceElem.textContent = `₹${item.originalPrice}`;
            discountedPriceElem.textContent = `₹${item.discountedPrice}`;

            // Update the cart summary
            totalMrpElem.textContent = `₹${item.originalPrice}`;
            discountElem.textContent = `-₹${(item.originalPrice - item.discountedPrice).toFixed(2)}`;
            shippingChargesElem.textContent = shippingCharges;
            platformFeeElem.textContent = platformFee;

            // Set initial quantity and total
            qtySelect.value = item.quantity;
            updateCartTotal(item.discountedPrice, shippingCharges, platformFee);

            // Add event listener to quantity dropdown
            qtySelect.addEventListener('change', function() {
                updateCartTotal(item.discountedPrice, shippingCharges, platformFee);
            });
        })
        .catch(error => console.error("Error loading cart data:", error));

    // Function to update the cart total dynamically
    function updateCartTotal(itemPrice, shippingCharges, platformFee) {
        const qty = parseInt(qtySelect.value);
        const total = (itemPrice * qty) + shippingCharges + platformFee;
        cartTotalElem.textContent = `₹${total.toFixed(2)}`;
    }
});
