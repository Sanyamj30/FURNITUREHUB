document.addEventListener("DOMContentLoaded", function () {
    // Load JSON data
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            displayWishlist(data.wishlist);
            displayRecommendations(data.recommendations);
        })
        .catch(error => console.error("Error loading JSON data:", error));

    // Function to display wishlist items
    function displayWishlist(wishlistItems) {
        const wishlistContainer = document.querySelector(".wishlist-container ul");
        wishlistContainer.innerHTML = ""; // Clear existing items

        wishlistItems.forEach(item => {
            const listItem = document.createElement("li");

            listItem.innerHTML = `
                <div class="product-info">
                    <img src="${item.image}" alt="${item.name}" style="width: 468px; height: 268px;">
                    <h3>${item.name} ${item.size}</h3>
                    <p>Rs. ${item.price.toLocaleString()}</p>
                    <button onclick="addToCart(${item.id})">Add to cart</button>
                    <button onclick="removeFromWishlist(${item.id})">Remove from wishlist</button>
                </div>
            `;
            wishlistContainer.appendChild(listItem);
        });
    }

    // Function to display recommendation items
    function displayRecommendations(recommendationItems) {
        const recommendationsContainer = document.querySelector(".recommendations-container");
        recommendationsContainer.innerHTML = ""; // Clear existing items

        recommendationItems.forEach(item => {
            const recommendationCard = document.createElement("div");
            recommendationCard.classList.add("recommendation-card");

            recommendationCard.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 293px; height: 200px;">
                <h3>${item.name}</h3>
                <p>Rs. ${item.price.toLocaleString()}</p>
                <button onclick="buyNow(${item.id})">Buy Now</button>
            `;
            recommendationsContainer.appendChild(recommendationCard);
        });
    }
});

// Move these functions outside of DOMContentLoaded for button access
function addToCart(productId) {
    alert(`Added product ID ${productId} to cart!`);
}

function removeFromWishlist(productId) {
    alert(`Removed product ID ${productId} from wishlist!`);
    // Code to actually remove the item would go here
}

function buyNow(productId) {
    alert(`Buying product ID ${productId}!`);
}
